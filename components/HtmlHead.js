import Head from 'next/head';
import Script from 'next/script'

import ogImageJpg from '../assets/og-image.jpg';

const GA_ID = 'G-YTX00MDT79';
const GA_GTAG_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
const GA_GTAG_SCRIPT = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GA_ID}');
`;

const DEFAULT_TITLE = 'PastLeo';
const DEFAULT_DESCRIPTION = 'Blog, Introduction and Homepage of PastLeo';

const HtmlHead = ({ options }) => <>
  <Script strategy='beforeInteractive' src={GA_GTAG_SRC} />
  <Script strategy='beforeInteractive'>{ GA_GTAG_SCRIPT }</Script>
  <Head>
    <title key='title'>{ options.title || DEFAULT_TITLE }</title>
    <meta key='description' name='Description' content={options.description || DEFAULT_DESCRIPTION} />
    <link key='favicon' rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <link key='manifest' rel='manifest' href='/manifest.json' />

    <meta key='viewport' name='viewport' content='width=device-width, initial-scale=1' />
    <link key='alternate-rss' rel='alternate' type='application/rss+xml' href='/feed.xml' />

    <meta key='og:title' property='og:title' content={options.title || DEFAULT_TITLE} />
    <meta key='og:description' name='og:description' content={options.description || DEFAULT_DESCRIPTION} />
    <meta key='og:image' name='og:image' content={options.thumbnail || ogImageJpg.src} />

    <link key='apple-touch-icon' rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />

    <meta key='twitter:title' name='twitter:title' content={options.title || DEFAULT_TITLE} />
    <meta key='twitter:description' name='twitter:description' content={options.description || DEFAULT_DESCRIPTION} />
    <meta key='twitter:image' name='twitter:image' content={options.thumbnail || ogImageJpg.src} />
    <meta key='twitter:card' name='twitter:card' content='summary_large_image' />
    <meta key='twitter:creator' name='twitter:creator' content='@PastLeo' />
  </Head>
</>;

export default HtmlHead;
