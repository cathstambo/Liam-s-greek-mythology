// Normalize canvases without decoding, repainting, cropping or resampling the supplied images.
import { readFile, writeFile } from 'node:fs/promises';
for (const [side, extension, mime] of [['left', 'jpg', 'jpeg'], ['right', 'png', 'png']]) {
  const raw = await readFile(`assets/poseidon-${side}-source.${extension}`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1067" height="1280" viewBox="0 0 1067 1280"><image width="1067" height="1280" preserveAspectRatio="xMidYMid meet" href="data:image/${mime};base64,${raw.toString('base64')}"/></svg>\n`;
  await writeFile(`assets/poseidon-${side}.svg`, svg);
}
console.log('Prepared matching canvases with source image bytes intact.');
