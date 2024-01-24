const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
  const sourceDir = path.join(__dirname, 'files');
  const targetDir = path.join(__dirname, 'files-copy');

  try {
    // make dir
    await fs.mkdir(targetDir, { recursive: true });
    // existing files checker
    const existingFiles = await fs.readdir(targetDir);
    for (const file of existingFiles) {
      await fs.unlink(path.join(targetDir, file));
    }
    // read 'files'
    const files = await fs.readdir(sourceDir, { withFileTypes: true });
    // copy files
    for (const file of files) {
      if (file.isFile()) {
        const srcFilePath = path.join(sourceDir, file.name);
        const destFilePath = path.join(targetDir, file.name);
        await fs.copyFile(srcFilePath, destFilePath);
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

copyDir();
