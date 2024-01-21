const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');
console.log(folderPath);

fs.readdir(folderPath, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    let currentFile = path.join(folderPath, file);
    fs.stat(currentFile, (err, file) => {
      if (err) throw err;
      if (file.isFile()) {
        let fileName = path.parse(currentFile).name;
        let fileExt = path.extname(currentFile);
        let size = file.size;
        let fileSizeKB = size*0.001;
        console.log(`${fileName} -- ${fileExt} -- ${fileSizeKB}kb`);
      };
    });
  });
});
