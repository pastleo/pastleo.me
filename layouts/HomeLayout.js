import IndexNavbar from '../components/IndexNavbar.js';

import styles from '../styles/layouts/layout.module.scss';

const HomeLayout = ({ children }) => (
  <div className={styles.layout}>
    <IndexNavbar />
    <div className={styles.container}>
      { children }
    </div>
  </div>
);

export { styles };

export default HomeLayout;
