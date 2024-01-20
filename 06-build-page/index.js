const fs = require('fs').promises;
const path = require('path');

async function buildPage() {
  const projectDist = path.join(__dirname, 'project-dist');
  const templatePath = path.join(__dirname, 'template.html');
  const componentsPath = path.join(__dirname, 'components');
  const stylesPath = path.join(__dirname, 'styles');
  const assetsPath = path.join(__dirname, 'assets');

  await fs.mkdir(projectDist, { recursive: true });

  let template = await fs.readFile(templatePath, 'utf-8');
  const componentFiles = await fs.readdir(componentsPath, {
    withFileTypes: true,
  });

  for (const file of componentFiles) {
    if (file.isFile() && path.extname(file.name) === '.html') {
      const name = file.name.split('.')[0];
      const componentContent = await fs.readFile(
        path.join(componentsPath, file.name),
        'utf-8',
      );
      template = template.replace(
        new RegExp(`{{${name}}}`, 'g'),
        componentContent,
      );
    }
  }

  await fs.writeFile(path.join(projectDist, 'index.html'), template);

  await compileCSS(stylesPath, path.join(projectDist, 'style.css'));

  await copyDir(assetsPath, path.join(projectDist, 'assets'));
}

// compile css from subtask 05
async function compileCSS(stylesDir, bundlePath) {
  try {
    const files = await fs.readdir(stylesDir, { withFileTypes: true });
    let bundleContent = '';

    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const filePath = path.join(stylesDir, file.name);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        bundleContent += fileContent + '\n';
      }
    }

    await fs.writeFile(bundlePath, bundleContent);
  } catch (err) {
    console.error('Error:', err);
  }
}

//copy dir from subtask 04
async function copyDir(sourceDir, targetDir) {
  try {
    await fs.mkdir(targetDir, { recursive: true });

    const files = await fs.readdir(sourceDir, { withFileTypes: true });

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

buildPage();
