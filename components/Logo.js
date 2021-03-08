import { useState } from 'react';
import classnames from 'classnames';

import Img from 'react-optimized-image';

import styles from '../styles/components/logo.module.scss';

import avatarSrc from '../assets/logo/avatar.jpg';
import hackerSrc from '../assets/logo/avatar-hacker.jpg';
import speakerSrc from '../assets/logo/speaker.jpg';

const NormalLogoImg = props => (
  <Img
    src={avatarSrc} webp
    alt='avatar, logo'
    className={classnames(styles.normal, 'rounded-full')}
    {...props}
  />
);
const HackerLogoImg = props => (
  <Img
    src={hackerSrc} webp
    alt=''
    className={classnames(styles.hacker, 'rounded-full')}
    {...props}
  />
);
const SpeakerLogoImg = props => (
  <Img
    src={speakerSrc} webp
    alt=''
    className={classnames(styles.speaker, 'rounded-full')}
    {...props}
  />
);

const Logo = ({ className, width, forcedRvealed }) => {
  const [revealed, setRevealed] = useState(false);
  const widthProps = { width, height: width };

  return (
    <div
      className={
        classnames(
          styles.logo, className,
          { [styles.revealed]: revealed || forcedRvealed },
        )
      }
      onClick={() => setRevealed(r => !r)}
    >
      <NormalLogoImg alt='logo' {...widthProps} />
      <HackerLogoImg {...widthProps} />
      <SpeakerLogoImg {...widthProps} />
    </div>
  );
};

export default Logo;
