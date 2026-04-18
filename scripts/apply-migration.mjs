/**
 * Applies all SQL files in supabase/migrations (sorted by name).
 * Prefer DATABASE_MIGRATE_URL (Session pooler, IPv4). Fallback: DATABASE_URL.
 * Run: npm run db:migrate
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const migrationsDir = join(root, 'supabase', 'migrations');

const connectionString = process.env.DATABASE_MIGRATE_URL || process.env.DATABASE_URL;
if (!connectionString) {
  console.error('Set DATABASE_MIGRATE_URL or DATABASE_URL in .env');
  process.exit(1);
}

if (!process.env.DATABASE_MIGRATE_URL && process.env.DATABASE_URL) {
  console.warn('Using DATABASE_URL (direct). If EHOSTUNREACH, set DATABASE_MIGRATE_URL (Session pooler).\n');
}

const files = readdirSync(migrationsDir)
  .filter((f) => f.endsWith('.sql'))
  .sort();

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  for (const name of files) {
    const sql = readFileSync(join(migrationsDir, name), 'utf8');
    process.stdout.write(`Applying ${name} …\n`);
    await client.query(sql);
  }
  console.log('All migrations applied successfully.');
} catch (e) {
  const msg = e instanceof Error ? e.message : String(e);
  console.error(msg);
  if (msg.includes('EHOSTUNREACH')) {
    console.error(`
Use Session pooler URI as DATABASE_MIGRATE_URL (Dashboard → Connect → Session pooler),
or run the SQL file in the Supabase SQL Editor.
`);
  }
  process.exit(1);
} finally {
  await client.end().catch(() => {});
}
