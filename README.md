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
