import { useState } from 'react';
import classnames from 'classnames';

import styles from '../styles/components/logo.scss';

import avatarImgSrc from '../assets/avatar.png';
import meImgSrc from '../assets/me.png';

const Logo = ({ className }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      className={classnames(
        styles.logo,
        className,
        { [styles.revealed]: revealed }
      )}
      onClick={() => setRevealed(r => !r)}
    >
      <img alt='avatar' className='print:hidden max-w-full max-h-full mx-auto' src={avatarImgSrc} />
      <img className='hidden print:block max-w-full max-h-full mx-auto' src={meImgSrc} />
    </div>
  );
};

export default Logo;
