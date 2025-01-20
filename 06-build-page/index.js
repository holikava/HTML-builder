const path = require('path');
const fs = require('fs');
const fsPromise = require('fs').promises;

const projectDistFolder = path.join(__dirname, 'project-dist');
fs.mkdir(projectDistFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

async function pageBuilder() {
  await templateBuilder();
  mergeStyles();
}

function mergeStyles() {
  const stylesPath = path.join(__dirname, 'styles');
  const projectCssPath = path.join(projectDistFolder, 'style.css');
  try {
    const bundleStyles = fs.createWriteStream(projectCssPath);
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
  } catch (error) {
    console.log(error);
  }
}

async function templateBuilder() {
  const templatePath = path.join(__dirname, 'template.html');
  const bundleTemplate = path.join(projectDistFolder, 'index.html');
  try {
    await fsPromise.copyFile(templatePath, bundleTemplate);
    let content = await fsPromise.readFile(bundleTemplate, 'utf-8');

    const componentsPath = path.join(__dirname, 'components');
    const components = await fsPromise.readdir(componentsPath, {
      withFileTypes: true,
    });

    components.forEach(async (component) => {
      const componentPath = path.join(componentsPath, component.name);
      const fileExt = path.extname(componentPath);

      if (component.isFile() && fileExt === '.html') {
        const fileContent = await fsPromise.readFile(componentPath, 'utf-8');
        const fileName = component.name.replace(fileExt, '');
        content = content.replace(`{{${fileName}}}`, fileContent);

        await fsPromise.writeFile(bundleTemplate, content);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

pageBuilder();
