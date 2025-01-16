const fs = require('fs');
const path = require('path');

const projectPath = path.join(__dirname, 'project-dist', 'bundle.css');
const stylesPath = path.join(__dirname, 'styles');

mergeStyles();

function mergeStyles() {
  const bundleStyles = fs.createWriteStream(projectPath);
  fs.readdir(stylesPath, { withFileTypes: true }, (error, files) => {
    if (error) console.log(error);

    files.forEach((file) => {
      const filePath = path.join(stylesPath, file.name);
      const fileExt = path.extname(filePath);
      if (fileExt === '.css') {
        const srcStyles = fs.createReadStream(filePath, 'utf-8');
        srcStyles.on('data', (chunk) => bundleStyles.write(chunk));
      }
    });
  });
}
