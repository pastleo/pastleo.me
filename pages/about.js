import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';

import withLayout from '../layouts/index.js';
import BackgroundLayout from '../layouts/BackgroundLayout.js';

import Back from '../components/Back.js';
import Logo from '../components/Logo.js';
import LocaleSwitch from '../components/about/LocaleSwitch.js';
import Contacts from '../components/about/Contacts.js';
import Button from '../components/Button.js';

import ResumeDetail from '../components/about/ResumeDetail.js';

import styles from '../styles/pages/about.module.scss';
import {
  resumeMode as resumeModeClassName,
  resumeModeBlock, normalModeMinHScreen, resumeModeHidden,
} from '../styles/resume.module.scss';

import taiwanSvg from '../assets/taiwan.svg';

import { i18n, locales, defaultLocale } from '../lib/i18n.js';

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

  return (
    <div className={classnames('flex flex-col', normalModeMinHScreen)}>
      <section id={styles.intro} className='p-6'>
        <div id={styles.controls} className='print:hidden flex justify-between p-2'>
          <Back className='p-3' />
          <div className='p-3 text-right'>
            <LocaleSwitch locales={locales} locale={locale} setLocale={setLocale} />
          </div>
        </div>
        <h1 className={classnames('text-center font-bold text-2xl pt-4', resumeModeHidden)}>{ i18n.name[locale] }</h1>
        <div className='max-w-2xl mx-auto py-5 xs:flex justify-center'>
          <Logo width='216' className={classnames('mx-4', resumeModeHidden)} />
          <div className={classnames('flex-1 pt-4 px-4', resumeModeBlock)}>
            <h1 className='font-bold text-4xl pb-1'>{ i18n.nameFormal[locale] }</h1>
            <h2 className='font-bold text-xl pb-1'>{ i18n.name[locale] }</h2>
          </div>
          <div className={classnames('pt-4 px-4 text-right', resumeModeBlock)}>
            <h3 className='mb-2'>
              <span className=''>{ i18n.location[locale] }</span>
              <img alt='taiwan' className={classnames(styles.taiwan, styles.icon, 'inline-block')} src={taiwanSvg} />
            </h3>
            <h3 className='mb-2'>
              <span className=''>{ i18n.jobTitle[locale] }</span>
              <FontAwesomeIcon icon={faLaptopCode} size='1x' className='mx-2' />
            </h3>
          </div>
        </div>
        <div className={classnames('max-w-2xl mx-auto', resumeModeBlock)}>
          <div className='xs:grid grid-cols-5'>
            <div className='col-span-2 pl-4 p-2'>
              { i18n.quotes[locale].map(line => (
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
              <h3>{ i18n.location[locale] }</h3>
            </a>
          </div>
          <div className='flex-1'>
            <div className='py-2'>
              <FontAwesomeIcon icon={faLaptopCode} size='2x' />
            </div>
            <h3>{ i18n.jobTitle[locale] }</h3>
          </div>
        </div>
      </section>
      <section className={classnames('p-6 flex-1', resumeModeHidden)}>
        <div className='max-w-lg mx-auto'>
          <div className={classnames(styles.contentBox, 'p-4')}>
            <h3 className='text-xl'>{ i18n.briefCvTitle[locale] }</h3>
            <div className='p-2 overflow-x-auto'>
              <ul className='md:text-right whitespace-nowrap'>
                { i18n.briefCv[locale].map(line => (
                  <li key={line}>{ line }</li>
                )) }
              </ul>
            </div>
            <h3 className='text-xl'>{ i18n.briefSkillTitle[locale] }</h3>
            <div className='p-2 overflow-x-auto'>
              <ul className='md:text-right whitespace-nowrap'>
                { i18n.briefSkill[locale].map(line => (
                  <li key={line}>{ line }</li>
                )) }
              </ul>
            </div>

            <Button
              className='my-4 block text-center'
              onClick={() => {
                router.push('?resume');
              }}
            >
              { i18n.showFullResume[locale] }
            </Button>
          </div>
        </div>
      </section>
      <section className={classnames('p-4', resumeModeHidden)}>
        <Contacts className='max-w-md mx-auto p-4' />
        <div className='text-center'>
          <Back className='p-2'>
            { i18n.back[locale] }
          </Back>
        </div>
      </section>

      <ResumeDetail locale={locale} />
    </div>
  );
};

export default withLayout({
  Layout: BackgroundLayout,
  title: 'PastLeo | About',
})(About);
