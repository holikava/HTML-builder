const fs = require('fs');
const path = require('path');

const textPath = path.resolve(__dirname, 'text.txt');

const output = fs.createReadStream(textPath, 'utf-8');

output.on('data', (data) => {
  console.log('Content is: ' + data);
});

console.log('continue...');

