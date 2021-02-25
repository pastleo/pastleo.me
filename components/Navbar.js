import Link from 'next/link';
import classnames from 'classnames';

import Img from 'react-optimized-image';

import Background from '../components/Background.js';

import styles from '../styles/components/navbar.module.scss';

import avatarSrc from '../assets/logo/avatar.jpg';

const Navbar = () => (
  <nav className={classnames(styles.navbar, 'relative h-16 p-1 flex justify-center items-center')}>
    <Background className='absolute object-left-top' />
    <Link href='/'>
      <a className='flex justify-center items-center p-1'>
        <Img
          alt='logo'
          src={avatarSrc} webp
          className={classnames(styles.logo, 'rounded-full w-8 md:w-10')}
        />
        <h1 className='hidden md:block md:mx-3 md:text-xl font-bold'>PastLeo</h1>
      </a>
    </Link>
  </nav>
);

export default Navbar;
