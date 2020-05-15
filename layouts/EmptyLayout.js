import classnames from 'classnames';

import Background from '../components/Background.js';
import styles from '../styles/layouts/layout.scss';

const EmptyLayout = ({ children }) => (
  <div className={styles.layout}>
    <Background />
    { children }
  </div>
);

export { styles };

export default EmptyLayout;
