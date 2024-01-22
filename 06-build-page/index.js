const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'project-dist');
const htmlFilePath = path.join(__dirname, 'project-dist', 'index.html');
const cssFilePath = path.join(__dirname, 'project-dist', 'style.css');

fs.mkdir(folderPath, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.open(htmlFilePath, 'a+', (err) => {
  if (err) throw err;
  console.log('index.html file is created');
});

fs.open(cssFilePath, 'a+', (err) => {
  if (err) throw err;
  console.log('style.css file is created');
});

const copyFolder = path.join(__dirname, 'project-dist', 'assets');

fs.mkdir(copyFolder, { recursive: true }, (err) => {
  if (err) throw err;
  console.log('assets folder in project-dist is created');
});


// add markup to index.html start
const templatePath = path.join(__dirname, 'template.html');

fs.readFile(templatePath, (err, data) => {
  if (err) throw err;
  data.toString();

  fs.writeFile(htmlFilePath, data, (err) => {
    if (err) throw err;
  });
});
// add markup to index.html end


// combine styles in style.css start
const stylePath = path.join(__dirname, 'styles');

fs.truncate(cssFilePath, (err) => {
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

          fs.appendFile(cssFilePath, data, (err) => {
            if (err) throw err;
            console.log(`Styles of ${file} is added`);
          });
        });
      }
    });
  });
});
// combine styles in style.css end

