import classnames from 'classnames';

import styles from '../styles/components/background.scss';

import bgWebpSrc from '../assets/bg.jpg?webp';
import bgJpgSrc from '../assets/bg.jpg';

const Background = () => (
  <picture>
    <source srcSet={bgWebpSrc} type='image/webp' />
    <source srcSet={bgJpgSrc} type='image/jpeg' />
    <img
      alt='background'
      src={bgJpgSrc}
      className={
        classnames(
          styles.background,
          'w-screen h-screen fixed print:hidden object-cover object-right-top',
        )
      }
    />
  </picture>
);

export default Background;
