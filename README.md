[PastLeo.me](https://pastleo.me/)
===

PastLeo's blog and intro website built with [Next.js](https://nextjs.org/)

## Development

#### Setup

```
git clone https://github.com/pastleo/pastleo.me.git
cd pastleo.me
npm install
```

#### Start dev server

```
npm run dev
```

And open `http://localhost:3000`

#### Learn more about Next.js

* [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment

This website is designed to be deployed using static-site generator mode of Next.js:

```sh
npm run build
npm run rss
npm run sitemap
npm run export
```

#### Automation by GitHub Actions

Pushes run checks and create the static export through `.github/workflows/main.yml`.
Pushes to `main` deploy the export to GitHub Pages at the custom domain
`pastleo.me`.

In the repository settings, configure Pages to use **GitHub Actions** as its
source. The custom domain's DNS records must point to GitHub Pages; HTTPS can be
enforced after GitHub verifies the domain and DNS records.
