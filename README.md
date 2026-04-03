# Solitär Grimoire

Custom Astro blog. Static, no theme dependencies.

## Setup

```bash
npm install
npm run dev        # localhost:4321
npm run build      # builds to ./dist
```

## Writing a new post

1. Create a folder under `src/content/posts/your-post-name/`
2. Add `index.md` inside it
3. Use this frontmatter at the top:

```markdown
---
title: Your Post Title
published: 2026-01-01
description: "One line subtitle shown on the index"
image: "./cover.png"        # optional — remove line if no cover
tags: ["C++", "Win32"]
category: Malware
draft: false
---

Your content here in normal markdown.
```

The folder name becomes the URL: `/posts/your-post-name`

## Migrating existing posts from Fuwari

Copy each post folder from your old repo's `src/content/posts/` into this
repo's `src/content/posts/`. The frontmatter format is identical — nothing
needs to change in the `.md` files themselves.

## Profile picture

Replace `public/pfp.webp` with your actual profile picture.
Keep the filename `pfp.webp` or update the `src` in `src/pages/index.astro`
and `src/pages/about.astro`.

## About page

Edit `src/pages/about.astro`:
- Replace `Your Name` with your real name
- Update the LinkedIn / Twitter / GitHub hrefs
- Rewrite the prose section to describe yourself

## Adding a new category

Categories come from the `category:` field in your post frontmatter.
Any new category value automatically appears in the sidebar — no config needed.
The sidebar shows it without a colour highlight until you add it to the
`schoolClass()` maps in `index.astro` and `[slug].astro`.

To add a highlight colour for a new category, open `src/pages/index.astro`
and find the `schoolClass` function. Add your category there, then add
a matching CSS rule in `src/styles/global.css`.

## Deployment

Push to `main`. The GitHub Actions workflow in `.github/workflows/deploy.yml`
builds and deploys automatically to GitHub Pages.

Make sure GitHub Pages is configured to deploy from **GitHub Actions**
(not from a branch) in your repo Settings → Pages.
