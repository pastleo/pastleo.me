import { useState } from 'react';
import classnames from 'classnames';

import styles from '../styles/components/logo.module.scss';

import avatarJpg from '../assets/logo/avatar.jpg';
import hackerJpg from '../assets/logo/avatar-hacker.jpg';
import speakerJpg from '../assets/logo/speaker.jpg';

const NormalLogoImg = props => (
  <img
    src={avatarJpg}
    alt='avatar, logo'
    className={classnames(styles.normal, 'rounded-full')}
    {...props}
  />
);
const HackerLogoImg = props => (
  <img
    src={hackerJpg}
    alt='avatar, hacker'
    className={classnames(styles.hacker, 'rounded-full')}
    {...props}
  />
);
const SpeakerLogoImg = props => (
  <img
    src={speakerJpg}
    alt='avatar, speaker'
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
      <NormalLogoImg {...widthProps} />
      <HackerLogoImg {...widthProps} />
      <SpeakerLogoImg {...widthProps} />
    </div>
  );
};

export default Logo;
