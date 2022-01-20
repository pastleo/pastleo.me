import Background from '../components/Background.js';

import styles from '../styles/layouts/background.module.scss';

const BackgroundLayout = ({ children }) => (
  <>
    <Background className='fixed h-screen object-right-top' />
    <div className={styles.layout}>
      { children }
    </div>
  </>
);

export default BackgroundLayout;
