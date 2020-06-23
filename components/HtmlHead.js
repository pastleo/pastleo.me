import Head from 'next/head';

import ogImageSrc from '../assets/og-image.jpg';

const HtmlHead = ({ options }) => (
  <Head>
    <title key='title'>{ options.title || 'PastLeo' }</title>
    <meta key='description' name='Description' content='Blog, Introduction and Homepage of PastLeo' />
    <link key='favicon' rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <meta key='viewport' name='viewport' content='width=device-width, initial-scale=1' />
    <meta key='og:image' name='og:image' content={options.thumbnail || ogImageSrc} />
  </Head>
);

export default HtmlHead;
