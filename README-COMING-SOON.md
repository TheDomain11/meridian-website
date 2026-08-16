# Coming-Soon Page — Deploy & Restore

Two files here: `index.html` (the coming-soon page) and `_redirects` (Netlify routing rule).
Run this from whichever machine has `meridian-website` cloned and up to date.

## Deploy

```bash
cd path/to/meridian-website
git pull origin main                       # make sure you're not on a stale clone

git checkout -b full-site-backup            # snapshot the real site first
git push origin full-site-backup
git checkout main

cp /path/to/downloaded/index.html ./index.html
cp /path/to/downloaded/_redirects ./_redirects

git add index.html _redirects
git commit -m "Temporary coming-soon page with email capture; full site preserved on full-site-backup branch"
git push origin main
```

Netlify auto-deploys on push to main — the live site becomes the coming-soon page within a minute or two.

**One manual step in the Netlify dashboard:** Site settings → Forms → enable email notifications
for the `coming-soon-updates` form, so submissions land in your inbox (not just the Netlify Forms
tab). Netlify only registers a form the first time it sees the `<form data-netlify="true">` tag in
a deploy, so this appears automatically after the push above — you just need to turn notifications on.

## What this does

- `_redirects` routes every URL on the site to `index.html` (assets/favicons still load normally),
  so anyone landing on `/services.html`, `/pricing.html`, etc. also gets the coming-soon page.
- The real site's HTML files are untouched in the repo and fully preserved on the `full-site-backup`
  branch — nothing is deleted.
- Email capture uses Netlify Forms (no backend needed) with a honeypot field for spam.

## Restore the full site later

```bash
cd path/to/meridian-website
git pull origin main
git checkout full-site-backup -- index.html
git rm _redirects
git commit -m "Restore full site — end coming-soon period"
git push origin main
```

That's the whole rollback — one commit, live again in a minute or two.
