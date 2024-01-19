const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;

const textFilePath = path.resolve(__dirname, 'text.txt');

fs.open(textFilePath, 'w', (err) => {
  if (err) throw err;
});

stdout.write('What about you thinking?\n');
stdin.on('data', (data) => {
  fs.appendFile(textFilePath, data, (err) => {
    if (err) throw err;
    console.log('added! next >');
  });
});
