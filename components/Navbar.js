import Link from 'next/link';
import classnames from 'classnames';

import styles from '../styles/components/navbar.scss';

import avatarSrc from '../assets/avatar.png';

const Navbar = () => (
  <nav className={classnames(styles.navbar, 'h-16 p-1 flex justify-center items-center')}>
    <Link href='/'>
      <a className='flex justify-center items-center p-1'>
        <img alt='avatar' className='w-8 md:w-10' src={avatarSrc} />
        <h1 className='hidden md:block md:mx-3 md:text-xl font-bold'>PastLeo</h1>
      </a>
    </Link>
  </nav>
);

export default Navbar;
