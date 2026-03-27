import fs from "node:fs";
import path from "node:path";

const sourcePath = "c:/Users/yusuf/Downloads/hindy_institute_v5_FINAL.html";
const outputDir = "c:/Users/yusuf/Desktop/hindy-institute/src/data";

const html = fs.readFileSync(sourcePath, "utf8");

function extractBetween(startMarker, endMarker) {
  const start = html.indexOf(startMarker);
  if (start === -1) throw new Error(`Could not find start marker: ${startMarker}`);
  const end = html.indexOf(endMarker, start);
  if (end === -1) throw new Error(`Could not find end marker: ${endMarker}`);
  return html.slice(start, end).trim();
}

function extractConst(name, openerChar) {
  const marker = `const ${name} = `;
  const start = html.indexOf(marker);
  if (start === -1) {
    throw new Error(`Could not find ${name}`);
  }

  const valueStart = start + marker.length;
  let i = valueStart;

  while (i < html.length && /\s/.test(html[i])) {
    i += 1;
  }

  if (html[i] !== openerChar) {
    throw new Error(`Unexpected opener for ${name}. Expected "${openerChar}", got "${html[i]}"`);
  }

  const openToClose = openerChar === "{" ? "}" : "]";
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escaped = false;

  for (let j = i; j < html.length; j += 1) {
    const ch = html[j];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (ch === "\\") {
      escaped = true;
      continue;
    }

    if (!inDouble && !inTemplate && ch === "'") {
      inSingle = !inSingle;
      continue;
    }
    if (!inSingle && !inTemplate && ch === '"') {
      inDouble = !inDouble;
      continue;
    }
    if (!inSingle && !inDouble && ch === "`") {
      inTemplate = !inTemplate;
      continue;
    }

    if (inSingle || inDouble || inTemplate) {
      continue;
    }

    if (ch === openerChar) {
      depth += 1;
      continue;
    }
    if (ch === openToClose) {
      depth -= 1;
      if (depth === 0) {
        return html.slice(i, j + 1);
      }
    }
  }

  throw new Error(`Unbalanced structure for ${name}`);
}

const abcCurriculum = extractConst("ABC_CURRICULUM", "[");
const masteryCurriculum = extractConst("MASTERY_CURRICULUM", "[");
const masteryQuizzes = extractConst("MASTERY_QUIZZES", "{");
const hansWehr = extractConst("HW_ROOTS", "{");
let abcQuizHelpers = extractBetween("function shuffle(arr)", "const ABC_CURRICULUM = [");
abcQuizHelpers = abcQuizHelpers
  .replace("function shuffle(arr)", "function shuffle(arr: string[])")
  .replace("function buildABCQuiz(letters, names)", "function buildABCQuiz(letters: string[], names: string[]): CompQuestion[]")
  .replace("const q = [];", "const q: CompQuestion[] = [];")
  .replace("function buildVowelQuiz()", "function buildVowelQuiz(): CompQuestion[]")
  .replace("function buildTajweedQuiz()", "function buildTajweedQuiz(): CompQuestion[]")
  .replaceAll("isAr:true, ", "");

fs.mkdirSync(outputDir, { recursive: true });

const header = `/* Auto-generated from hindy_institute_v5_FINAL.html. */\n\n`;

fs.writeFileSync(
  path.join(outputDir, "abc-curriculum.ts"),
  `${header}import type { ABCLesson, CompQuestion } from "./types";\n\n${abcQuizHelpers}\n\nexport const ABC_CURRICULUM: ABCLesson[] = ${abcCurriculum};\n`,
);

fs.writeFileSync(
  path.join(outputDir, "mastery-curriculum.ts"),
  `${header}import { MASTERY_QUIZZES } from "./mastery-quizzes";\nimport type { CompQuestion, MasteryLesson } from "./types";\n\nfunction buildMasteryQuiz(lessonId: number): CompQuestion[] {\n  return MASTERY_QUIZZES[lessonId] ?? [];\n}\n\nexport const MASTERY_CURRICULUM: MasteryLesson[] = ${masteryCurriculum};\n`,
);

fs.writeFileSync(
  path.join(outputDir, "mastery-quizzes.ts"),
  `${header}import type { CompQuestion } from "./types";\n\nexport const MASTERY_QUIZZES: Record<number, CompQuestion[]> = ${masteryQuizzes};\n`,
);

fs.writeFileSync(
  path.join(outputDir, "hans-wehr.ts"),
  `${header}import type { HWRoot } from "./types";\n\nexport const HW_ROOTS: Record<string, HWRoot> = ${hansWehr};\n`,
);

console.log("Data files extracted to src/data");
