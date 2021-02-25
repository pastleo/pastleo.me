import classnames from 'classnames';

import Img from 'react-optimized-image';

import bgSrc from '../assets/bg.jpg';

const Background = ({ className }) => (
  <Img
    alt='background'
    src={bgSrc} webp
    className={
      classnames(
        'bg-background-avg print:hidden top-0 left-0 h-full w-full object-cover -z-1',
        className,
      )
    }
  />
);

export default Background;
