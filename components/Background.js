import classnames from 'classnames';

import bgJpg from '../assets/bg.jpg';
import bgJpgMd from '../assets/bg.jpg?width=1024';
import bgJpgXs from '../assets/bg.jpg?width=768';
import bgJpgPre from '../assets/bg.jpg?inline&width=256';
import bgWebp from '../assets/bg.jpg?webp';
import bgWebpMd from '../assets/bg.jpg?webp&width=1024';
import bgWebpXs from '../assets/bg.jpg?webp&width=768';

/*
 * after upgrade to next.js 12 and use swc instead of babel
 * <Img /> of next-optimized-images can not be used because it works on top of babel to automatically create multiple size/format variants of a image source and make it responsive by macro-alike transform of source code:
 * https://github.com/cyrilwanner/next-optimized-images/tree/canary#image-components
 *
 * now we are using its url query to achieve responsive image (and as a demo):
 * https://github.com/cyrilwanner/next-optimized-images/tree/canary#query-params
 *
 * for url query image optimization to work, next-optimized-images plugins is still added and `images.disableStaticImages` is set in next.config.js:
 * https://nextjs.org/docs/api-reference/next/image#disable-static-imports
 *
 * other place of this project will simply use a <img /> with one url to keep simple.
 *
 * BTW: why not use next/image: built-in image optimization from next.js?
 * this site is deployed as a static site and does not have many static image (that better be responsive), and next/image optimize/convert images on-the-fly, meaning image is processed when browser downloads images, which requires a image processing service or a running next server.
 * further more, content images in posts are hosted under imgur. (see ./ExternalImage.js)
 */

const Background = ({ className }) => (
  <picture>
    <source type='image/webp' media='(min-width:1280px)' srcSet={bgWebp} />
    <source type='image/webp' media='(min-width:768px)' srcSet={bgWebpMd} />
    <source type='image/webp' media='(min-width:512px)' srcSet={bgWebpXs} />
    <source media='(min-width:1280px)' srcSet={bgJpg} />
    <source media='(min-width:768px)' srcSet={bgJpgMd} />
    <source media='(min-width:512px)' srcSet={bgJpgXs} />
    <img
      style={{ backgroundImage: `url(${bgJpgPre})` }}
      alt='background'
      src={bgJpg}
      className={
        classnames(
          'bg-background-avg print:hidden top-0 left-0 w-full object-cover bg-cover -z-1',
          className,
        )
      }
    />
  </picture>
);

export default Background;
