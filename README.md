# Off the Curve: Seasons that Stand Out

Short, stat-driven articles about anomaly seasons in sports.

Live site: https://milessilber6.github.io/off-the-curve/

## What's in this folder

| File / folder | What it is |
| --- | --- |
| `index.html` | The homepage. You normally don't need to edit it. |
| `site.css` | Shared styling (colors, fonts, layout) used by every page. |
| `articles.js` | **The list of articles.** Drives the homepage cards and the previous/next links. |
| `leicester-2015-16/index.html` | The Leicester article. Each article lives in its own folder. |
| `_template/index.html` | A blank article to copy. (Folders starting with `_` are not published.) |

## Adding a new article

**1. Name the folder.** Use the player or club, a dash, and the season:
`leicester-2015-16`, `messi-2012`, `verstappen-2023`, `graf-1988`, `lebron-2018`.
Lowercase, dashes only. The folder name becomes the web address
(`.../off-the-curve/messi-2012/`), so don't rename it after publishing.

**2. Make the page.** Create the folder and put the article in it as `index.html`
(it must be called exactly `index.html`). Either:

- copy `_template/index.html` and fill it in, or
- start from a finished, self-contained article file (e.g. one designed with Claude) and
  make these changes to it:
  1. In `<head>`, add `<link rel="stylesheet" href="../site.css">` just before its `<style>` block.
  2. Delete from its `<style>` block anything that's already in `site.css`
     (colors, fonts, hero, layout, figures, Sources, footer). Keep styles only this article uses.
  3. Replace the site-name line at the top of the hero with the `<nav class="site-nav">`
     block from the template.
  4. Just before `<footer>`, add the `<nav class="article-nav" ...>` line from the template,
     with `data-slug` set to the folder name.
  5. Just before `</body>`, add `<script src="../articles.js"></script>`.

  Or hand the file to Claude Code and ask it to add the article to the site; it follows these
  same steps.

**3. Publish it in the list.** Open `articles.js`, find the article's line, and make sure
`slug` matches the folder name. Then change its status to `'published'`:

```js
{ title: "Messi '12", sport: 'Football', season: '2012', slug: 'messi-2012', status: 'published' },
```

That one change turns the homepage card into a link and adds the article to the
previous/next links on its neighbors. To add an article that isn't in the list yet, replace one
of the `'tba'` lines with a new line in the same format.

**4. Check it, then push.** Open `index.html` in a browser, click through to the new
article, and check the previous/next links at the bottom. Then commit and push to
`main`. GitHub Pages updates the live site within a minute or two.

## Changing things later

- **Order of articles:** reorder the lines in `articles.js`. That order is used on the
  homepage and for previous/next.
- **Colors or fonts site-wide:** edit the top of `site.css`.
- **Homepage card layout:** the `.cards` / `.card` rules near the bottom of `site.css`.
- **Card wording** ("Coming soon", "Read the story →"): `articles.js`, below the line
  that says you shouldn't need to edit it.
