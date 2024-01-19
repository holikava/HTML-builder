const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;

const textFilePath = path.resolve(__dirname, 'text.txt');

fs.open(textFilePath, 'w', (err) => {
  if (err) throw err;
});

stdout.write('What do you like?\n');
stdin.on('data', (data) => {
  if (data.toString().trim().toLowerCase() === 'exit') {
    process.exit();
  }
  fs.appendFile(textFilePath, data, (err) => {
    if (err) throw err;
    console.log('added! next >');
  });
});

process.on('SIGINT', process.exit);
process.on('exit', () => stdout.write('Done. Have a nice day!'));
