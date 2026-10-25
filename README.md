# pastleo.me

Static website built with Astro, TypeScript, and Markdown.

## Setup

Use Node.js **24.22.0**, pinned in `.tool-versions`:

```sh
asdf install
npm ci
npm run dev
```

With another runtime manager, select the same Node version before running npm.
The development server runs at `http://localhost:4321`.

## npm scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run check` | Run Astro and TypeScript diagnostics |
| `npm run test:resume` | Test resume data references and ID validation |
| `npm run build` | Generate the static website in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro -- --help` | Show Astro CLI help |

## Project structure

```text
public/                 Static images, icons, and other assets
src/components/         Shared UI and page templates
src/content/posts/      Markdown articles (<slug>.zh_TW.md)
src/content.config.ts   Article collection schema and slug generation
src/data/               Profile, contact, resume, and image-mapping data
src/i18n/               Locale definitions, route registry, and UI translations
src/layouts/            Shared HTML layout and metadata
src/lib/                Article sorting and pagination helpers
src/pages/              Static routes and compatibility pages
src/plugins/            Markdown rendering extensions
src/styles/             Global and article styles
tests/                  Resume data regression tests
astro.config.mjs        Astro, Markdown, and site configuration
.tool-versions          Node.js version
```

## Technical setup

Optional machine-specific Astro overrides go in `astro.config.local.json`
(git-ignored). Copy `astro.config.local.example.json` as a starting point, for
example to allow a development hostname. The file is merged into the shared
Astro configuration and is not required for installation or builds.

- Astro generates static output for `https://pastleo.me`; deploy the contents of
  `dist/`. `package-lock.json` pins dependencies for reproducible `npm ci` installs.
- Traditional Chinese uses `/`, English `/en/`, and Japanese `/ja/`. Translated
  routes are registered in `src/i18n/config.ts`. The root homepage detects browser
  language, with manual language choices stored in `localStorage`.
- Resume pages share typed data in `src/data/resume.ts` and print styles in
  `src/components/ResumePage.astro`. Preserve entry IDs when editing or reordering
  data; cross-locale references use checked ID lookups.
- Articles use `src/content/posts/<slug>.zh_TW.md` with required `title` and
  `createdAt` frontmatter (`YYYY/MM/DD` or `YYYY-MM-DD`), plus optional
  `description` and `thumbnail`. They generate `/post/<slug>/` and the paginated
  `/blog/` archive.
- Markdown supports GFM, Shiki syntax highlighting, heading links, and standalone
  YouTube embeds. `src/data/blog-assets.json` maps article image URLs to local
  assets; builds do not download images.
- Icons are build-time inline SVGs from
  [Font Awesome Free](https://fontawesome.com/license/free).
- RSS is generated at `/feed.xml`; `/sitemap.xml` aliases the generated sitemap
  index, and `/robots.txt` advertises it. Compatibility pages and the custom 404
  are excluded from the sitemap. Social previews use article thumbnails or the
  default `public/og-image.jpg`.

## Deployment

The site deploys to GitHub Pages at **https://pastleo.me** through
`.github/workflows/deploy.yml`.

- Pull requests run `npm ci`, `npm run check`, `npm run test:resume`, and
  `npm run build`.
- Pushes to `main` run the same checks, upload `dist/` as a Pages artifact, and
  deploy it using the `github-pages` environment. Failed checks prevent deployment.
- **Actions → Check, build, and deploy Astro → Run workflow** can manually deploy
  `main`. Manual runs on other branches only check and build.
- Node.js is selected from `.tool-versions`; npm dependencies use the lockfile.
  Deployment uses GitHub's built-in token and OIDC, with no personal token or
  deployment secret required.

Before the first deployment, in the GitHub repository settings:

1. Under **Pages → Build and deployment**, select **GitHub Actions** as the source.
2. Set or confirm the custom domain **pastleo.me**. Keep its DNS records pointing
   to GitHub Pages, and enable **Enforce HTTPS** when domain verification and the
   certificate are ready. `public/CNAME` is copied into `dist/`, but the custom
   domain must also be configured in Pages settings.
3. If the `github-pages` environment has deployment branch restrictions, allow
   `main`. Any required reviewers must approve deployments before they proceed.

Publishing this workflow to `main` triggers deployment and replaces the currently
served Pages site. After deployment, verify the homepages, `/resume/`, `/blog/`,
an existing `/post/<slug>/` URL, `/feed.xml`, `/sitemap.xml`, and a missing URL's
404 page on the public domain.
