const {test,expect}=require('@playwright/test');
const copy=require('./fixtures/hades-copy.json');
for(const [width,height]of [[1024,768],[1180,820],[1366,1024],[768,1024],[820,1180],[393,844],[844,393]]){
 test(`Hades approved copy, panel bounds and navigation ${width}x${height}`,async({page})=>{
  await page.setViewportSize({width,height});await page.goto('./?god=hades');
  await expect(page.locator('#font-status')).toHaveText('Bundled book font loaded.');
  await expect.poll(()=>page.locator('.art').evaluateAll(es=>es.every(e=>e.complete&&e.naturalWidth===1067&&e.naturalHeight===1280))).toBeTruthy();
  for(const [id,text]of Object.entries(copy))expect(await page.locator(`[data-region="${id}"]`).evaluate(e=>[...e.querySelectorAll('h2,h3,p,li')].map(x=>x.textContent))).toEqual(text);
  const check=async()=>{
   await expect(page.locator('.region.overflowing:visible')).toHaveCount(0);
   const violations=await page.locator('.page:visible .region').evaluateAll(es=>es.flatMap(e=>{
    const b=e.getBoundingClientRect();return [...e.children].flatMap(c=>{const range=document.createRange();range.selectNodeContents(c);const r=range.getBoundingClientRect();return r.top<b.top-.6||r.bottom>b.bottom+.6||r.left<b.left-.6||r.right>b.right+.6?[e.dataset.region]:[]});
   }));expect(violations).toEqual([]);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  };
  await check();
  if(await page.locator('#next').isVisible()){await page.locator('#next').click();await check();}
  if(width>height){await page.locator('#view-mode').click();await check();if(await page.locator('#previous').isVisible()){if(await page.locator('#previous').isEnabled())await page.locator('#previous').click();await check();await page.locator('#next').click();await check();}await page.locator('#view-mode').click();await check();}
  if(width===1024)await page.screenshot({path:'test-results/hades-approved-spread.png',fullPage:true});
  await expect(page.locator('.stories a')).toHaveCount(0);
 });
}
test('Hades biography heading stays above spaced paragraphs and print is two A5 sheets',async({page})=>{
 await page.setViewportSize({width:1024,height:768});await page.goto('./?god=hades');await expect(page.locator('#font-status')).toHaveText('Bundled book font loaded.');
 const layout=await page.locator('.biography').evaluate(e=>{const b=e.getBoundingClientRect(),h=e.querySelector('h3').getBoundingClientRect(),ps=[...e.querySelectorAll('p')].map(p=>p.getBoundingClientRect());return {headingTop:h.top-b.top,firstGap:ps[1].top-ps[0].bottom,secondGap:ps[2].top-ps[1].bottom,headingClearance:ps[0].top-h.bottom}});
 expect(layout.headingTop).toBeLessThan(1);expect(layout.firstGap).toBeGreaterThan(15);expect(layout.secondGap).toBeGreaterThan(15);expect(layout.headingClearance).toBeGreaterThan(5);
 await page.emulateMedia({media:'print'});await expect(page.locator('.region.overflowing:visible')).toHaveCount(0);
 const pdf=await page.pdf({path:'test-results/hades-a5.pdf',preferCSSPageSize:true,printBackground:true});
 expect((pdf.toString('latin1').match(/\/Type\s*\/Page\b/g)||[]).length).toBe(2);
});
