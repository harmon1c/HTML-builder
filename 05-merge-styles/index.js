const fs = require('fs').promises;
const path = require('path');

async function buildCSSBundle() {
  const stylesDir = path.join(__dirname, 'styles');
  const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

  try {
    // get style list
    const files = await fs.readdir(stylesDir, { withFileTypes: true });
    let bundleContent = '';
    // read
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const filePath = path.join(stylesDir, file.name);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        bundleContent += fileContent + '\n';
      }
    }
    // write to bundle
    await fs.writeFile(bundlePath, bundleContent);
  } catch (err) {
    console.error('Error:', err);
  }
}

buildCSSBundle();
