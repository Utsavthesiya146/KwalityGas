const fs = require('fs');

const schema = fs.readFileSync('prisma/schema.prisma', 'utf8');
const models = schema
  .split('\n')
  .filter((l) => l.trim().startsWith('model '))
  .map((l) => l.trim().split(/\s+/)[1]);

console.log(`=== Prisma Models in schema.prisma (${models.length}) ===`);
models.forEach((m, idx) => console.log(`${idx + 1}. ${m}`));

const path = require('path');

const migrationsDir = 'prisma/migrations';
const tables = [];
const migrationDirs = fs.readdirSync(migrationsDir).filter((d) => fs.statSync(path.join(migrationsDir, d)).isDirectory());

for (const dir of migrationDirs) {
  const sqlPath = path.join(migrationsDir, dir, 'migration.sql');
  if (fs.existsSync(sqlPath)) {
    const migration = fs.readFileSync(sqlPath, 'utf8');
    const regex = /CREATE TABLE (?:IF NOT EXISTS )?`([^`]+)`/gi;
    let match;
    while ((match = regex.exec(migration)) !== null) {
      if (!tables.includes(match[1])) {
        tables.push(match[1]);
      }
    }
  }
}

console.log(`\n=== SQL Tables across all migrations (${tables.length}) ===`);
tables.forEach((t, idx) => console.log(`${idx + 1}. ${t}`));

// Check mapping
console.log('\n=== Comparing Schema Models to Migration Tables ===');
const missing = [];
for (const m of models) {
  // Check if table name matches model @@map or lowercase
  const regexMap = new RegExp(`model\\s+${m}\\s+{[^}]+@@map\\("([^"]+)"\\)`, 's');
  const mapped = schema.match(regexMap);
  const tableName = mapped ? mapped[1] : m;
  const found = tables.includes(tableName);
  console.log(`Model [${m}] -> Table [${tableName}] : ${found ? 'FOUND' : 'MISSING'}`);
  if (!found) missing.push({ model: m, table: tableName });
}

console.log(`\nResult: ${missing.length === 0 ? 'ALL MODELS MATCH TABLES 1-TO-1!' : 'MISMATCH DETECTED'}`);

