import Image from 'next/future/image';
import classnames from 'classnames';

import bgJpg from '../assets/bg.jpg';

const Background = ({ className }) => (
  <Image
    placeholder='blur'
    alt='background'
    src={bgJpg}
    className={
      classnames(
        'bg-background-avg print:hidden top-0 left-0 w-full object-cover bg-cover -z-1',
        className,
      )
    }
  />
);

export default Background;
