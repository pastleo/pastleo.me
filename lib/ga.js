import { useEffect } from 'react';

const hasWindowVar = (typeof window) !== 'undefined';
const hasDocumentVar = (typeof document) !== 'undefined';

if (hasWindowVar) {
  window.dataLayer = window.dataLayer || [];
}

function gtag() {
  if (hasWindowVar) {
    window.dataLayer.push(arguments);
  }
}

let gaInitialized = false;

const useGA = id => {
  useEffect(() => {
    if (!(hasWindowVar && hasDocumentVar) || gaInitialized) { return; }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.body.appendChild(script);

    gtag('js', new Date());
    gtag('config', id);

    gaInitialized = true;
  }, []);
};

export { gtag, useGA };
