import Head from 'next/head';

const HtmlHead = ({ options }) => (
  <Head>
    <title key='title'>{ options.title || 'PastLeo' }</title>
    <meta key='description' name='Description' content='Blog, Introduction and Homepage of PastLeo' />
    <link key='favicon' rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <meta key='viewport' name='viewport' content='width=device-width, initial-scale=1' />
  </Head>
);

export default HtmlHead;
