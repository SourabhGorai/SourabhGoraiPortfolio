# Sourabh Gorai — Portfolio

React + Vite single-page portfolio.

## Run it
```bash
npm install
npm run dev      # development at http://localhost:5173
npm run build    # production build in /dist
npm run preview  # preview the production build
```

## Edit it
- All text, links and project details are in `src/data/portfolio.js`.
- Replace every `#` link (GitHub repos, LinkedIn, resume, write-up) with real URLs.
- Put your resume PDF and photo in `public/` and set `resume` and `photo` in `profile`.
- Colours and layout are in `src/index.css` (see the variables at the top).

## Deploy to GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.
After pushing to `main`:

1. In GitHub, open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push changes to `main`, or run **Deploy portfolio to GitHub Pages** manually from the Actions tab.

The site will be available at:
`https://sourabhgorai.github.io/SourabhGoraiPortfolio/`

The Vite `base` path is configured for this repository's project-site URL. If the
repository is renamed, update `base` in `vite.config.js` and the URL above.
