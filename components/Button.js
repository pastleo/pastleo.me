import classnames from 'classnames';

import styles from '../styles/components/button.module.scss';

const Button = ({ className, onClick, children }) => (
  <span
    className={classnames(styles.button, className || 'inline-block')}
    onClick={onClick}
  >
    { children }
  </span>
);

export default Button;
