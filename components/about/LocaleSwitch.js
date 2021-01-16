import React from 'react';
import classnames from 'classnames';

import styles from '../../styles/components/about/locale-switch.module.scss';

const LocaleSwitch = ({ locales, locale, setLocale }) => (
  <span className={styles.localeSwitch}>
    { locales.map(({ localeName, displayName }, index) => (
      <React.Fragment key={localeName}>
        <a
          className={classnames({ [styles.active]: locale === localeName })}
          onClick={() => setLocale(localeName)}
        >
          { displayName }
        </a>
        { index < locales.length - 1 && ' / ' }
      </React.Fragment>
    )) }
  </span>
);

export default LocaleSwitch;
