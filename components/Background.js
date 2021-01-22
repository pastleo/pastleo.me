import classnames from 'classnames';

import bgWebpSrc from '../assets/bg.jpg?webp';
import bgJpgSrc from '../assets/bg.jpg';

const Background = ({ className }) => (
  <picture>
    <source srcSet={bgWebpSrc} type='image/webp' />
    <source srcSet={bgJpgSrc} type='image/jpeg' />
    <img
      alt='background'
      src={bgJpgSrc}
      className={
        classnames(
          'bg-background-avg print:hidden top-0 left-0 h-full w-full object-cover -z-1',
          className,
        )
      }
    />
  </picture>
);

export default Background;
