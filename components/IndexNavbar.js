import Link from 'next/link';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

import Logo from '../components/Logo.js';
import Button from '../components/Button.js';

import styles from '../styles/components/index-navbar.module.scss';
import backgroundClassName from '../styles/components/background.js';

const Navbar = () => (
  <nav className={backgroundClassName}>
    <div className={classnames(styles.indexNavbar, 'py-6')}>
      <div className='py-4 max-w-2xl mx-auto flex'>
        <Logo className='w-32 pl-8' />
        <div className='flex-1 pl-4 pr-4 screen:text-center flex flex-col justify-center'>
          <h1 className='text-4xl font-bold'>PastLeo</h1>
          <div className='pt-1 sm:pt-3'>
            <a title='github' href='https://github.com/pastleo' target='_blank' rel='noopener noreferrer'>
              <Button>
                <FontAwesomeIcon icon={faGithub} size='lg' />
              </Button>
            </a>
            <a title='twitter' href='https://twitter.com/PastLeo' target='_blank' rel='noopener noreferrer'>
              <Button>
                <FontAwesomeIcon icon={faTwitter} size='lg' />
              </Button>
            </a>
            <Link href='/about'>
              <a title='about'>
                <Button>
                  <FontAwesomeIcon icon={faAddressCard} size='lg' />
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
