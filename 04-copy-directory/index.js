const fs = require('fs');
const path = require('path');

const srcFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

fs.mkdir(copyFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(copyFolder, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    fs.unlink(path.join(copyFolder, file), (err) => {
      if (err) throw err;
    });
  });
});

fs.readdir(srcFolder, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    let filePath = path.join(srcFolder, file);
    let copyFilePath = path.join(copyFolder, file);
    fs.readFile(filePath, (err) => {
      if (err) throw err;
      fs.copyFile(filePath, copyFilePath, (err) => {
        if (err) throw err;
        console.log(`Copy: ${file}`);
      });
    });
  });
});
