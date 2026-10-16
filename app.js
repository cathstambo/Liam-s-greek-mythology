import { pages } from './pages.js';

const book = document.querySelector('#book');
const tools = document.querySelector('#tools');
let currentPage = 0;
let forceSingle = false;
let printMode = false;
const spread = matchMedia('(min-width: 1000px) and (orientation: landscape)');
const pageElements = [];

function content(region) {
  const fragment = document.createDocumentFragment();
  const heading = document.createElement(region.id === 'title' ? 'h2' : 'h3');
  heading.textContent = region.title;
  fragment.append(heading);
  for (const text of [region.subtitle, region.pronunciation, ...(region.paragraphs || [])].filter(Boolean)) {
    const p = document.createElement('p'); p.textContent = text; fragment.append(p);
  }
  if (region.bullets || region.stories) {
    const list = document.createElement('ul');
    for (const text of region.bullets || region.stories) {
      const li = document.createElement('li'); li.append(document.createTextNode(text));
      if (region.stories) {
        const status = document.createElement('span'); status.className = 'soon';
        status.textContent = ' — Coming soon'; li.append(status);
      }
      list.append(li);
    }
    fragment.append(list);
  }
  return fragment;
}
for (const page of pages) {
  const article = document.createElement('article'); article.className = 'page';
  article.setAttribute('aria-label', page.label); article.tabIndex = -1;
  const image = document.createElement('img'); image.className = 'art';
  image.src = `./assets/poseidon-${page.id}.svg`; image.width = 1067; image.height = 1280;
  image.alt = page.description; image.addEventListener('load', checkFit);
  image.addEventListener('error', () => { image.dataset.failed = 'true'; checkFit(); });
  article.append(image);
  for (const region of page.regions) {
    const section = document.createElement('section'); section.className = `region ${region.id}`;
    section.dataset.region = region.id;
    for (const [index, key] of ['left', 'top', 'width', 'height'].entries()) section.style[key] = `${region.box[index]}%`;
    section.append(content(region));
    if (region.bodyInset) section.querySelector('ul').style.paddingTop = `${region.bodyInset}%`;
    article.append(section);
  }
  book.append(article); pageElements.push(article);
}
function isSpread() { return spread.matches && !forceSingle; }
function showPage(index = currentPage, focus = false) {
  currentPage = Math.max(0, Math.min(pages.length - 1, index));
  book.classList.toggle('spread', isSpread());
  pageElements.forEach((page, i) => { page.hidden = !printMode && !isSpread() && i !== currentPage; });
  document.querySelector('#previous').disabled = isSpread() || currentPage === 0;
  document.querySelector('#next').disabled = isSpread() || currentPage === pages.length - 1;
  document.querySelector('#page-status').textContent = isSpread() ? 'Pages 1 & 2 of 2' : `Page ${currentPage + 1} of 2`;
  document.querySelector('#single-page').textContent = forceSingle ? 'Use automatic layout' : 'Show one page';
  document.querySelector('#single-page').setAttribute('aria-pressed', String(forceSingle));
  if (focus) pageElements[currentPage].focus({ preventScroll: true });
  requestAnimationFrame(checkFit);
}
function checkFit() {
  const failed = [];
  for (const region of book.querySelectorAll('.region')) {
    if (!region.clientWidth) continue;
    const rect = region.getBoundingClientRect();
    const outside = [...region.children].some(child => {
      const bounds = child.getBoundingClientRect();
      return bounds.top < rect.top - .5 || bounds.bottom > rect.bottom + .5 || child.scrollWidth > child.clientWidth + 1;
    });
    const overflow = outside || region.scrollHeight > region.clientHeight + 1 || region.scrollWidth > region.clientWidth + 1;
    region.classList.toggle('overflowing', overflow);
    if (overflow) failed.push(region.querySelector('h2,h3').textContent);
  }
  const broken = book.querySelector('img[data-failed]');
  const message = broken ? 'Page artwork failed to load. Check the asset files or reload.' : failed.length
    ? `Layout review: ${failed.join('; ')} cannot fit at this text size. Use one page or review the panel dimensions.`
    : 'All visible text panels fit at this size.';
  for (const id of ['#fit-status', '#fit-announcement']) document.querySelector(id).textContent = message;
  const indicator = document.querySelector('#fit-indicator'); indicator.textContent = failed.length || broken ? ' ⚠' : '';
  document.querySelector('#open-tools').setAttribute('aria-label', `Layout checks. ${message}`);
  const list = document.querySelector('#overflow-list'); list.replaceChildren();
  for (const title of failed) { const li = document.createElement('li'); li.textContent = `${title}: text exceeds its measured panel.`; list.append(li); }
}
document.querySelector('#previous').addEventListener('click', () => showPage(currentPage - 1, true));
document.querySelector('#next').addEventListener('click', () => showPage(currentPage + 1, true));
document.querySelector('#home').addEventListener('click', () => showPage(0, true));
document.querySelector('#open-tools').addEventListener('click', () => tools.showModal());
document.querySelector('#single-page').addEventListener('click', () => { forceSingle = !forceSingle; showPage(); });
document.querySelector('#print').addEventListener('click', () => { tools.close(); window.print(); });
document.querySelector('#text-scale').addEventListener('input', event => {
  document.documentElement.style.setProperty('--text-scale', event.target.value / 100);
  document.querySelector('#scale-value').value = `${event.target.value}%`;
  checkFit();
});
document.querySelector('#diagnostics').addEventListener('change', event => book.classList.toggle('diagnostics', event.target.checked));
document.addEventListener('keydown', event => {
  if (tools.open || /INPUT|TEXTAREA|SELECT|BUTTON/.test(event.target.tagName) || isSpread()) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault(); showPage(currentPage + (event.key === 'ArrowRight' ? 1 : -1), true);
  }
});
spread.addEventListener('change', () => showPage());
new ResizeObserver(checkFit).observe(book);
window.addEventListener('beforeprint', () => { printMode = true; pageElements.forEach(page => { page.hidden = false; }); });
window.addEventListener('afterprint', () => { printMode = false; showPage(); });
showPage();
