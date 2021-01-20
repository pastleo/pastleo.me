import classnames from 'classnames';

import styles from '../styles/layouts/background.module.scss';
import backgroundClassName from '../styles/components/background.js';

const BackgroundLayout = ({ children }) => (
  <div className={classnames(styles.layout, backgroundClassName, 'bg-fixed bg-right-top')}>
    { children }
  </div>
);

export default BackgroundLayout;
