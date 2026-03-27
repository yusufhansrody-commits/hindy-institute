/* Auto-generated from hindy_institute_v5_FINAL.html. */

import type { ABCLesson, CompQuestion } from "./types";

function shuffle(arr: string[]) { return [...arr].sort(() => Math.random() - 0.5); }


function buildABCQuiz(letters: string[], names: string[]): CompQuestion[] {
  const q: CompQuestion[] = [];
  // MCQ
  q.push({ type:'mcq', q:`Which letter is "${names[0]}"?`, opts: shuffle([...letters, 'ق','م','ن']).slice(0,4), ans:0, exp:`${letters[0]} is ${names[0]}.` });
  // TF
  if (letters.length >= 2) q.push({ type:'tf', q:`The letter ${letters[1]} is called "${names[1]}".`, ans:0, exp:`Correct — ${letters[1]} = ${names[1]}.` });
  // FITB
  q.push({ type:'fitb', q:`What is the name of the letter "${letters[0]}"?`, ans:names[0], exp:`${letters[0]} is called ${names[0]}.` });
  // Match
  const pairs = names.slice(0,Math.min(4,names.length)).map((n,i) => ({L:letters[i], R:n}));
  while (pairs.length < 3) pairs.push({L:'م', R:'Meem'});
  q.push({ type:'match', q:'Match each letter to its name.', pairs:pairs.slice(0,4), ans:[0,1,2,3].slice(0,pairs.length), exp:'Great letter-name matching!' });
  // MCQ form
  q.push({ type:'mcq', q:`In the MIDDLE of a word, ${letters[0]} takes the form:`, opts:['Isolated','Beginning','Middle','End'], ans:2, exp:`In the middle of a word, letters take their 'Middle' form.` });
  // TF
  q.push({ type:'tf', q:`Arabic letters are written and read from left to right.`, ans:1, exp:`false — Arabic is always written and read right to left.` });
  // FITB
  q.push({ type:'fitb', q:`A letter that never connects to the following letter is called a ___ letter. (connector / non-connector)`, ans:'non-connector', exp:`Letters like Alif, Waw, and Ra are non-connectors.` });
  // MCQ
  q.push({ type:'mcq', q:`How many forms does each Arabic letter have?`, opts:['1','2','3','4'], ans:3, exp:`Each letter has 4 forms: isolated, beginning, middle, and end.` });
  return q;
}

function buildVowelQuiz(): CompQuestion[] {
  return [
    { type:'mcq', q:'The Fatha (َ) vowel mark produces which sound?', opts:['i','u','a','aa'], ans:2, exp:'Fatha (a small diagonal line above the letter) produces the short "a" sound as in "bat".' },
    { type:'fitb', q:'The Kasra (ِ) is placed ___ the letter.', ans:'below', exp:'Kasra is the only vowel mark placed below the letter.' },
    { type:'tf', q:'Sukoon (ْ) means the letter has no vowel sound.', ans:0, exp:'Correct — Sukoon is the "vowel of rest", marking a consonant with no vowel.' },
    { type:'mcq', q:'Alif (ا) after a Fatha creates which long vowel?', opts:['oo','ii','aa','uu'], ans:2, exp:'Fatha + Alif = long "aa" sound (2 beats). Example: كِتَاب (kitaab).' },
    { type:'match', q:'Match the vowel mark to its sound.', pairs:[{L:'بَ',R:'"ba"'},{L:'بِ',R:'"bi"'},{L:'بُ',R:'"bu"'},{L:'بْ',R:'(silence)'}], ans:[0,1,2,3], exp:'Fatha=a, Kasra=i, Damma=u, Sukoon=no vowel.' },
    { type:'fitb', q:'Shaddah (ّ) means the letter is pronounced ___ .', ans:'twice', exp:'Shaddah doubles the letter: the articulation closes (Sukoon) then opens with the vowel.' },
    { type:'tf', q:'Tanween Fath (ً) is pronounced "un" at the end of a word.', ans:1, exp:'false — Tanween Fath is pronounced "an". Tanween Damm is "un".' },
    { type:'mcq', q:'How many beats does a Natural Madd (Natural Long Vowel) last?', opts:['1','2','3','4'], ans:1, exp:'Natural Madd (Madd Tabee\'ee) = exactly 2 beats.' }
  ];
}

function buildTajweedQuiz(): CompQuestion[] {
  return [
    { type:'mcq', q:'Which 5 letters produce Qalqalah when they have Sukoon?', opts:['ق ط ب ج د','ن م ل ر و','ب ت ث ج ح','ع غ خ ح ه'], ans:0, exp:'Qalqalah letters: ق ط ب ج د — mnemonic قُطُبُ جَدٍّ.' },
    { type:'fitb', q:'Ghunnah is a ___ hum through the nose lasting 2 beats.', ans:'nasal', exp:'Ghunnah is produced from the nose — close your mouth and hum through your nose for 2 counts.' },
    { type:'tf', q:'Idghaam means the Noon Sakinah merges into the following letter.', ans:0, exp:'Correct — Idghaam (assimilation) causes the Noon Sakinah to merge into one of 6 specific letters.' },
    { type:'mcq', q:'Before which letter does Iqlaab occur?', opts:['ي','ل','ب','ن'], ans:2, exp:'Iqlaab occurs only before ب (Ba). The Noon converts to a hidden Meem sound.' },
    { type:'fitb', q:'When Noon Sakinah precedes one of the 6 throat letters, the rule is called ___ .', ans:"Idh-haar", exp:'Idh-haar means "clear pronunciation" — the Noon is pronounced clearly before ء ه ع ح غ خ.' },
    { type:'match', q:'Match the Tajweed rule to its trigger.', pairs:[{L:'Qalqalah',R:'ق with Sukoon'},{L:'Ghunnah',R:'نّ or مّ'},{L:'Iqlaab',R:'Noon before ب'},{L:'Idh-haar',R:'Noon before ه'}], ans:[0,1,2,3], exp:'Each rule is triggered by specific letter combinations.' },
    { type:'tf', q:'Idghaam can occur within a single word.', ans:1, exp:'false — Idghaam only occurs between two separate words. Within one word, the rule does not apply.' },
    { type:'mcq', q:'Ikhfaa\' means the Noon Sakinah is:', opts:['Clearly pronounced','Completely silent','Hidden with a nasal quality','Doubled'], ans:2, exp:'Ikhfaa\' (concealment) — the Noon is not silent, not merged, but hidden with a nasal quality before 15 specific letters.' }
  ];
}

