import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

import Button from '../Button.js';

import styles from '../../styles/components/about/contacts.module.scss';

const Contacts = ({ className, block }) => (
  <div className={classnames(styles.contacts, 'text-center', className)}>
    <a title='email' href='mailto:chgu82837@gmail.com' target='_blank' rel='noopener noreferrer'>
      <Button className={classnames(styles.contactBtn, { [styles.block]: block })}>
        <FontAwesomeIcon icon={faEnvelope} size='lg' />
        <span className='hidden sm:inline-block print:hidden'>chgu82837[at]gmail.com</span>
        <span className='hidden print:inline'>chgu82837@gmail.com</span>
      </Button>
    </a>
    <a title='website' href='https://pastleo.me/' target='_blank' rel='noopener noreferrer'>
      <Button className={classnames(styles.contactBtn, 'hidden print:inline', { [styles.block]: block })}>
        <FontAwesomeIcon icon={faHome} size='lg' />
        <span className=''>https://pastleo.me</span>
      </Button>
    </a>
    <a title='github' href='https://github.com/pastleo' target='_blank' rel='noopener noreferrer'>
      <Button className={classnames(styles.contactBtn, { [styles.block]: block })}>
        <FontAwesomeIcon icon={faGithub} size='lg' />
        <span className='hidden sm:inline-block print:hidden'>Github</span>
        <span className='hidden print:inline'>https://github.com/pastleo</span>
      </Button>
    </a>
    <a title='linkedin' href='https://www.linkedin.com/in/pastleo/' target='_blank' rel='noopener noreferrer'>
      <Button className={classnames(styles.contactBtn, { [styles.block]: block })}>
        <FontAwesomeIcon icon={faLinkedinIn} size='lg' />
        <span className='hidden sm:inline-block print:hidden'>LinkedIn</span>
        <span className='hidden print:inline'>https://www.linkedin.com/in/pastleo/</span>
      </Button>
    </a>
    <a title='twitter' href='https://twitter.com/PastLeo' target='_blank' rel='noopener noreferrer'>
      <Button className={classnames(styles.contactBtn, { [styles.block]: block })}>
        <FontAwesomeIcon icon={faTwitter} size='lg' />
        <span className='hidden sm:inline-block print:hidden'>Twitter</span>
        <span className='hidden print:inline'>https://twitter.com/PastLeo</span>
      </Button>
    </a>
    <a title='facebook' href='https://fb.me/pastleo' target='_blank' rel='noopener noreferrer'>
      <Button className={classnames(styles.contactBtn, { [styles.block]: block })}>
        <FontAwesomeIcon icon={faFacebook} size='lg' />
        <span className='hidden sm:inline-block print:hidden'>Facebook</span>
        <span className='hidden print:inline'>https://fb.me/pastleo</span>
      </Button>
    </a>
  </div>
);

export default Contacts;
