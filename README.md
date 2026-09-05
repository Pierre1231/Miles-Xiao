# Miles-Xiao — SMARTER Lighting (static HTML site)

This branch (`html`) is a plain **HTML/CSS/JS** rebuild of the original Hugo site
(HugoBlox SaaS landing template). No build step, no framework: every page is a
static `index.html`.

## Structure

- `index.html` — home (hero + brand intro)
- `indoor-light/`, `outdoor-light/` — product galleries (one card per base model)
- `light/indoor-light/<category>/<model>/index.html` — 91 product detail pages
  (lowercase URLs, identical to the canonical URLs of the old site)
- `light/Indoor Light/…`, `light/Outdoor Light/…` — product images (WebP;
  original paths with spaces are kept, old `.png/.jpg` URLs are 301-redirected
  via `_redirects`)
- `download/` — catalog PDF
- `css/style.css`, `js/` — hand-written styles and vanilla JS (product variant
  selector, client-side search, hero sizing)

## Local preview

    python3 -m http.server 8000
    # open http://localhost:8000/

## Netlify

`netlify.toml` sets publish = "." with no build command — point the site at this
branch and it deploys as-is. `_redirects` keeps every old URL working (images
now `.webp`, page URLs unchanged); `_headers` adds long-term caching for
css/js/media. Sitemap/robots use https://smarterteck.com .

## Repo size

All product photos were re-encoded to WebP (quality 82): the working tree went
from ~464 MB to ~108 MB. Note: git history still contains the original
blobs; pruning history requires a separate history rewrite / squash.
