import classnames from 'classnames';
import styles from './background.module.css';
import webpSupported from '../../lib/webpSupported';

const backgroundClassName = classnames(
  styles.background,
  webpSupported ? styles.webp : styles.noWebp,
);

export default backgroundClassName;
