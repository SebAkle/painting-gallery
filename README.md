# Dad's Painting Gallery

A simple static website showcasing paintings. No build step — just HTML, CSS, and vanilla JS. Deploys to Netlify via GitHub.

## How to Add a Painting

1. Drop the JPEG into `images/paintings/` (resize to ~1024px on the long edge first — big files make the site slow)
2. Open `js/paintings.js` and add one line to the array:
   ```js
   { file: "my-new-painting.jpg", title: "My New Painting" },
   ```
   You can optionally add details that appear in the lightbox:
   ```js
   { file: "obra.jpg", title: "Obra", medium: { es: "Acrílico", en: "Acrylic" }, size: "60 × 80 cm", year: 2023 },
   ```
3. Commit and push to GitHub — Netlify auto-deploys.

## How to Remove a Painting

1. Delete the line from `js/paintings.js`
2. Optionally remove the JPEG from `images/paintings/`
3. Commit and push.

## Local Development

```bash
python3 -m http.server
```

Then open http://localhost:8000 in your browser.

## Deploying to Netlify

1. Push this repo to GitHub
2. Log in to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repo
5. Leave build settings empty (no build command needed)
6. Click "Deploy site"

Every push to `main` will auto-deploy.

## Contact Form (Netlify Forms)

The contact page uses [Netlify Forms](https://docs.netlify.com/manage/forms/setup/) — submissions are handled by Netlify, no backend needed. One-time setup in the Netlify dashboard:

1. Site configuration → Forms → **Enable form detection**, then redeploy the site
2. After the first deploy, go to Forms → the "contact" form → **Form notifications** → add an email notification pointing to Dad's Gmail

Submissions also appear in the Netlify dashboard under Forms (free tier: 100 submissions/month). Spam is filtered by a honeypot field automatically.
