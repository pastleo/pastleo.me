import classnames from 'classnames';

import Background from '../components/Background.js';
import IndexNavbar from '../components/IndexNavbar.js';

import styles from '../styles/layouts/layout.scss';

const HomeLayout = ({ children }) => (
  <div className={classnames(styles.layout, styles.withContainer)}>
    <Background />
    <IndexNavbar />
    <div className={styles.container}>
      { children }
    </div>
  </div>
);

export { styles };

export default HomeLayout;
