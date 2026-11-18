# 06 · Deployment

## GitHub

- Repo: `HarshilForWork/Hemang-riya`, branch `main`.
- Remote uses Hemang's personal SSH key through the `github-personal` host alias (defined in `~/.ssh/config` on his Mac):
  ```bash
  git remote -v   # origin  git@github-personal:HarshilForWork/Hemang-riya.git
  ```
- **Commit identity:** this repo's local git config is set to Hemang's personal GitHub identity (the global git config on that Mac is his work identity, which must not be used here). Check before committing:
  ```bash
  git config user.name    # HarshilForwork
  ```
- Commit messages end with a `Co-Authored-By:` line when written with Claude.

## Vercel

- Project imported from the GitHub repo; framework preset **Other**, no build command, output directory = repo root.
- Every push to `main` deploys automatically (usually within seconds). Live URL: https://hemang-riya.vercel.app
- `.vercelignore` keeps `docs/`, `tools/`, and Markdown files out of the deployment.
- `vercel.json`: assets cached for a day (`stale-while-revalidate` a week), `X-Robots-Tag: noindex, nofollow`, `nosniff`, referrer policy, clean URLs.

## Releasing a change

1. Edit, then bump `?v=N` for `styles.css` / `app.js` in `index.html` if either changed.
2. Test (docs/05) at phone, tablet and desktop sizes.
3. Commit and push to `main`.
4. Confirm the live site serves the new version, e.g.:
   ```bash
   curl -s https://hemang-riya.vercel.app/ | grep -o 'app.js?v=[0-9]*'
   ```
5. Optionally run the harness against the live URL.

## Google Sheet for RSVPs (paused)

Decided: do it in Hemang's **personal Gmail** (his work Google account may not allow public Apps Script web apps, and guest data shouldn't live there). Steps are in docs/rsvp-google-sheet.md; once he has the `/exec` URL, set `RSVP_ENDPOINT` in app.js, bump `?v`, test, push. A sheet created earlier in the work Drive was moved to trash.
