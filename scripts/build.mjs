import { mkdir, rm, copyFile } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets', { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'pages.js', '.nojekyll']) await copyFile(file, `dist/${file}`);
for (const side of ['left', 'right']) await copyFile(`assets/poseidon-${side}.svg`, `dist/assets/poseidon-${side}.svg`);
console.log('Static site built in dist/ (relative URLs support any project subpath).');
