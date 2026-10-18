const {test,expect}=require('@playwright/test');
for(const [width,height] of [[393,844],[844,393],[768,1024],[820,1180],[1024,768],[1180,820],[1366,1024]]) {
 test(`Zeus approved panels and navigation ${width}x${height}`,async({page})=>{
  await page.setViewportSize({width,height});
  await page.goto('./?god=zeus');
  await expect(page.locator('#font-status')).toHaveText('Bundled book font loaded.');
  await expect.poll(()=>page.locator('.art').evaluateAll(es=>es.every(e=>e.complete&&e.naturalWidth===1067&&e.naturalHeight===1280))).toBeTruthy();
  await expect(page.locator('.title h2')).toHaveText('ZEUS');
  await expect(page.locator('.region')).toHaveCount(10);
  const check=async()=>{
   await expect(page.locator('.region.overflowing:visible')).toHaveCount(0);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  };
  await check();
  if(await page.locator('#next').isVisible()){await page.locator('#next').click();await check();}
  await expect(page.locator('.stories li')).toHaveText(['Zeus and the Battle of the Titans — Coming soon','How the Three Brothers Divided the World — Coming soon','Zeus and the Birth of Athena — Coming soon']);
  await expect(page.locator('.family li')).toHaveText(['Brothers: Poseidon and Hades','Wife: Hera','Father: Cronus','Children include Athena, Apollo and Artemis']);
  if(width>height){await page.locator('#view-mode').click();await check();await page.locator('#view-mode').click();await check();}
  await page.screenshot({path:`test-results/zeus-${width}-${height}.png`,fullPage:true});
  await page.locator('#character').selectOption('poseidon');
  await expect(page.locator('.title h2')).toHaveText('POSEIDON');
  await page.locator('#character').selectOption('zeus');
  await expect(page.locator('.title h2')).toHaveText('ZEUS');
 });
}
test('Zeus prints two A5 pages',async({page})=>{
 await page.goto('./?god=zeus');await expect(page.locator('#font-status')).toHaveText('Bundled book font loaded.');
 await page.emulateMedia({media:'print'});
 await expect(page.locator('.page:visible')).toHaveCount(2);
 await expect(page.locator('.region.overflowing:visible')).toHaveCount(0);
 const pdf=await page.pdf({path:'test-results/zeus-a5.pdf',preferCSSPageSize:true,printBackground:true});
 expect((pdf.toString('latin1').match(/\/Type\s*\/Page\b/g)||[]).length).toBe(2);
});
