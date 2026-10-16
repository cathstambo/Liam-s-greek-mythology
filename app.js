import { pages } from './pages.js';

const book = document.querySelector('#book');
const tools = document.querySelector('#tools');
const landscape = matchMedia('(orientation: landscape)');
const tabletWidth = matchMedia('(min-width: 1000px)');
const pageElements = [];
let currentPage = 0;
const referenceWidth = 494;

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
  const canvas = document.createElement('div'); canvas.className = 'page-canvas';
  canvas.append(image);
  for (const region of page.regions) {
    const section = document.createElement('section'); section.className = `region ${region.id}`;
    section.dataset.region = region.id;
    for (const [index, key] of ['left', 'top', 'width', 'height'].entries()) section.style[key] = `${region.box[index]}%`;
    section.append(content(region));
    if (region.bodyInset) section.querySelector('ul').style.paddingTop = `${region.bodyInset}%`;
    canvas.append(section);
  }
  article.append(canvas); book.append(article); pageElements.push(article);
}
function updateOrientation() {
  const portrait = window.innerHeight > window.innerWidth;
  document.querySelector('main').hidden = portrait;
  document.querySelector('.site-header').hidden = portrait;
  document.querySelector('#rotate-message').hidden = !portrait;
  book.classList.toggle('spread', tabletWidth.matches);
  pageElements.forEach((page, index) => { page.hidden = !tabletWidth.matches && index !== currentPage; });
  document.querySelector('#previous').hidden = tabletWidth.matches;
  document.querySelector('#next').hidden = tabletWidth.matches;
  document.querySelector('#previous').disabled = currentPage === 0;
  document.querySelector('#next').disabled = currentPage === pages.length - 1;
  document.querySelector('#page-status').textContent = tabletWidth.matches ? 'Pages 1 & 2 of 2' : `Page ${currentPage + 1} of 2`;
  if (portrait && tools.open) tools.close();
  requestAnimationFrame(resizePages);
}
function resizePages() {
  for (const page of pageElements) {
    if (page.clientWidth) page.style.setProperty('--page-scale', page.getBoundingClientRect().width / referenceWidth);
  }
  checkFit();
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
    ? `Layout review: ${failed.join('; ')} cannot fit at this text size. Review the panel dimensions or restore 100% text scale.`
    : 'All visible text panels fit at this size.';
  for (const id of ['#fit-status', '#fit-announcement']) document.querySelector(id).textContent = message;
  const indicator = document.querySelector('#fit-indicator'); indicator.textContent = failed.length || broken ? ' ⚠' : '';
  document.querySelector('#open-tools').setAttribute('aria-label', `Layout checks. ${message}`);
  const list = document.querySelector('#overflow-list'); list.replaceChildren();
  for (const title of failed) { const li = document.createElement('li'); li.textContent = `${title}: text exceeds its measured panel.`; list.append(li); }
}
document.querySelector('#home').addEventListener('click', () => { currentPage = 0; updateOrientation(); window.scrollTo(0, 0); });
document.querySelector('#previous').addEventListener('click', () => { currentPage = 0; updateOrientation(); window.scrollTo(0, 0); });
document.querySelector('#next').addEventListener('click', () => { currentPage = 1; updateOrientation(); window.scrollTo(0, 0); });
document.querySelector('#open-tools').addEventListener('click', () => tools.showModal());
document.querySelector('#print').addEventListener('click', () => { tools.close(); window.print(); });
document.querySelector('#text-scale').addEventListener('input', event => {
  document.documentElement.style.setProperty('--text-scale', event.target.value / 100);
  document.querySelector('#scale-value').value = `${event.target.value}%`;
  checkFit();
});
document.querySelector('#diagnostics').addEventListener('change', event => book.classList.toggle('diagnostics', event.target.checked));
landscape.addEventListener('change', updateOrientation);
tabletWidth.addEventListener('change', updateOrientation);
for (const page of pageElements) new ResizeObserver(resizePages).observe(page);
window.addEventListener('resize', updateOrientation);
updateOrientation();
