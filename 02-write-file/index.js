const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const textFile = fs.createWriteStream(
  path.join(__dirname, 'text.txt'),
  'utf-8',
);

stdout.write('What do you like?\n');
stdin.on('data', (data) => {
  if (data.toString().trim().toLowerCase() === 'exit') {
    process.exit();
  } else {
    textFile.write(data);
    console.log('added! next >');
  }
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('Done. Have a nice day!\n'));
