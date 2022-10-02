import Image from 'next/future/image';
import classnames from 'classnames';

import styles from '../styles/components/logo.module.scss';

import avatarJpg from '../assets/logo/avatar.jpg';
import hackerJpg from '../assets/logo/avatar-hacker.jpg';

const NormalLogoImg = props => (
  <Image
    placeholder='blur'
    src={avatarJpg}
    alt='avatar, logo'
    className={classnames(styles.normal, 'rounded-full')}
    {...props}
  />
);
const HackerLogoImg = props => (
  <Image
    placeholder='blur'
    src={hackerJpg}
    alt='avatar, hacker'
    className={classnames(styles.hacker, 'rounded-full')}
    {...props}
  />
);

const Logo = ({ className, width }) => {
  const widthProps = { width, height: width };

  return (
    <div className={classnames(styles.logo, className)}>
      <NormalLogoImg {...widthProps} />
      <HackerLogoImg {...widthProps} />
    </div>
  );
};

export default Logo;
