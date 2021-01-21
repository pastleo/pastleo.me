import { memo as memoComponent } from 'react';

const EXT_TO_MIME_TYPES = {
  jpeg: 'image/jpeg', jpg: 'image/jpeg', png: 'image/png',
};
const IMGUR_SRC_REGEX = /https:\/\/i.imgur.com\/(\w+h)\.(\w+)/;

/*
 * use huge thumbnail version of imgur to enable webp src, for example:
 * webpage:        https://imgur.com/p8ZNmYr
 * original:       https://i.imgur.com/p8ZNmYr.jpg
 * huge thumbnail: https://i.imgur.com/p8ZNmYrh.jpg
 * webp thumbnail: https://i.imgur.com/p8ZNmYrh.webp
 */

const ExternalImage = memoComponent(({ src, ...props }) => {
  const imgurMatched = src.match(IMGUR_SRC_REGEX);

  if (imgurMatched && EXT_TO_MIME_TYPES[imgurMatched[2]]) {
    return (
      <picture>
        <source srcSet={`https://i.imgur.com/${imgurMatched[1]}.webp`} type='image/webp' />
        <source srcSet={src} type={EXT_TO_MIME_TYPES[imgurMatched[2]]} />
        <img src={src} {...props} />
      </picture>
    );
  }

  return (
    <img src={src} {...props} />
  );
});

export default ExternalImage;
