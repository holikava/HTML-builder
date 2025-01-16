const fs = require('fs/promises');
const path = require('path');

const srcFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

copyDirectory();

async function copyDirectory() {
  try {
    await fs.rm(copyFolder, { recursive: true, force: true }); // remove files from copyFolder
    await fs.mkdir(copyFolder, { recursive: true });

    const srcFiles = await fs.readdir(srcFolder);

    srcFiles.forEach((file) => {
      const srcFile = path.join(srcFolder, file);
      const copyFile = path.join(copyFolder, file);
      fs.copyFile(srcFile, copyFile);
      console.log(`${file} is copy.`);
    });
  } catch (error) {
    console.log(error);
  }
}
