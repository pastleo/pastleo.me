import classnames from 'classnames';

import Background from '../components/Background.js';
import Navbar from '../components/Navbar.js';

import styles from '../styles/layouts/layout.scss';

const ContentLayout = ({ children }) => (
  <div className={classnames(styles.layout, styles.withContainer)}>
    <Background />
    <Navbar />
    <div className={styles.container}>
      { children }
    </div>
  </div>
);

export { styles };

export default ContentLayout;
