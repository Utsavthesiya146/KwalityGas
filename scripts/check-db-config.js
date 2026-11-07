const fs = require('fs');

if (fs.existsSync('.env')) {
  const env = fs.readFileSync('.env', 'utf8');
  env.split('\n').forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    const parts = line.split('=');
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    if (key === 'DATABASE_URL') {
      try {
        const u = new URL(val);
        console.log(`DATABASE_URL: protocol=${u.protocol}, host=${u.hostname}, port=${u.port}, database=${u.pathname}`);
      } catch (e) {
        console.log(`DATABASE_URL format: custom or invalid URL (${e.message})`);
      }
    } else {
      console.log(`${key}: configured (length=${val.length})`);
    }
  });
} else {
  console.log('No .env file found');
}

