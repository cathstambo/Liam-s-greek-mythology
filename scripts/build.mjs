import { mkdir, rm, copyFile, cp, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const version = text => createHash('sha256').update(text).digest('hex').slice(0,12);
await rm('dist', {recursive:true,force:true});
await mkdir('dist/assets', {recursive:true});
const pages = await readFile('pages.js','utf8');
const pagesName = `pages.${version(pages)}.js`;
const app = (await readFile('app.js','utf8')).replace('./pages.js', `./${pagesName}`);
const appName = `app.${version(app)}.js`;
const css = await readFile('styles.css','utf8');
const cssName = `styles.${version(css)}.css`;
const html = (await readFile('index.html','utf8')).replace('./app.js', `./${appName}`).replace('./styles.css', `./${cssName}`);
for (const [name,content] of [[pagesName,pages],[appName,app],[cssName,css],['index.html',html]]) await writeFile(`dist/${name}`,content);
await copyFile('.nojekyll','dist/.nojekyll');
for(const side of ['left','right']) await copyFile(`assets/poseidon-${side}.svg`,`dist/assets/poseidon-${side}.svg`);
console.log('Built dist/ with matching versioned code/styles and relative project URLs.');

await cp('assets/fonts','dist/assets/fonts',{recursive:true});
