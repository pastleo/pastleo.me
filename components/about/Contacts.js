import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn, faFacebook } from '@fortawesome/free-brands-svg-icons';

import Button from '../Button.js';

import styles from '../../styles/components/about/contacts.module.scss';

const EMAIL = 'chgu82837@gmail.com';
const WEBSITE = 'https://pastleo.me';
const GITHUB = 'https://github.com/pastleo';
const LINKEDIN = 'https://www.linkedin.com/in/pastleo';
const FACEBOOK = 'https://fb.me/pastleo';

const Contacts = ({ className, resume }) => (
  <div className={classnames(styles.contacts, 'text-center', className)}>
    <ContactButton
      title='email' href={`mailto:${EMAIL}`} hrefUrl={EMAIL}
      icon={faEnvelope} resume={resume}
    >
      chgu82837[at]gmail.com
    </ContactButton>

    { resume && (
      <ContactButton title='website' href={WEBSITE} icon={faHome} resume={resume} />
    ) }

    <ContactButton title='github' href={GITHUB} icon={faGithub} resume={resume}>
      Github
    </ContactButton>

    <ContactButton title='linkedin' href={LINKEDIN} icon={faLinkedinIn} resume={resume}>
      LinkedIn
    </ContactButton>

    <ContactButton title='facebook' href={FACEBOOK} icon={faFacebook} resume={resume}>
      Facebook
    </ContactButton>
  </div>
);

export default Contacts;

const ContactButton = ({ title, href, hrefUrl, icon, resume, children }) => (
  <a title={title} href={href} target='_blank' rel='noopener noreferrer'>
    <Button className={classnames(styles.contactBtn, { [styles.resume]: resume })}>
      { resume ? (
        <>
          <span className='inline-block align-middle max-w-3/5-screen text-ellipsis overflow-hidden text-sm underline'>{ hrefUrl || href }</span>
          <FontAwesomeIcon icon={icon} size='sm' />
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={icon} size='lg' />
          <span className='hidden sm:inline-block'>
            { children }
          </span>
        </>
      ) }
    </Button>
  </a>
);
