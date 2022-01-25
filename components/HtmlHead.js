import Head from 'next/head';

import ogImageSrc from '../assets/og-image.jpg';

const GA_ID = 'G-YTX00MDT79';
const GA_GTAG_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
const GA_GTAG_SCRIPT = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GA_ID}');
`;

const HtmlHead = ({ options }) => (
  <Head>
    <script async src={GA_GTAG_SRC} />
    <script dangerouslySetInnerHTML={{ __html: GA_GTAG_SCRIPT }} />

    <title key='title'>{ options.title || 'PastLeo' }</title>
    <meta key='description' name='Description' content='Blog, Introduction and Homepage of PastLeo' />
    <link key='favicon' rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <link key='apple-touch-icon' rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
    <meta key='viewport' name='viewport' content='width=device-width, initial-scale=1' />
    <meta key='og:image' name='og:image' content={options.thumbnail || ogImageSrc} />
    <link key='manifest' rel='manifest' href='/manifest.json' />

    <link rel='alternate' type='application/rss+xml' href='/feed.xml' />
  </Head>
);

export default HtmlHead;
