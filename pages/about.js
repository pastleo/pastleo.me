import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';

import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';

import withLayout from '../layouts/index.js';
import BackgroundLayout from '../layouts/BackgroundLayout.js';

import Back from '../components/Back.js';
import Logo from '../components/Logo.js';
import LocaleSwitch from '../components/about/LocaleSwitch.js';
import Contacts from '../components/about/Contacts.js';
import CodeTyper from '../components/about/CodeTyper.js';
import Button from '../components/Button.js';

import ResumeContent from '../components/about/ResumeContent.js';

import styles from '../styles/pages/about.module.scss';
import {
  resumeMode as resumeModeClassName,
  resumeModeBlock, normalModeMinHScreen, resumeModeHidden,
} from '../styles/resume.module.scss';

import taiwanSvg from '../assets/taiwan.svg';

import { locales, defaultLocale } from '../lib/i18n/i18n';
import t from '../lib/i18n/translations';

const About = () => {
  const router = useRouter();
  const queryResume = typeof router.query.resume !== 'undefined';

  const [locale, setLocale] = useState(defaultLocale);
  const [resumeMode, setResumeMode] = useState(false);

  useEffect(() => {
    if (resumeMode) {
      document.body.classList.add(resumeModeClassName);
    } else {
      document.body.classList.remove(resumeModeClassName);
    }
  }, [resumeMode]);

  useEffect(() => {
    setResumeMode(queryResume);
  }, [queryResume]);

  const codeTyperLines = useMemo(() => [
    ...t.quotes[locale],
    '',
    t.briefCvTitle[locale],
    ...t.briefCv[locale],
  ], [locale]);

  return (
    <div className={classnames('flex flex-col', normalModeMinHScreen)}>
      <section id={styles.intro} className='p-6'>
        <div id={styles.controls} className='print:hidden flex justify-between p-2'>
          <Back to={resumeMode ? '/about' : '/'} className='p-3' />
          <div className='p-3 text-right'>
            <LocaleSwitch locales={locales} locale={locale} setLocale={setLocale} />
          </div>
        </div>
        <h1 className={classnames('text-center font-bold text-2xl pt-4', resumeModeHidden)}>{ t.name[locale] }</h1>
        <div className='max-w-2xl mx-auto py-5 xs:flex justify-center'>
          <Logo width='216' className={classnames('mx-4', resumeModeHidden)} />
          <div className={classnames('flex-1 pt-4 px-4', resumeModeBlock)}>
            <h1 className='font-bold text-4xl pb-1'>{ t.nameFormal[locale] }</h1>
            <h2 className='font-bold text-xl pb-1'>{ t.name[locale] }</h2>
          </div>
          <div className={classnames('pt-4 px-4 text-right', resumeModeBlock)}>
            <h3 className='mb-2'>
              <span className=''>{ t.location[locale] }</span>
              <img alt='taiwan' className={classnames(styles.taiwan, styles.icon, 'inline-block')} src={taiwanSvg} />
            </h3>
            <h3 className='mb-2'>
              <span className=''>{ t.jobTitle[locale] }</span>
              <FontAwesomeIcon icon={faLaptopCode} size='1x' className='mx-2' />
            </h3>
          </div>
        </div>
        <div className={classnames('max-w-2xl mx-auto', resumeModeBlock)}>
          <div className='xs:grid grid-cols-5'>
            <div className='col-span-2 pl-4 p-2'>
              { t.quotes[locale].map(line => (
                <p key={line} className='pb-2'>{ line }</p>
              )) }
            </div>
            <div className='col-span-3 p-2 pr-3'>
              <Contacts resume />
            </div>
          </div>
        </div>
        <div className={classnames('max-w-lg mx-auto flex text-center', resumeModeHidden)}>
          <div className='flex-1'>
            <a target='_blank' href='https://en.wikipedia.org/wiki/Taiwan' rel='noopener noreferrer'>
              <img alt='taiwan' className={classnames(styles.taiwan, 'mx-auto')} src={taiwanSvg} />
              <h3>{ t.location[locale] }</h3>
            </a>
          </div>
          <div className='flex-1'>
            <div className='py-2'>
              <FontAwesomeIcon icon={faLaptopCode} size='2x' />
            </div>
            <h3>{ t.jobTitle[locale] }</h3>
          </div>
        </div>
      </section>
      <section className={classnames('p-6 flex-1', resumeModeHidden)}>
        <div className='max-w-lg mx-auto'>
          <div className={classnames(styles.contentBox, 'p-4')}>
            <CodeTyper
              lines={codeTyperLines}
              reveal={resumeMode}
            />

            <Button
              className='my-4 block text-center'
              onClick={() => {
                router.push('?resume');
              }}
            >
              { t.showFullResume[locale] }
            </Button>
          </div>
        </div>
      </section>
      <section className={classnames('p-4', resumeModeHidden)}>
        <Contacts className='max-w-md mx-auto p-4' />
        <div className='text-center'>
          <Back to='/' className='p-2'>
            { t.back[locale] }
          </Back>
        </div>
      </section>

      <ResumeContent locale={locale} />
    </div>
  );
};

export default withLayout({
  Layout: BackgroundLayout,
  title: 'PastLeo | About',
})(About);