export const ABC_CURRICULUM: ABCLesson[] = [
  {
    id:1, title:"Arabic Script & Alif", arabic:"ا",
    youtubeId:"0plC5iC8b0s", xp:100,
    desc:"Begin your Arabic journey. Learn right-to-left direction, the connector vs non-connector concept, and master your first letter: Alif — the tall vertical stroke.",
    keyPoints:[
    "Arabic writes and reads RIGHT → LEFT — the pen flows right to left, but BOOKS open right to left too (back of an English book is front of Arabic)",
    "No capital/lowercase distinction in Arabic",
    "22 connectors (connect both sides) + 6 non-connectors (never connect forward)",
    "Alif is a NON-CONNECTOR: it never joins the letter AFTER it — the following letter must use its beginning/isolated form",
    "Alif carries the long 'aa' vowel and the glottal stop (hamza)"
    ],
    letterForms:[
      {name:"Alif", sound:"aa / ʾ", iso:"ا", beg:"ا", mid:"ـا", end:"ـا", nc:true}
    ],
    wordExamples:'أَبٌ (ab = father) · آه (āh = oh!) · آدَاب (ādāb = manners)',
    quiz:buildABCQuiz(['ا'],['Alif'])
  },
  {
    id:2, title:"Ba (ب) — First Connector", arabic:"ب",
    youtubeId:"3Q4-Dh37MzY", xp:100,
    desc:"Baa is your first connector — the saucer-shaped base with one dot below. Connectors have 4 forms depending on their position in the word.",
    keyPoints:[
    "Ba (ب) — 1 dot BELOW the dish. Dots are the ONLY difference between ب ت ث — master the dot count now",
    "CONNECTOR: 4 forms — isolated, beginning (بـ), middle (ـبـ), end (ـب)",
    "In beginning form the tail shortens; the dot always moves with the dish",
    "Word: باب (baab = door) — Ba + Alif + Ba"
    ],
    letterForms:[
      {name:"Ba", sound:"b", iso:"ب", beg:"بـ", mid:"ـبـ", end:"ـب"}
    ],
    wordExamples:'بَاب (bāb = door) · بِنْت (bint = girl) · بَيْت (bayt = house)',
    quiz:buildABCQuiz(['ب'],['Ba'])
  },
  {
    id:3, title:"Ta (ت) — Two Dots Above", arabic:"ت",
    youtubeId:"sm0QJsFBn5Y", xp:100,
    desc:"Taa shares the exact same dish shape as Baa but has TWO dots above instead of one below. Learning to distinguish by dots is a core Arabic reading skill.",
    keyPoints:[
    "Ta (ت) — 2 dots ABOVE. Tip: connect dots left-to-right (Arabic), not like English. Say as a dental 't' (tongue on teeth, not roof)",
    "Same dish base as Ba — only dots differ",
    "CONNECTOR: 4 forms (تـ / ـتـ / ـت)",
    "Word: بيت (bayt = house) — Ba + Ya + Ta"
    ],
    letterForms:[
      {name:"Ta", sound:"t", iso:"ت", beg:"تـ", mid:"ـتـ", end:"ـت"}
    ],
    wordExamples:'تُفَّاحَة (tuffāḥa = apple) · تِلْمِيذ (tilmīdh = pupil) · تَعَب (taʿab = tiredness)',
    quiz:buildABCQuiz(['ت'],['Ta'])
  },
  {
    id:4, title:"Tha (ث) — Three Dots Above", arabic:"ث",
    culture:{title:"الأَسْمَاء العَرَبِيَّة -- Arabic Names and Identity",body:"Arabic names carry meaning and genealogy. مُحَمَّد (the most praised), فَاطِمَة (she who weans), عَبْدُ الله (servant of God), نُور (light). Family names indicate origin (الشَّامِيّ = from Syria), profession (الحَدَّاد = blacksmith), or ancestor. The full name chain (النَّسَب) connects to grandfather: أَحْمَد بْن مُحَمَّد بْن عَلِيّ. In Arab tradition, a man with a son Khalid becomes أَبُو خَالِد (father of Khalid) -- the kunyah (كُنْيَة), a mark of intimacy.",tip:"The naming ceremony (تَسْمِيَة) happens 7 days after birth with a sacrifice (عَقِيقَة). Names are chosen for beauty of meaning, religious significance, or family legacy. يُسَمَّى الطِّفْل بَعْدَ سَبْعَة أَيَّام (the child is named after 7 days)."},
    youtubeId:"JsEHcvMVFOI", xp:100,
    desc:"Thaa completes the dish family with THREE dots above. Its sound is the soft English 'th' as in 'think' — not as in 'the'.",
    keyPoints:[
    "Tha (ث) — 3 dots above, soft 'th' as in 'think'",
    "Completes the dish family: ب (1 below) · ت (2 above) · ث (3 above)",
    "CONNECTOR: 4 forms (ثـ / ـثـ / ـث)",
    "Word: ثوب (thawb = garment)"
    ],
    letterForms:[
      {name:"Tha", sound:"th (think)", iso:"ث", beg:"ثـ", mid:"ـثـ", end:"ـث"}
    ],
    wordExamples:'ثَوْب (thawb = garment) · ثُلُث (thuluth = one third) · ثَمَر (thamar = fruit)',
    quiz:buildABCQuiz(['ث'],['Tha'])
  },
  {
    id:5, title:"Dish Family Review: ب ت ث", arabic:"ب ت ث",
    youtubeId:"e9QH7wicNWI", xp:100,
    desc:"Consolidate your first letter family. Ba, Ta and Tha are three of the most common Arabic letters — distinguished only by their dots.",
    keyPoints:[
    "Dot mnemonic: Ba(1)·Ta(2)·Tha(3) → count the dots. In connected text, the dot positions are your ONLY guide",
    "All three are connectors with 4 forms each",
    "Practice reading: باب (door) · بيت (house) · توت (berries) · ثوب (garment)",
    "Tip: cover the dots — they all look identical underneath!"
    ],
    letterForms:[
      {name:"Ba", sound:"b", iso:"ب", beg:"بـ", mid:"ـبـ", end:"ـب"},
      {name:"Ta", sound:"t", iso:"ت", beg:"تـ", mid:"ـتـ", end:"ـت"},
      {name:"Tha", sound:"th (think)", iso:"ث", beg:"ثـ", mid:"ـثـ", end:"ـث"}
    ],
    wordExamples:'بَاب · بِنْت · تَوْت (tawt = berries) · ثَوْب (review all three!)',
    quiz:buildABCQuiz(['ب','ت','ث'],['Ba','Ta','Tha'])
  },
  {
    id:6, title:"Jeem (ج) — The Curved Hook", arabic:"ج",
    culture:{title:"الرُّوتِين وَالحَيَاة اليَوْمِيَّة -- Daily Life Rhythms",body:"The Arab day is structured by prayer times (الصَّلَوَات الخَمْس). The week runs Sunday-Thursday in most Arab countries, with Friday as the holy day. The midday meal (الغَدَاء) is the main meal, eaten with family when possible. The القَيْلُولَة (afternoon siesta) is culturally valued. The evening (المَسَاء) is when social life picks back up -- visiting, coffee, conversation. Time is relational, not transactional: a visit for coffee can last 3 hours and that is considered exactly right.",tip:"صَبَاح النُّور (morning of light) responds to صَبَاح الخَيْر (good morning). Each greeting has an escalating poetic response -- مِسَا الفُل، مِسَا الوَرْد (evening of jasmine, evening of roses). Arab time greetings layer beauty on top of greeting."},
    youtubeId:"FE-SxBBCRl4", xp:100,
    desc:"Jeem opens the second letter family — a curved cup/hook shape. One dot sits below the cup. The J sound like English 'jump'.",
    keyPoints:[
    "Jeem (ج) — 1 dot below the hook, 'j' sound",
    "CONNECTOR: hook opens in beginning/middle, closes at end",
    "Begins Group 2: ج ح خ — same hook shape, different dots",
    "Word: جبل (jabal = mountain) · جنة (janna = paradise)"
    ],
    letterForms:[
      {name:"Jeem", sound:"j", iso:"ج", beg:"جـ", mid:"ـجـ", end:"ـج"}
    ],
    wordExamples:'جَبَل (jabal = mountain) · جَمِيل (jamīl = beautiful) · جُمْلَة (jumla = sentence)',
    quiz:buildABCQuiz(['ج'],['Jeem'])
  },
  {
    id:7, title:"Haa (ح) — Deep Throat H", arabic:"ح",
    youtubeId:"rqnJ3_FFDL0", xp:100,
    desc:"Haa has NO dots — the empty hook. Its sound is produced deep in the throat with a constriction, unlike any English sound. Essential for words like حمد (praise).",
    keyPoints:[
    "Haa (ح) — NO dots, deep constricted 'H' from the throat",
    "Not the same as English 'h' — much deeper and breathy",
    "CONNECTOR: 4 forms — same hook as Jeem but empty",
    "Word: حب (hubb = love) · حمد (hamd = praise)"
    ],
    letterForms:[
      {name:"Haa", sound:"ħ (throat H)", iso:"ح", beg:"حـ", mid:"ـحـ", end:"ـح"}
    ],
    wordExamples:'حَرْف (ḥarf = letter) · حَبَّة (ḥabba = grain/seed) · حَال (ḥāl = state/condition)',
    quiz:buildABCQuiz(['ح'],['Haa'])
  },
  {
    id:8, title:"Khaa (خ) — Guttural KH", arabic:"خ",
    youtubeId:"hJGCGIcKMH4", xp:100,
    desc:"Khaa completes the hook family with one dot ABOVE. Its guttural 'kh' sound is like the Scottish 'loch' or German 'Bach' — the back of the throat friction sound.",
    keyPoints:[
    "Khaa (خ) — 1 dot above the hook, guttural 'kh' sound",
    "Like clearing your throat softly — Scottish 'loch'",
    "Completes the hook family: ج (below) · ح (none) · خ (above)",
    "Word: خبز (khubz = bread) · خير (khayr = goodness)"
    ],
    letterForms:[
      {name:"Khaa", sound:"kh (loch)", iso:"خ", beg:"خـ", mid:"ـخـ", end:"ـخ"}
    ],
    wordExamples:'خُبْز (khubz = bread) · خَيْر (khayr = good) · خَبَر (khabar = news)',
    quiz:buildABCQuiz(['خ'],['Khaa'])
  },
  {
    id:9, title:"Dal (د) — Non-Connector", arabic:"د",
    youtubeId:"9YCdYhq2lEo", xp:100,
    desc:"Dal is the first of the wedge-shaped non-connectors. It NEVER connects to the following letter, creating a visible break in the word flow.",
    keyPoints:[
    "Dal (د) — wedge shape, no dot, 'd' sound",
    "NON-CONNECTOR — only 2 forms: isolated and final",
    "After Dal, the next letter must start fresh (isolated or beginning form)",
    "Word: دب (dubb = bear) — notice the gap after Dal"
    ],
    letterForms:[
      {name:"Dal", sound:"d", iso:"د", beg:"د", mid:"ـد", end:"ـد", nc:true}
    ],
    wordExamples:'دَار (dār = house) · دَرْس (dars = lesson) · دُكَّان (dukkān = shop)',
    quiz:buildABCQuiz(['د'],['Dal'])
  },
  {
    id:10, title:"Dhal (ذ) — Voiced TH", arabic:"ذ",
    youtubeId:"EUbQzCgNEqA", xp:100,
    desc:"Dhal adds one dot above Dal's wedge. Its sound is the VOICED 'th' — like 'that' or 'the' — distinct from Tha's voiceless 'th' (think).",
    keyPoints:[
    "Dhal (ذ) — 1 dot above the wedge, voiced 'dh' like 'the'",
    "NON-CONNECTOR — only 2 forms",
    "Tha (ث) = voiceless ('think') | Dhal (ذ) = voiced ('the')",
    "Word: ذهب (dhahab = gold) · ذكر (dhikr = remembrance)"
    ],
    letterForms:[
      {name:"Dhal", sound:"dh (the/that)", iso:"ذ", beg:"ذ", mid:"ـذ", end:"ـذ", nc:true}
    ],
    wordExamples:'ذَهَب (dhahab = gold) · ذَكِيّ (dhakī = clever) · ذِكْر (dhikr = remembrance)',
    quiz:buildABCQuiz(['ذ'],['Dhal'])
  },
  {
    id:11, title:"Ra (ر) — The Rolled R", arabic:"ر",
    youtubeId:"a_TrEM22CU0", xp:100,
    desc:"Ra is a graceful downward curve — one of six non-connectors. Its trilled or flapped 'r' sound ranges from Spanish-style trill to a quick tongue tap.",
    keyPoints:[
    "Ra (ر) — curved slash, no dot, trilled/flapped 'r'",
    "NON-CONNECTOR — only 2 forms",
    "Like Spanish 'r' in 'caro' or American 'tt' in 'butter'",
    "In Quran: heavy Ra before/after emphatic letters, light Ra with Kasra"
    ],
    letterForms:[
      {name:"Ra", sound:"r (trilled)", iso:"ر", beg:"ر", mid:"ـر", end:"ـر", nc:true}
    ],
    wordExamples:'رَجُل (rajul = man) · رِسَالَة (risāla = message/letter) · رَأْي (raʾy = opinion)',
    quiz:buildABCQuiz(['ر'],['Ra'])
  },
  {
    id:12, title:"Zay (ز) + Phase 1 Review", arabic:"ز · الحروف ١-١١",
    youtubeId:"Sp3T5L-c_xU", xp:120,
    desc:"Zay is Ra with one dot above — the 'z' sound. Then we review all 11 letters from Phase 1: the dish family, hook family, and four non-connectors.",
    keyPoints:[
    "Zay (ز) — 1 dot above Ra's curve, 'z' sound, NON-CONNECTOR",
    "6 non-connectors so far: ا د ذ ر ز (and later و)",
    "Review all connectors: ب ت ث ج ح خ",
    "Practice reading: باب · بيت · جبل · حب · خبز · دب · ذهب · رب · أرز"
    ],
    letterForms:[
      {name:"Zay", sound:"z", iso:"ز", beg:"ز", mid:"ـز", end:"ـز", nc:true},
      {name:"Dal", sound:"d", iso:"د", beg:"د", mid:"ـد", end:"ـد", nc:true},
      {name:"Ra", sound:"r", iso:"ر", beg:"ر", mid:"ـر", end:"ـر", nc:true},
      {name:"Dhal", sound:"dh", iso:"ذ", beg:"ذ", mid:"ـذ", end:"ـذ", nc:true}
    ],
    wordExamples:'زَيْت (zayt = oil) · زَمَان (zamān = time) · زِيَارَة (ziyāra = visit)',
    quiz:buildABCQuiz(['ز','ر','د','ذ'],['Zay','Ra','Dal','Dhal'])
  },
  {
    id:13, title:"Seen (س) — The Tooth Letter", arabic:"س",
    youtubeId:"9Yf5J0Fw8sw", xp:100,
    desc:"Seen introduces the 'tooth' shape — three small humps above the baseline. Its pure 's' sound is the lighter counterpart of emphatic Saad.",
    keyPoints:[
    "Seen (س) — 3 teeth, no dots, 's' sound",
    "CONNECTOR: 4 forms — full 3 teeth visible isolated/final, shortened at beginning/middle",
    "Sun letter — absorbs the Lam of ال (al-)",
    "Word: سلام (salaam = peace) · سماء (samaa = sky)"
    ],
    letterForms:[
      {name:"Seen", sound:"s", iso:"س", beg:"سـ", mid:"ـسـ", end:"ـس"}
    ],
    wordExamples:'سَلَام (salām = peace) · سَبِيل (sabīl = way) · سَمَاء (samāʾ = sky)',
    quiz:buildABCQuiz(['س'],['Seen'])
  },
  {
    id:14, title:"Sheen (ش) — The SH Sound", arabic:"ش",
    youtubeId:"x5Kcn5Rgsus", xp:100,
    desc:"Sheen is Seen with three dots above — the 'sh' sound as in 'ship'. Together Seen and Sheen are two of the most frequent Arabic consonants.",
    keyPoints:[
    "Sheen (ش) — 3 teeth + 3 dots above, 'sh' sound",
    "Seen (س) + 3 dots above = Sheen (ش)",
    "CONNECTOR: 4 forms",
    "Word: شمس (shams = sun) · شكر (shukr = thanks)"
    ],
    letterForms:[
      {name:"Seen", sound:"s", iso:"س", beg:"سـ", mid:"ـسـ", end:"ـس"},
      {name:"Sheen", sound:"sh", iso:"ش", beg:"شـ", mid:"ـشـ", end:"ـش"}
    ],
    wordExamples:'شَجَر (shajar = trees) · شَمْس (shams = sun) · شَيْء (shayʾ = thing)',
    quiz:buildABCQuiz(['س','ش'],['Seen','Sheen'])
  },
  {
    id:15, title:"Saad (ص) — Emphatic S", arabic:"ص",
    culture:{title:"مُرَاجَعَة الرُّبْع الأَوَّل -- End of Q1 Culture Review",body:"By the end of Q1, you have the tools for basic Arabic survival and cultural navigation. You can greet, introduce yourself, describe your family and home, navigate time, weather, and shopping. The most important cultural lesson from Q1: Arabic greetings are investments, not formalities. Every سَلَام you give and receive builds a relationship. Arab culture tracks these investments and responds in kind. Never rush a greeting.",tip:"لِلكَلَام قَدْر وَلِلصَّمْت قَدْر (there is a time for speech and a time for silence). The Q1 vocabulary gives you the speech; the culture notes teach you when to use it. Q2 will deepen both."},
    youtubeId:"JsEHcvMVFOI", xp:110,
    desc:"Saad is the emphatic version of Seen. Emphatic letters are produced with the back of the tongue raised and backed, deepening the vowel sounds around them.",
    keyPoints:[
    "Saad (ص) — rounded body, no dot, emphatic 'S'",
    "Emphatic = tongue backed + raised, vowels sound 'darker'",
    "Contrast: سار (he walked) vs صار (he became)",
    "Word: صبر (sabr = patience) · صلاة (salah = prayer)"
    ],
    letterForms:[
      {name:"Saad", sound:"ṣ (emphatic s)", iso:"ص", beg:"صـ", mid:"ـصـ", end:"ـص"}
    ],
    wordExamples:'صَبْر (ṣabr = patience) · صَحِيح (ṣaḥīḥ = correct) · صَوْت (ṣawt = voice)',
    quiz:buildABCQuiz(['ص'],['Saad'])
  },
  {
    id:16, title:"Daad (ض) — The Unique Letter", arabic:"ض",
    youtubeId:"FE-SxBBCRl4", xp:110,
    desc:"Daad is Saad with one dot above. Arabic is called 'Lughat ad-Daad' (language of the Daad) because this sound is unique — found in no other language.",
    keyPoints:[
    "Daad (ض) — 1 dot above Saad's body, emphatic 'D'",
    "Arabic = 'Lughat ad-Daad' — this sound is unique to Arabic",
    "Contrast: در (pearl) vs ضر (harm)",
    "Word: ضرب (daraba = he hit) · رمضان (Ramadan)"
    ],
    letterForms:[
      {name:"Saad", sound:"ṣ", iso:"ص", beg:"صـ", mid:"ـصـ", end:"ـص"},
      {name:"Daad", sound:"ḍ (emphatic d)", iso:"ض", beg:"ضـ", mid:"ـضـ", end:"ـض"}
    ],
    wordExamples:'ضَيْف (ḍayf = guest) · ضَوْء (ḍawʾ = light) · ضَرُورَة (ḍarūra = necessity)',
    quiz:buildABCQuiz(['ص','ض'],['Saad','Daad'])
  },
  {
    id:17, title:"Taa (ط) — Emphatic T", arabic:"ط",
    youtubeId:"rqnJ3_FFDL0", xp:110,
    desc:"Taa (ط) is the emphatic version of Ta (ت). Its distinctive loop-and-staff shape makes it immediately recognisable. Critical letter — appears in الله (Allah).",
    keyPoints:[
    "Taa (ط) — loop + vertical staff, emphatic 'T'",
    "Contrast: تين (figs) vs طين (clay)",
    "CONNECTOR: maintains loop-staff shape in all positions",
    "Word: طريق (tariq = road) · طعام (ta'aam = food)"
    ],
    letterForms:[
      {name:"Taa (ط)", sound:"ṭ (emphatic t)", iso:"ط", beg:"طـ", mid:"ـطـ", end:"ـط"}
    ],
    wordExamples:'طَرِيق (ṭarīq = road) · طَالِب (ṭālib = student) · طَبِيب (ṭabīb = doctor)',
    quiz:buildABCQuiz(['ط'],['Taa (emphatic)'])
  },
  {
    id:18, title:"Dhaa (ظ) — Emphatic TH", arabic:"ظ",
    culture:{title:"المُسَاوَمَة وَثَقَافَة السُّوق -- Bargaining Culture",body:"Arab market culture (السُّوق) is one of the great social institutions of the Arab world. Bargaining (المُسَاوَمَة) is not rudeness -- it is expected and enjoyed. A buyer who accepts the first price is considered naive; a seller who does not start high has misunderstood the game. The process: offer half, meet somewhere in the middle, seal with handshake and blessing. كَم بِدَّك? (how much do you want?) vs. بِكَام? (for how much?) -- both meaning the same but different dialects.",tip:"بَارَكَ اللهُ فِيك (may God bless you) closes a successful purchase. لَا، والله ما أقدر (by God I cannot) is the seller\' theatrical refusal. مُقْتَنِع؟ (are you convinced/satisfied?) seals the final deal. Arabic commerce is theatre -- and that makes it wonderful."},
    youtubeId:"hJGCGIcKMH4", xp:110,
    desc:"Dhaa is Taa with one dot above — the emphatic version of Dhal. All four emphatic letters (ص ض ط ظ) are now complete.",
    keyPoints:[
    "Dhaa (ظ) — loop + staff + 1 dot above, emphatic 'Dh'",
    "Contrast: ذل (humility) vs ظل (shade)",
    "All 4 emphatics learned: ص ض ط ظ",
    "Word: ظلم (dhulm = injustice) · ظهر (dhahr = back)"
    ],
    letterForms:[
      {name:"Taa (ط)", sound:"ṭ", iso:"ط", beg:"طـ", mid:"ـطـ", end:"ـط"},
      {name:"Dhaa (ظ)", sound:"ẓ (emphatic dh)", iso:"ظ", beg:"ظـ", mid:"ـظـ", end:"ـظ"}
    ],
    wordExamples:'ظَرْف (ẓarf = envelope; adverb) · ظِلّ (ẓill = shadow) · ظَاهِر (ẓāhir = apparent)',
    quiz:buildABCQuiz(['ط','ظ'],['Taa-emphatic','Dhaa'])
  },
  {
    id:19, title:"'Ayn (ع) — The Throat Letter", arabic:"ع",
    youtubeId:"9YCdYhq2lEo", xp:120,
    desc:"'Ayn is considered the most important Arabic sound to master — it has no English equivalent. Produced by squeezing the middle of the throat while voicing a vowel.",
    keyPoints:[
    "'Ayn (ع) — no dot, squeezed pharyngeal voice, no English equivalent",
    "Practice: say 'ah' while tightening your throat as if surprised",
    "CONNECTOR: dramatic shape change — hook (beg) → wave (mid) → ear (end/isolated)",
    "Word: علم ('ilm = knowledge) · عرب ('arab = Arabs)"
    ],
    letterForms:[
      {name:"'Ayn", sound:"ʿ (pharyngeal)", iso:"ع", beg:"عـ", mid:"ـعـ", end:"ـع"}
    ],
    wordExamples:'عَيْن (ʿayn = eye/spring) · عِلْم (ʿilm = knowledge) · عَمَل (ʿamal = work)',
    quiz:buildABCQuiz(['ع'],["'Ayn"])
  },
  {
    id:20, title:"Ghayn (غ) — The Uvular Gh", arabic:"غ",
    youtubeId:"EUbQzCgNEqA", xp:120,
    desc:"Ghayn is 'Ayn with one dot above. Its voiced uvular sound resembles the French 'r' in 'Paris' — a gargling vibration at the back of the throat.",
    keyPoints:[
    "Ghayn (غ) — 1 dot above, gargling 'gh' like French 'r'",
    "Voiced companion of Khaa (خ): Khaa voiceless, Ghayn voiced",
    "CONNECTOR: same shape changes as 'Ayn",
    "Word: غيب (ghayb = unseen) · مغرب (maghrib = west/sunset)"
    ],
    letterForms:[
      {name:"'Ayn", sound:"ʿ", iso:"ع", beg:"عـ", mid:"ـعـ", end:"ـع"},
      {name:"Ghayn", sound:"gh (French r)", iso:"غ", beg:"غـ", mid:"ـغـ", end:"ـغ"}
    ],
    wordExamples:'غَيْب (ghayb = unseen) · غَرِيب (gharīb = strange/foreigner) · غُرْفَة (ghurfa = room)',
    quiz:buildABCQuiz(['ع','غ'],["'Ayn",'Ghayn'])
  },
  {
    id:21, title:"Fa (ف) — The Lip Letter", arabic:"ف",
    youtubeId:"a_TrEM22CU0", xp:100,
    desc:"Fa has a round head with one dot above — a clean 'f' sound produced at the lips. Begins the second-to-last group of letters.",
    keyPoints:[
    "Fa (ف) — round head, 1 dot above, 'f' sound (upper teeth + lower lip)",
    "CONNECTOR: 4 forms — round head with tail",
    "Moon letter — Lam of ال stays before Fa",
    "Word: فتح (fath = victory) · فجر (fajr = dawn)"
    ],
    letterForms:[
      {name:"Fa", sound:"f", iso:"ف", beg:"فـ", mid:"ـفـ", end:"ـف"}
    ],
    wordExamples:'فَرَح (faraḥ = joy) · فَهْم (fahm = understanding) · فِكْر (fikr = thought)',
    quiz:buildABCQuiz(['ف'],['Fa'])
  },
  {
    id:22, title:"Qaaf (ق) — Deep Uvular Q", arabic:"ق",
    youtubeId:"Sp3T5L-c_xU", xp:110,
    desc:"Qaaf has a deeper cup than Fa and TWO dots above. It is produced at the very back of the mouth at the uvula — deeper than any English 'k'.",
    keyPoints:[
    "Qaaf (ق) — deeper cup, 2 dots above, uvular 'q'",
    "NOT like English 'k' — back of tongue touches the uvula",
    "CONNECTOR: 4 forms",
    "Word: قلب (qalb = heart) · قرآن (Quran) · قمر (qamar = moon)"
    ],
    letterForms:[
      {name:"Fa", sound:"f", iso:"ف", beg:"فـ", mid:"ـفـ", end:"ـف"},
      {name:"Qaaf", sound:"q (uvular)", iso:"ق", beg:"قـ", mid:"ـقـ", end:"ـق"}
    ],
    wordExamples:'قَلْب (qalb = heart) · قَلَم (qalam = pen) · قَمَر (qamar = moon)',
    quiz:buildABCQuiz(['ف','ق'],['Fa','Qaaf'])
  },
  {
    id:23, title:"Kaf (ك) — The Regular K", arabic:"ك",
    youtubeId:"9Yf5J0Fw8sw", xp:100,
    desc:"Kaf makes the familiar English 'k' sound and has a distinctive shape with a small diagonal stroke inside. It forms the definite article ال together with Lam.",
    keyPoints:[
    "Kaf (ك) — inner diagonal mark, soft 'k' sound",
    "CONNECTOR: 4 forms",
    "As a suffix (كَ): means 'your' (masculine): كتابك = your book",
    "Word: كتاب (kitaab = book) · كريم (kareem = generous)"
    ],
    letterForms:[
      {name:"Kaf", sound:"k", iso:"ك", beg:"كـ", mid:"ـكـ", end:"ـك"}
    ],
    wordExamples:'كِتَاب (kitāb = book) · كَرَم (karam = generosity) · كَلِمَة (kalima = word)',
    quiz:buildABCQuiz(['ك'],['Kaf'])
  },
  {
    id:24, title:"Lam (ل) — The Definite Article", arabic:"ل",
    youtubeId:"x5Kcn5Rgsus", xp:100,
    desc:"Lam is a tall curving letter essential for Arabic grammar — it forms الـ (al-), the definite article placed before every noun. Lam + Alif = the special ligature لا.",
    keyPoints:[
    "Lam (ل) — tall curve, 'l' sound",
    "الـ = Alif + Lam = definite article 'the'",
    "Lam-Alif ligature لا = 'no / not' — very frequent in Quran",
    "Sun letters assimilate Lam; Moon letters keep it — covered in Lesson 35"
    ],
    letterForms:[
      {name:"Kaf", sound:"k", iso:"ك", beg:"كـ", mid:"ـكـ", end:"ـك"},
      {name:"Lam", sound:"l", iso:"ل", beg:"لـ", mid:"ـلـ", end:"ـل"}
    ],
    wordExamples:'لَيْل (layl = night) · لُغَة (lugha = language) · لِسَان (lisān = tongue)',
    quiz:buildABCQuiz(['ك','ل'],['Kaf','Lam'])
  },
  {
    id:25, title:"Meem (م) — The Bowl Letter", arabic:"م",
    youtubeId:"0plC5iC8b0s", xp:100,
    desc:"Meem is a closed loop sitting on the baseline. One of the most frequent letters in Arabic, it carries important tajweed rules including ghunna nasalisation.",
    keyPoints:[
    "Meem (م) — closed loop/circle, 'm' sound",
    "CONNECTOR: 4 forms — loop descends below baseline at end",
    "Carries ghunna (2-beat nasal hum) when doubled or followed by sukoon",
    "Word: ماء (maa = water) · مسجد (masjid = mosque)"
    ],
    letterForms:[
      {name:"Meem", sound:"m", iso:"م", beg:"مـ", mid:"ـمـ", end:"ـم"}
    ],
    wordExamples:'مَاء (māʾ = water) · مَدِينَة (madīna = city) · مَسْجِد (masjid = mosque)',
    quiz:buildABCQuiz(['م'],['Meem'])
  },
  {
    id:26, title:"Noon (ن) — The Bowl with Dot", arabic:"ن",
    culture:{title:"الأَعْدَاد وَالتَّارِيخ -- Numbers in Arab History",body:"Arab mathematicians transmitted the decimal number system from India to Europe, making modern science possible. الصِّفْر (zero, from Arabic sifr = empty) was developed into a mathematical concept by Al-Khwarizmi (fl. 820 CE) whose name gave us algorithm. تَرْجَمَة (translation) of Greek mathematics into Arabic in the 8th-9th centuries at Bayt al-Hikma (بَيْت الحِكْمَة = House of Wisdom) in Baghdad preserved and advanced human knowledge through Europe\'s dark ages.",tip:"Arabic number system: ٠١٢٣٤٥٦٧٨٩ are the Eastern Arabic numerals still used in many Arab countries. The Western Arabic numerals 0123456789 we use globally are a simplified version developed in Moorish Spain (الأَنْدَلُس)."},
    youtubeId:"3Q4-Dh37MzY", xp:100,
    desc:"Noon is a curved bowl with one dot above. Together with Meem it carries the key tajweed rule of ghunna. Noon Sakinah has four rules — the backbone of Tajweed.",
    keyPoints:[
    "Noon (ن) — curved bowl + 1 dot above, 'n' sound",
    "CONNECTOR: 4 forms",
    "Noon Sakinah (نْ) triggers: Idhar · Idgham · Iqlab · Ikhfa",
    "Word: نور (noor = light) · نعم (na'am = yes)"
    ],
    letterForms:[
      {name:"Meem", sound:"m", iso:"م", beg:"مـ", mid:"ـمـ", end:"ـم"},
      {name:"Noon", sound:"n", iso:"ن", beg:"نـ", mid:"ـنـ", end:"ـن"}
    ],
    wordExamples:'نُور (nūr = light) · نَهَر (nahr = river) · نَفْس (nafs = soul/self)',
    quiz:buildABCQuiz(['م','ن'],['Meem','Noon'])
  },
  {
    id:27, title:"Haa (ه) — The Light H", arabic:"ه",
    culture:{title:"الأَرْقَام فِي الثَّقَافَة -- Numbers and Culture",body:"Numbers carry cultural weight in Arabic. الأَرْبَعُون (forty) symbolises a long journey: Moses wandered 40 years; mourning lasts 40 days (الأَرْبَعِين). السَّبْعَة (seven) is sacred: seven heavens, seven circuits around the Kaaba, seven verses in Al-Fatiha. المِئَة (one hundred) means abundance: مِئَة عَام سَعَادَة (a hundred years of happiness). الأَلْف (thousand) means immeasurable: أَلْف مَبْرُوك (a thousand congratulations).",tip:"عُمْرَك مِئَة سَنَة (may you live 100 years) is a common Egyptian blessing. وَاللهِ أَلْف مَرَّة (by God, a thousand times) intensifies any statement to the maximum. Arabic numbers in blessings and idioms are almost always round, symbolic numbers."},
    youtubeId:"sm0QJsFBn5Y", xp:100,
    desc:"This Haa (ه) is the light English 'h' — distinct from the deep throat Haa (ح). It has dramatically different shapes by position and appears in Allah (الله).",
    keyPoints:[
    "Haa (ه) — light 'h' like English, different from ح",
    "CONNECTOR with 4 distinct shapes: هـ / ـهـ / ـه / ه",
    "Appears in: هو (huwa = he) · هي (hiya = she) · الله (Allah)",
    "Do not confuse ه (light h) with ح (deep throat H)"
    ],
    letterForms:[
      {name:"Haa (ه)", sound:"h (light)", iso:"ه", beg:"هـ", mid:"ـهـ", end:"ـه"}
    ],
    wordExamples:'هَوَاء (hawāʾ = air) · هُدُوء (hudūʾ = calm) · هُوِيَّة (huwiyya = identity)',
    quiz:buildABCQuiz(['ه'],['Haa (light)'])
  },
  {
    id:28, title:"Waw (و) — Long Vowel & Consonant", arabic:"و",
    youtubeId:"JsEHcvMVFOI", xp:100,
    desc:"Waw is the last of the six non-connectors. It serves double duty — as a consonant 'w' and as the long 'uu' vowel. As a single letter it means 'and'.",
    keyPoints:[
    "Waw (و) — hook shape, NON-CONNECTOR",
    "As consonant: 'w' — ولد (walad = boy)",
    "As long vowel: 'uu' — نور (noor = n-uu-r)",
    "As single letter: و = 'and' (the most common word in Quran)"
    ],
    letterForms:[
      {name:"Waw", sound:"w / uu", iso:"و", beg:"و", mid:"ـو", end:"ـو", nc:true}
    ],
    wordExamples:'وَلَد (walad = boy/child) · وَقْت (waqt = time) · وَطَن (waṭan = homeland)',
    quiz:buildABCQuiz(['و'],['Waw'])
  },
  {
    id:29, title:"Ya (ي) — The Last Letter", arabic:"ي",
    youtubeId:"e9QH7wicNWI", xp:100,
    desc:"Ya is the 28th and final letter of the Arabic alphabet. Like Waw it has two roles — consonant 'y' and long vowel 'ii'. As a suffix it means 'my'.",
    keyPoints:[
    "Ya (ي) — 2 dots below, CONNECTOR, 4 forms",
    "As consonant: 'y' — يد (yad = hand)",
    "As long vowel: 'ii' — دين (deen = d-ii-n)",
    "As suffix: possessive 'my' — كتابي (kitaabi = my book)"
    ],
    letterForms:[
      {name:"Waw", sound:"w / uu", iso:"و", beg:"و", mid:"ـو", end:"ـو", nc:true},
      {name:"Ya", sound:"y / ii", iso:"ي", beg:"يـ", mid:"ـيـ", end:"ـي"}
    ],
    wordExamples:'وَرَقَة (waraqa = paper/leaf) · وَاجِب (wājib = duty/homework) · وِعَاء (wiʿāʾ = container)',
    quiz:buildABCQuiz(['و','ي'],['Waw','Ya'])
  },
  {
    id:30, title:"Complete Alphabet Review", arabic:"أ — ي",
    youtubeId:"FE-SxBBCRl4", xp:120,
    desc:"You have learned all 28 Arabic letters! This lesson reviews the complete alphabet — all forms, connectors vs non-connectors, and reading practice with real words.",
    keyPoints:[
    "22 connectors (4 forms each): ب ت ث ج ح خ س ش ص ض ط ظ ع غ ف ق ك ل م ن ه ي",
    "6 non-connectors (2 forms each): ا د ذ ر ز و",
    "Groups: dish · hook · wedge · teeth · emphatics · throat · tail · bowl",
    "Practice: كتاب · شمس · قلم · بحر · نجم · مسجد · رحمة · صلاة"
    ],
    letterForms:[
      {name:"Alif", sound:"aa", iso:"ا", beg:"ا", mid:"ـا", end:"ـا", nc:true},
      {name:"Ba", sound:"b", iso:"ب", beg:"بـ", mid:"ـبـ", end:"ـب"},
      {name:"Ta", sound:"t", iso:"ت", beg:"تـ", mid:"ـتـ", end:"ـت"},
      {name:"Tha", sound:"th", iso:"ث", beg:"ثـ", mid:"ـثـ", end:"ـث"},
      {name:"Jeem", sound:"j", iso:"ج", beg:"جـ", mid:"ـجـ", end:"ـج"},
      {name:"Haa", sound:"ħ", iso:"ح", beg:"حـ", mid:"ـحـ", end:"ـح"}
    ],
    wordExamples:'يَوْم (yawm = day) · يَد (yad = hand) · يَمِين (yamīn = right side/oath)',
    quiz:buildABCQuiz(['ا','ب','ت','ث','ج','ح'],['Alif','Ba','Ta','Tha','Jeem','Haa'])
  },
  {
    id:31, title:"Short Vowels (Harakat)", arabic:"الحَرَكَات",
    youtubeId:"rqnJ3_FFDL0", xp:120,
    desc:"Short vowels (harakat) are small marks placed above or below letters. The Quran is fully vowelled — every mark is intentional and changes the meaning.",
    keyPoints:[
    "Fatha (ـَ) above = 'a' vowel: بَ = ba",
    "Kasra (ـِ) below = 'i' vowel: بِ = bi",
    "Damma (ـُ) above = 'u' vowel: بُ = bu",
    "Sukoon (ـْ) above = no vowel (consonant closure): بْ = 'b'"
    ],
    letterForms:[
      {name:"Fatha", sound:"a", iso:"ـَ", beg:"ـَ", mid:"ـَ", end:"ـَ"},
      {name:"Kasra", sound:"i", iso:"ـِ", beg:"ـِ", mid:"ـِ", end:"ـِ"},
      {name:"Damma", sound:"u", iso:"ـُ", beg:"ـُ", mid:"ـُ", end:"ـُ"},
      {name:"Sukoon", sound:"—", iso:"ـْ", beg:"ـْ", mid:"ـْ", end:"ـْ"}
    ],
    quiz:buildVowelQuiz()
  },
  {
    id:32, title:"Long Vowels (Madd)", arabic:"المَدّ",
    youtubeId:"hJGCGIcKMH4", xp:120,
    desc:"Long vowels extend for 2 beats and are written with Alif, Waw, or Ya following the short vowel. The Quran's melody depends on distinguishing short from long vowels.",
    keyPoints:[
    "Fatha + Alif = long 'aa' (2 beats): باب (baab)",
    "Damma + Waw = long 'uu' (2 beats): نور (nuur)",
    "Kasra + Ya = long 'ii' (2 beats): دين (diin)",
    "Short vs long: كَتَبَ (kataba) vs كَاتَبَ (kaataba)"
    ],
    letterForms:[
      {name:"Alif Madd", sound:"aa (2 beats)", iso:"بَا", beg:"بَا", mid:"ـَا", end:"ـَا"},
      {name:"Waw Madd", sound:"uu (2 beats)", iso:"بُو", beg:"بُو", mid:"ـُو", end:"ـُو"},
      {name:"Ya Madd", sound:"ii (2 beats)", iso:"بِي", beg:"بِي", mid:"ـِي", end:"ـِي"}
    ],
    quiz:buildVowelQuiz()
  },
  {
    id:33, title:"Shaddah (ّ) — Doubled Consonants", arabic:"الشَّدَّة",
    youtubeId:"9YCdYhq2lEo", xp:120,
    desc:"Shaddah is the W-shaped mark that doubles a consonant — hold it for 2 counts. It appears thousands of times in the Quran, including in رَبِّ (Rabbi = my Lord).",
    keyPoints:[
    "Shaddah (ـّ) above = double the letter, hold 2 counts",
    "رَبِّ (rabbi = my Lord) = ر + بْ + بِ — the Ba is doubled",
    "جَنَّة (janna = paradise) = Nun is doubled",
    "Shaddah + vowel mark together on one letter: بَّ = 'bba'"
    ],
    letterForms:[
      {name:"Shaddah", sound:"doubled", iso:"ـّ", beg:"ـّ", mid:"ـّ", end:"ـّ"},
      {name:"Fatha", sound:"a", iso:"ـَ", beg:"ـَ", mid:"ـَ", end:"ـَ"},
      {name:"Kasra", sound:"i", iso:"ـِ", beg:"ـِ", mid:"ـِ", end:"ـِ"}
    ],
    quiz:buildVowelQuiz()
  },
  {
    id:34, title:"Tanwin — Nunation", arabic:"التَّنْوِين",
    youtubeId:"EUbQzCgNEqA", xp:120,
    desc:"Tanwin is the doubling of vowel marks at the end of nouns, adding an 'n' sound. It marks the grammatical case (subject, object, possessive) and appears in common words.",
    keyPoints:[
    "Tanwin Damma (ـٌ) = '-un' (nominative/subject): كِتَابٌ",
    "Tanwin Fatha (ـً) = '-an' (accusative/object): كِتَابًا",
    "Tanwin Kasra (ـٍ) = '-in' (genitive): كِتَابٍ",
    "Common words: شُكْرًا (shukran = thank you) · أَبَدًا (abadan = never)"
    ],
    letterForms:[
      {name:"Tanwin Damma", sound:"-un", iso:"ـٌ", beg:"—", mid:"—", end:"ـٌ"},
      {name:"Tanwin Fatha", sound:"-an", iso:"ـً", beg:"—", mid:"—", end:"ـً"},
      {name:"Tanwin Kasra", sound:"-in", iso:"ـٍ", beg:"—", mid:"—", end:"ـٍ"}
    ],
    quiz:buildVowelQuiz()
  },
  {
    id:35, title:"Sun & Moon Letters", arabic:"حروف الشمس والقمر",
    culture:{title:"الشِّعْر الجَاهِلِيّ -- Pre-Islamic Poetry",body:"Pre-Islamic poetry (الشِّعْر الجَاهِلِيّ = poetry of the age of ignorance) is the foundation of Arabic literature. The Muallaqat (المُعَلَّقَات = The Suspended Odes) are seven pre-Islamic poems considered so perfect they were reportedly hung on the Kaaba. عِمْرُو القَيْس (Imru al-Qays) opened his Muallaqat with قِفَا نَبْكِ (stop and let us weep) -- beginning a tradition of emotional directness in Arabic verse that continues today.",tip:"عَنْتَرَة بْن شَدَّاد was the Black Arab warrior-poet whose love for his cousin Abla and battlefield courage made him the Arab world\'s Achilles. His Muallaqat is still memorised in Arab schools. الشِّعْر دِيوَان العَرَب (poetry is the register of the Arabs) -- their history, values, and emotions preserved in verse."},
    youtubeId:"a_TrEM22CU0", xp:130,
    desc:"The Sun and Moon letter rule governs how الـ (al-) is pronounced before every noun. 14 sun letters assimilate the Lam; 14 moon letters leave it clear.",
    keyPoints:[
    "Moon letters (14) — Lam stays clear: ا ب ج ح خ ع غ ف ق ك م ه و ي",
    "Sun letters (14) — Lam assimilates: ت ث د ذ ر ز س ش ص ض ط ظ ل ن",
    "الشَّمْس = ash-shams (Sheen doubles, Lam silent)",
    "الْقَمَر = al-qamar (Lam pronounced, Qaf is Moon letter)"
    ],
    letterForms:[
      {name:"Sun letter ex.", sound:"ash-shams", iso:"الشَّمْس", beg:"الشَّ", mid:"ـمـ", end:"ـس"},
      {name:"Moon letter ex.", sound:"al-qamar", iso:"الْقَمَر", beg:"الْقَ", mid:"ـمَ", end:"ـر"}
    ],
    quiz:buildTajweedQuiz()
  },
  {
    id:36, title:"Hamza (ء) — The Glottal Stop", arabic:"الهَمْزَة",
    culture:{title:"المُوسِيقَى وَالهُوِيَّة -- Music and Arab Identity",body:"Arabic music (المُوسِيقَى العَرَبِيَّة) is built on the مَقَام (mode) system -- 72 melodic modes each carrying an emotional character. أُمّ كُلْثُوم (Umm Kulthum, 1904-1975) is arguably the greatest Arab artist ever. Her concerts would stop Egypt. فَيْرُوز (Fairuz, b.1935) from Lebanon is the most universally beloved Arab voice -- played in every Arab country daily for 70+ years. عَبْد الحَلِيم حَافِظ (Abdel Halim Hafez) was the Egyptian Elvis. These three defined Arab musical identity.",tip:"Arabic music does not use semitones (half-steps) -- it uses quarter-tones (رُبْع التَّوْن), giving it that characteristic 'in-between' quality Western ears find exotic. This is not out-of-tune; it is a more precise emotional palette."},
    youtubeId:"Sp3T5L-c_xU", xp:130,
    desc:"Hamza represents the glottal stop — the catch-in-throat sound. It sits on different 'seats' depending on the surrounding vowels, following specific orthographic rules.",
    keyPoints:[
    "Hamza (ء) = glottal stop, like the pause in 'uh-oh'",
    "Seats of Hamza: أ (on Alif above) · إ (Alif below) · ؤ (on Waw) · ئ (on Ya) · ء (alone)",
    "Rule: the seat is chosen based on the strongest surrounding vowel (Kasra > Damma > Fatha)",
    "Word: أكل (akala = he ate) · سؤال (su'al = question) · رئيس (ra'ees = president)"
    ],
    letterForms:[
      {name:"Hamza on Alif", sound:"ʾ", iso:"أ", beg:"أ", mid:"ـأـ", end:"ـأ"},
      {name:"Hamza on Waw", sound:"ʾ", iso:"ؤ", beg:"ؤ", mid:"ـؤـ", end:"ـؤ"},
      {name:"Hamza on Ya", sound:"ʾ", iso:"ئ", beg:"ئـ", mid:"ـئـ", end:"ـئ"},
      {name:"Hamza alone", sound:"ʾ", iso:"ء", beg:"ء", mid:"ـءـ", end:"ـء"}
    ],
    quiz:buildTajweedQuiz()
  },
  {
    id:37, title:"Taa Marbuta (ة) & Alif Maqsura (ى)", arabic:"ة · ى",
    culture:{title:"جُحَا وَالفُكَاهَة العَرَبِيَّة -- Arab Humor",body:"جُحَا (Juha, known as Nasreddin Hodja in Turkish) is the archetypal Arab/Middle Eastern trickster -- a character who appears foolish but reveals deep wisdom. His stories use irony (السُّخْرِيَّة), misdirection, and absurdist logic to critique power, greed, and pomposity. جُحَا is always slightly right and completely wrong simultaneously. Arabic humor deeply values الطَّرَافَة (wittiness) and النُّكْتَة (the joke) -- a man who makes others laugh is deeply respected.",tip:"مَا فِيش زَيّ النُّكْتَة (there is nothing like a joke) -- Egyptian wisdom. Arab humor is often self-deprecating, political, and deeply embedded in dialect. Egyptian comedy (الكُومِيدْيَا المِصْرِيَّة) is the most exported Arabic cultural product after music."},
    youtubeId:"9Yf5J0Fw8sw", xp:130,
    desc:"Two special end-of-word characters. Taa Marbuta marks feminine nouns and is pronounced 't' when connected, 'h' when paused. Alif Maqsura looks like Ya without dots.",
    keyPoints:[
    "Taa Marbuta (ة) — only at end of words, marks feminine",
    "Pronounced 't' in connected speech: مدرسةُ العلم",
    "Pronounced 'h' when pausing: madrasah",
    "Alif Maqsura (ى) — like Ya without dots, long 'aa' at end of words: على (ala = on)"
    ],
    letterForms:[
      {name:"Taa Marbuta", sound:"t / h", iso:"ة", beg:"—", mid:"—", end:"ـة"},
      {name:"Alif Maqsura", sound:"aa", iso:"ى", beg:"—", mid:"—", end:"ـى"}
    ],
    quiz:buildTajweedQuiz()
  },
  {
    id:38, title:"Reading: Surah Al-Fatiha", arabic:"سُورَة الفَاتِحَة",
    youtubeId:"x5Kcn5Rgsus", xp:150,
    desc:"Apply everything you have learned to read Surah Al-Fatiha — the Opening, recited in every unit of prayer. Identify letters, vowels, sun/moon rules, and shaddah.",
    keyPoints:[
    "بِسْمِ اللهِ الرَّحْمَـٰنِ الرَّحِيمِ — Bismillah: Ba + kasra + Lam + Waw Madd",
    "الرَّحْمَـٰن — Ra is sun letter: ar-Rahmaan (Lam assimilated)",
    "رَبِّ الْعَالَمِينَ — Rabbi: Ra + Ba + shaddah on Ba",
    "Apply: vowels · long vowels · shaddah · sun/moon · waqf pauses"
    ],
    letterForms:[
      {name:"Al-Fatiha v1", sound:"Bismillah", iso:"بِسْمِ اللهِ", beg:"بِسْمِ", mid:"اللهِ", end:"الرَّحِيمِ"},
      {name:"Al-Fatiha v2", sound:"Al-hamdu", iso:"الْحَمْدُ لِلَّهِ", beg:"الْحَمْ", mid:"دُ لِلَّ", end:"هِ"}
    ],
    quiz:buildTajweedQuiz()
  },
  {
    id:39, title:"Reading: Al-Ikhlas, Al-Falaq, An-Nas", arabic:"قُلْ هُوَ اللهُ أَحَدٌ",
    youtubeId:"0plC5iC8b0s", xp:150,
    desc:"Read three short surahs independently: Al-Ikhlas (Sincerity), Al-Falaq (Daybreak), and An-Nas (Mankind). These are among the most memorised surahs by Muslims worldwide.",
    keyPoints:[
    "Al-Ikhlas: قُلْ هُوَ اللهُ أَحَدٌ — Qaf + Lam + sukoon · Waw Madd · Alif + Haa",
    "Al-Falaq: أَعُوذُ بِرَبِّ الْفَلَقِ — Ayn + Waw Madd · shaddah on Ba in رَبِّ",
    "An-Nas: مَلِكِ النَّاسِ — Noon with shaddah (sun letter): an-naas",
    "Practice: read each surah 3 times — slow, medium, flowing pace"
    ],
    letterForms:[
      {name:"Al-Ikhlas v1", sound:"Qul huwa", iso:"قُلْ هُوَ اللهُ", beg:"قُلْ", mid:"هُوَ", end:"اللهُ"},
      {name:"An-Nas v1", sound:"Qul a'udhu", iso:"قُلْ أَعُوذُ بِرَبِّ", beg:"قُلْ", mid:"أَعُوذُ", end:"بِرَبِّ"}
    ],
    quiz:buildTajweedQuiz()
  },
  {
    id:40, title:"Final Review & Assessment", arabic:"الاِمْتِحَان النِّهَائِي",
    youtubeId:"3Q4-Dh37MzY", xp:200,
    desc:"Congratulations on reaching Lesson 40! This final lesson reviews all 28 letters, all orthographic rules, and tests your ability to read unfamiliar fully-vowelled Arabic text.",
    keyPoints:[
    "28 letters: 22 connectors · 6 non-connectors",
    "Vowel marks: fatha · kasra · damma · sukoon · shaddah · tanwin",
    "Rules: sun/moon · hamza seats · taa marbuta · alif maqsura",
    "You are now ready to read the Quran with full vowels — مبروك!"
    ],
    letterForms:[
      {name:"All 28 letters", sound:"See Appendix", iso:"أ—ي", beg:"أ", mid:"ب ت ث", end:"ي"},
      {name:"Non-connectors", sound:"6 letters", iso:"ا د ذ ر ز و", beg:"ا", mid:"ر و", end:"ز"}
    ],
    quiz:buildTajweedQuiz()
  }
];
