import Link from 'next/link';
import classnames from 'classnames';

import styles from '../styles/components/navbar.module.scss';
import backgroundClassName from '../styles/components/background.js';

import avatarWebpSrc from '../assets/logo/avatar-hacker.jpg?webp';
import avatarJpgSrc from '../assets/logo/avatar-hacker.jpg';

const Navbar = () => (
  <nav className={backgroundClassName}>
    <div className={classnames(styles.navbar, 'h-16 p-1 flex justify-center items-center')}>
      <Link href='/'>
        <a className='flex justify-center items-center p-1'>
          <picture>
            <source srcSet={avatarWebpSrc} type='image/webp' />
            <source srcSet={avatarJpgSrc} type='image/jpeg' />
            <img
              alt='logo'
              src={avatarJpgSrc}
              className={classnames(styles.logo, 'rounded-full w-8 md:w-10')}
            />
          </picture>
          <h1 className='hidden md:block md:mx-3 md:text-xl font-bold'>PastLeo</h1>
        </a>
      </Link>
    </div>
  </nav>
);

export default Navbar;
