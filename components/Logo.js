import { useState } from 'react';
import classnames from 'classnames';

import styles from '../styles/components/logo.module.scss';

import hackerWebpSrc from '../assets/logo/avatar-hacker.jpg?webp';
import hackerJpgSrc from '../assets/logo/avatar-hacker.jpg';
import avatarWebpSrc from '../assets/logo/avatar.jpg?webp';
import avatarJpgSrc from '../assets/logo/avatar.jpg';
import speakerWebpSrc from '../assets/logo/speaker.jpg?webp';
import speakerJpgSrc from '../assets/logo/speaker.jpg';

const srcSets = {
  normal: {
    webp: hackerWebpSrc,
    jpg: hackerJpgSrc,
  },
  hover: {
    webp: avatarWebpSrc,
    jpg: avatarJpgSrc,
  },
  revealed: {
    webp: speakerWebpSrc,
    jpg: speakerJpgSrc,
  },
};

const Logo = ({ className, forcerRvealed }) => {
  const [revealed, setRevealed] = useState(false);
  const [hover, setHover] = useState(false);

  const srcSetKey = (forcerRvealed || revealed) ? 'revealed' : (hover ? 'hover' : 'normal');

  return (
    <div
      className={classnames(styles.logo, className)}
      onClick={() => setRevealed(r => !r)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <picture>
        <source srcSet={srcSets[srcSetKey].webp} type='image/webp' />
        <source srcSet={srcSets[srcSetKey].jpg} type='image/jpeg' />
        <img
          alt='logo'
          src={srcSets[srcSetKey].jpg}
          className={classnames(styles.img, 'max-w-full max-h-full rounded-full border')}
        />
      </picture>
    </div>
  );
};

export default Logo;
