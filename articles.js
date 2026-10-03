/* ==========================================================================
   Off the Curve: the list of articles
   This list drives the homepage cards and the previous/next links at the
   bottom of each article. The order here is the order on the homepage and
   the reading order for previous/next.

   status:
     'published'    card links to the article; included in previous/next
     'coming-soon'  card shows "Coming soon"; skipped by previous/next
     'tba'          placeholder card, "To be announced"

   To publish an article: put it in its folder (slug), then change its
   status to 'published'. See README.md for the full steps.
   ========================================================================== */
const ARTICLES = [
  { title: "Leicester '16",  sport: 'Football',   season: '2015/16', slug: 'leicester-2015-16', status: 'published' },
  { title: "Verstappen '23", sport: 'Formula 1',  season: '2023',    slug: 'verstappen-2023',   status: 'coming-soon' },
  { title: "James '18",      sport: 'Basketball', season: '2018',    slug: 'lebron-2018',       status: 'coming-soon' },
  { title: "Messi '12",      sport: 'Football',   season: '2012',    slug: 'messi-2012',        status: 'coming-soon' },
  { title: "Graf '88",       sport: 'Tennis',     season: '1988',    slug: 'graf-1988',         status: 'coming-soon' },
  { title: 'To be announced', status: 'tba' },
  { title: 'To be announced', status: 'tba' },
  { title: 'To be announced', status: 'tba' },
];

/* --------------------------------------------------------------------------
   You shouldn't need to edit anything below this line.
   -------------------------------------------------------------------------- */
(function () {
  // The site's root folder, worked out from where this file lives, so links
  // work both on GitHub Pages (/off-the-curve/) and when opened locally.
  const root = new URL('.', document.currentScript.src);
  // Opened straight from disk, a folder link shows a file list, so point at index.html.
  const page = location.protocol === 'file:' ? 'index.html' : '';
  const href = slug => new URL(slug + '/' + page, root).href;

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function renderCards(list) {
    ARTICLES.forEach(a => {
      const li = el('li');
      const live = a.status === 'published';
      const card = el(live ? 'a' : 'div', 'card' + (a.status === 'coming-soon' ? ' soon' : '') + (a.status === 'tba' ? ' tba' : ''));
      if (live) card.href = href(a.slug);
      if (a.sport) card.appendChild(el('div', 'card-meta', a.sport + ' · ' + a.season));
      card.appendChild(el('div', 'card-title', a.title));
      card.appendChild(el('div', 'card-status', live ? 'Read the story →' : a.status === 'coming-soon' ? 'Coming soon' : ''));
      li.appendChild(card);
      list.appendChild(li);
    });
  }

  function renderPrevNext(nav) {
    const published = ARTICLES.filter(a => a.status === 'published');
    const i = published.findIndex(a => a.slug === nav.dataset.slug);
    if (i === -1) return;
    const link = (a, cls, dir) => {
      const l = el('a', cls);
      l.href = href(a.slug);
      l.appendChild(el('span', 'dir', dir));
      l.appendChild(el('span', 't', a.title));
      nav.appendChild(l);
    };
    if (published[i - 1]) link(published[i - 1], 'prev', '← Previous');
    if (published[i + 1]) link(published[i + 1], 'next', 'Next →');
    if (nav.children.length) nav.hidden = false;
  }

  function init() {
    const list = document.getElementById('article-cards');
    if (list) renderCards(list);
    const nav = document.getElementById('article-nav');
    if (nav) renderPrevNext(nav);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
