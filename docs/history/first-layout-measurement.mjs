// Measurement only: does not change application files or approved artwork.
import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox']});
const page = await browser.newPage();
const results = [];
for (const [width,height] of [[1024,768],[1180,820],[1366,1024],[768,1024],[820,1180],[1024,1366]]) {
  await page.setViewportSize({width,height});
  await page.goto('http://127.0.0.1:8000/Liam-s-greek-mythology/');
  await page.evaluate(() => document.fonts.ready);
  const panels=[];
  for (const index of [0,1]) {
    await page.evaluate(i => showPage(i),index);
    const rows = await page.locator(`.page[data-page="${index}"] .region`).evaluateAll(regions => regions.map(region => {
      const original = region.style.fontSize;
      const fits = () => region.scrollHeight <= region.clientHeight + 1 && region.scrollWidth <= region.clientWidth + 1;
      region.style.fontSize = '16px';
      const fitAt16 = fits();
      const neededAt16 = region.scrollHeight;
      let lo=1,hi=40;
      for(let i=0;i<18;i++) {
        const mid=(lo+hi)/2; region.style.fontSize=`${mid}px`;
        if(fits()) lo=mid; else hi=mid;
      }
      const font=Math.floor(lo*10)/10;
      region.style.fontSize=original;
      const box=region.getBoundingClientRect();
      return {id:region.dataset.region,title:region.querySelector('h2,h3').textContent,
        box:{width:Math.round(box.width),height:Math.round(box.height)},maxFittingBasePx:font,fitAt16,neededHeightAt16:neededAt16,text:region.innerText};
    }));
    panels.push(...rows);
  }
  results.push({viewport:{width,height},pageWidth:await page.locator('.page').last().evaluate(el=>Math.round(el.getBoundingClientRect().width)),panels});
}
await writeFile('docs/assessment/measurements.json', JSON.stringify(results,null,2)+'\n');
await browser.close();
console.log('Saved measured text bounds and fitting font sizes for six iPad viewports.');
