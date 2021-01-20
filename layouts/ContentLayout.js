import classnames from 'classnames';

import Navbar from '../components/Navbar.js';

import styles from '../styles/layouts/layout.module.scss';

const ContentLayout = ({ children }) => (
  <div className={styles.layout}>
    <Navbar />
    <div className={styles.container}>
      { children }
    </div>
  </div>
);

export default ContentLayout;
