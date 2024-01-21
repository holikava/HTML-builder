const fs = require('fs');
const path = require('path');

const distFile = path.join(__dirname, 'project-dist', 'bundle.css');
const stylePath = path.join(__dirname, 'styles');

fs.open(distFile, 'a+', (err) => {
  if (err) throw err;
  console.log('bundle.css file is created');
});

fs.truncate(distFile, (err) => {
  if (err) throw err;
});

fs.readdir(stylePath, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    let currentFile = path.join(stylePath, file);
    fs.stat(currentFile, (err, stats) => {
      if (err) throw err;
      if (stats.isFile() && path.extname(currentFile) === '.css') {
        fs.readFile(currentFile, (err, data) => {
          if (err) throw err;
          data.toString();

          fs.appendFile(distFile, data, (err) => {
            if (err) throw err;
            console.log(`Styles of ${file} is added`);
          });
        });
      }
    });
  });
});
