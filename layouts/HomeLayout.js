import classnames from 'classnames';

import IndexNavbar from '../components/IndexNavbar.js';

import styles from '../styles/layouts/layout.scss';

const HomeLayout = ({ children }) => (
  <div className={classnames(styles.layout, styles.withContainer)}>
    <IndexNavbar />
    <div className={styles.container}>
      { children }
    </div>
  </div>
);

export { styles };

export default HomeLayout;
