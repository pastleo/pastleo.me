import classnames from 'classnames';

import styles from '../styles/components/button.scss';

const Button = ({ className, children }) => (
  <span className={classnames(styles.button, 'inline-block', className)}>
    { children }
  </span>
);

export default Button;
