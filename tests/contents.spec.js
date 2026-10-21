const {test,expect}=require('@playwright/test');
test('contents opens both chapters and Home returns to menu',async({page})=>{
 for(const size of [{width:393,height:844},{width:1024,height:768}]){
  await page.setViewportSize(size);await page.goto('./');
  await expect(page.getByRole('heading',{name:'Contents',exact:true})).toBeVisible();
  await expect(page.locator('#reader')).not.toBeVisible();
  for(const god of ['Poseidon','Zeus','Hades']){
   await page.getByRole('link',{name:new RegExp('^'+god)}).click();
   await expect(page.locator('#reader')).toBeVisible();
   await expect(page.locator('.title h2')).toHaveText(god.toUpperCase());
   await page.locator('#home').click();
   await expect(page.locator('#contents')).toBeVisible();
   await expect(page.locator('#reader')).not.toBeVisible();
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 }
});
