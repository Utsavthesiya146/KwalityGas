const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/Admin/.gemini/antigravity/brain/0d890e28-5a79-4fb0-bfe1-49aba062702a/.system_generated/logs/transcript_full.jsonl')
});

rl.on('line', (line) => {
  if (line.includes('"step_index":4777')) {
    const data = JSON.parse(line);
    fs.writeFileSync('prompt10.txt', data.content);
    console.log('Saved prompt10.txt, length:', data.content.length);
    process.exit(0);
  }
});
