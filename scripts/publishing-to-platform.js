/**
 * Solve problems that may arise when publishing to e.g. Github page
 */

const fs = require('fs');
const path = require('path');

// Document that .nojekyll file is required when publishing to GitHub Pages
const outputDir = '../out/';
const targetPath = path.resolve(__dirname, outputDir + '.nojekyll');

if (!fs.existsSync(targetPath)) {
    fs.writeFileSync(targetPath, '');
    console.log(`--> created ${targetPath}`);
}

// Restore the old "api/" directory

const copyPath = path.resolve(__dirname, '../__api');
const oldPath = path.resolve(__dirname, '../app/api');

const copyDir = (src, dest) => {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
    const items = fs.readdirSync(src);

    items.forEach((item) => {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);

        const stat = fs.statSync(srcPath);
        if (stat.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
};


if (fs.existsSync(copyPath)) {
    copyDir(copyPath, oldPath);
    console.log(`--> copied ${copyPath} to ${oldPath}`);

    // delete old "api"
    fs.rmSync(copyPath, { recursive: true, force: true });
}