const { test, expect } = require('@playwright/test');
for (const [width, height] of [[1024,768],[1180,820],[1366,1024]]) {
  test(`spread and exact live text fit at ${width} × ${height}`, async ({ page }) => {
    await page.setViewportSize({width,height});
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto('./'); await expect(page.locator('.page:visible')).toHaveCount(2);
    await expect(page.locator('.art')).toHaveCount(2);
    await expect.poll(() => page.locator('.art').evaluateAll(images => images.every(i => i.complete && i.naturalWidth === 1067 && i.naturalHeight === 1280))).toBeTruthy();
    await expect(page.locator('.region.overflowing')).toHaveCount(0);
    const size = await page.evaluate(() => ({w:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight}));
    expect(size).toEqual({w:width,h:height});
    await expect(page.locator('.family')).toContainText('Son: Polyphemus, a one-eyed Cyclops');
    await expect(page.locator('.biography')).toContainText("When he's happy, the sea is calm and peaceful.");
    await expect(page.locator('.stories .soon')).toHaveCount(3);
    await expect(page.locator('.stories a')).toHaveCount(0);
    await expect(page.locator('.personality')).toHaveCount(0);
    expect(errors).toEqual([]);
    await page.screenshot({path:`test-results/spread-${width}.png`,fullPage:true});
  });
}
test('portrait shows rotation guidance; landscape restores the whole book', async ({page}) => {
  await page.setViewportSize({width:768,height:1024}); await page.goto('./');
  await expect(page.locator('#rotate-message')).toBeVisible();
  await expect(page.locator('.page:visible')).toHaveCount(0);
  await expect(page.locator('#open-tools')).not.toBeVisible();
  await page.setViewportSize({width:1024,height:768});
  await expect(page.locator('#rotate-message')).not.toBeVisible();
  await expect(page.locator('.page:visible')).toHaveCount(2);
  await page.locator('#open-tools').click(); await expect(page.locator('#tools')).toBeVisible();
  await page.setViewportSize({width:768,height:1024});
  await expect(page.locator('#tools')).not.toBeVisible();
  await expect(page.locator('#rotate-message')).toBeVisible();
});
test('typography changes real text and exposes overflow; tools close with Escape', async ({page}) => {
  await page.setViewportSize({width:1024,height:768}); await page.goto('./');
  const before = await page.locator('.stories').evaluate(e => parseFloat(getComputedStyle(e).fontSize));
  await page.locator('#open-tools').click();
  await page.locator('#text-scale').fill('140');
  const after = await page.locator('.stories').evaluate(e => parseFloat(getComputedStyle(e).fontSize));
  expect(after).toBeCloseTo(before*1.4,1);
  await expect(page.locator('#overflow-list li')).not.toHaveCount(0);
  await page.locator('#diagnostics').check(); await expect(page.locator('#book')).toHaveClass(/diagnostics/);
  await page.keyboard.press('Escape'); await expect(page.locator('#tools')).not.toBeVisible();
});
test('print produces artwork and all copy on two A5 sheets', async ({page}) => {
  await page.goto('./'); await page.emulateMedia({media:'print'});
  await expect(page.locator('.page:visible')).toHaveCount(2);
  await expect(page.locator('.site-header')).not.toBeVisible();
  const pdf = await page.pdf({path:'test-results/poseidon-a5.pdf',preferCSSPageSize:true,printBackground:true});
  expect(pdf.length).toBeGreaterThan(100000);
  const source = pdf.toString('latin1');
  expect((source.match(/\/Type\s*\/Page\b/g) || []).length).toBe(2);
  const box = /\/MediaBox\s*\[\s*0\s+0\s+([\d.]+)\s+([\d.]+)/.exec(source);
  expect(Boolean(box), 'PDF contains page dimensions').toBeTruthy();
  expect(Number(box[1])).toBeCloseTo(420, 0);
  expect(Number(box[2])).toBeCloseTo(594.96, 0);
});

test('all current approved copy appears exactly, with no added sections', async ({page}) => {
  await page.goto('./');
  const expected = {
    title: ['POSEIDON', 'God of the Sea', 'Say it: puh-SY-dun'],
    biography: ['Who is Poseidon?', 'Poseidon is one of the mightiest Greek gods! He rules the seas and oceans with his powerful golden trident.', "When he's happy, the sea is calm and peaceful. But when he's angry, watch out! He can create enormous waves, wild storms and even earthquakes.", 'He lives in a magnificent underwater palace surrounded by amazing sea creatures.'],
    'powers-card': ['Powers', 'Seas, storms and earthquakes'],
    'symbol-card': ['Symbol', 'His mighty trident'],
    'home-card': ['Home', 'A palace beneath the sea'],
    'animal-card': ['Sacred Animal', 'The horse'],
    'special-powers': ['Special Powers', 'Creates giant waves', 'Summons powerful storms', 'Causes earthquakes'],
    family: ['Family', 'Brothers: Zeus and Hades', 'Wife: Amphitrite', 'Son: Polyphemus, a one-eyed Cyclops'],
    'did-you-know': ['Did You Know?', 'The ancient Greeks believed Poseidon created the very first horse!'],
    stories: ['Explore His Stories', 'Odysseus and the Cyclops — Coming soon', 'Poseidon and Athena — Coming soon', 'The Adventures of Odysseus — Coming soon'],
  };
  await expect(page.locator('.region')).toHaveCount(Object.keys(expected).length);
  for (const [id, text] of Object.entries(expected)) {
    const actual = await page.locator(`[data-region="${id}"]`).evaluate(el => [...el.querySelectorAll('h2,h3,p,li')].map(e=>e.textContent));
    expect(actual, id).toEqual(text);
  }
});

test('phone landscape opens the book automatically and portrait only shows guidance', async ({page}) => {
  await page.setViewportSize({width:844,height:390}); await page.goto('./');
  await expect(page.locator('.page:visible')).toHaveCount(2);
  await expect(page.locator('.region.overflowing')).toHaveCount(0);
  await expect(page.getByRole('button', {name:'Single page',exact:true})).toHaveCount(0);
  const bounds=await page.locator('#book').boundingBox();
  expect(bounds.x+bounds.width).toBeLessThanOrEqual(844);
  expect(bounds.y+bounds.height).toBeLessThanOrEqual(390);
  await page.setViewportSize({width:390,height:844});
  await expect(page.locator('.page:visible')).toHaveCount(0);
  await expect(page.locator('#rotate-message')).toBeVisible();
  await page.emulateMedia({media:'print'});
  await expect(page.locator('#rotate-message')).not.toBeVisible();
  await expect(page.locator('.page:visible')).toHaveCount(2);
});
