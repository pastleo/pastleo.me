import classnames from 'classnames';

import styles from '../styles/layouts/layout.scss';

const EmptyLayout = ({ children }) => (
  <div className={classnames(styles.layout, styles.bgFull)}>
    { children }
  </div>
);

export { styles };

export default EmptyLayout;
