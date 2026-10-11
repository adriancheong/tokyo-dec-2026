# Shiga Kogen itinerary site

A single static page showing the December 2026 snowboarding trip — Tokyo,
Nagano and Shiga Kogen — built to be shared as a link. Same look and the same
workings as the November Tokyo site.

## Updating the trip

Everything that changes lives in **`itinerary.js`**. Nothing else needs touching.

```bash
# edit itinerary.js
git commit -am "Confirm the West building"
git push
```

GitHub rebuilds the page within a minute or so. Hard-refresh if you don't see
the change immediately (⌘⇧R).

To preview before pushing, just open `index.html` in a browser — it works
straight off the filesystem, no server needed.

### The shape of the data

Each day is an object with a list of entries (the field is still called
`meals`, as in the November site):

```js
{
  dow: "Saturday", date: "26", month: "Dec",
  area: "Up the mountain",
  meals: [
    { slot: "Bus", time: "09:10", name: "Nagaden express bus to Shiga Kogen",
      status: "travel", notes: ["..."] }
  ]
}
```

A day can cover a range — set `date: "27–30"` and give it a `heading`.

`status` controls the mark next to each entry:

| value | shows as |
|---|---|
| `booked` | filled red dot — reserved, time is fixed |
| `tobook` | bold dashed ring — not booked yet |
| `travel` | small diamond — getting from A to B |
| `ride` | short bar — on the snow |
| `walkin` | open green ring — just turn up |
| `tbc` | dashed blue ring — being arranged |
| `free` | faint ring — nothing planned |

Every field except `name` is optional. Omit one and that line simply doesn't
render. The optional extras are `jp` (Japanese name), `dish`, `where`, `walk`,
`tel`, `notes`, `why`, `menu`, `fallback`, and `map` — a Google Maps search
phrase that turns the name into a map link.

Other top-level pieces: `lockedTitle` and `locked` (the boxed connections at
the top), `floatingTitle` and `floating` (one or more "still to pin down"
cards), and `refs` (titled two-column lists, such as the booking checklist).

## Files

```
index.html          page shell
itinerary.js        ← the trip. this is the one you edit
assets/style.css    styling
assets/render.js    turns the data into the page
.nojekyll           tells GitHub to serve the files as-is
```

`.nojekyll` matters: without it GitHub runs the files through Jekyll, which
ignores anything it doesn't recognise and can silently drop assets.

## GitHub Pages

The site is live at `https://adriancheong.github.io/tokyo-dec-2026/`.

It is currently published from the **`gh-pages`** branch, which is a copy of
`master`. After pushing a change to `master`, publish it with:

```bash
git push origin master:gh-pages
```

To publish straight from `master` instead (as the November site does):
Settings → Pages → Source: **Deploy from a branch** → Branch: **master**,
folder **/ (root)** → Save. The `gh-pages` branch can then be deleted.

A published Pages site is reachable by anyone with the link, whatever the
repo's visibility.

## What's deliberately not in here

No reservation numbers, no names, no email addresses, no totals paid. Hotel
names, public telephone numbers, train and bus times and public prices are
included.

The page carries `noindex, nofollow`, which asks search engines to stay away.
It's a request, not a lock.
