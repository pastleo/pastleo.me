import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSuitcase, faAward, faCommentDots, faGraduationCap, faBook, faFolderOpen,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

import ExternalImage from '../../components/ExternalImage.js';

import styles from '../../styles/components/about/resume-content.module.scss';
import { resumeModeBlock } from '../../styles/resume.module.scss';

import { i18n } from '../../lib/i18n.js';

import showcasePrintGradientPng from '../../assets/showcase-print-gradient.png';

const ResumeContent = ({ locale }) => (
  <section className={classnames(styles.resumeContent, resumeModeBlock)}>
    <div className='max-w-3xl mx-auto mb-2 pt-12 print:pt-6 pb-1 px-2 break-inside-avoid-page'>
      <div className='w-4/5 print:w-9/10 ml-auto mb-4'>
        <h3 className='text-3xl font-bold ml-n3.5'>
          <FontAwesomeIcon icon={faSuitcase} className='mr-2' />
          { i18n.experienceTitle[locale] }
        </h3>
      </div>
      <div className={classnames(styles.resumeStory, 'w-4/5 print:w-9/10 ml-auto mb-3')}>
        { i18n.experience[locale].map((exp, i) => (
          <React.Fragment key={i}>
            <div className={styles.timeMark}>
              <span>
                { exp.from }
                { exp.to && (
                  <>
                    { ' ~ ' }
                    <br className='inline sm:hidden' />
                    { exp.to }
                  </>
                ) }
              </span>
            </div>

            <article className='mb-4'>
              <h4 className='mb-3'>
                <span className='text-2xl font-bold'>
                  <LinkToIfHref href={exp.href}>
                    { exp.where }
                  </LinkToIfHref>
                </span>
                <span className='ml-2 text-xl font-medium '>
                  { exp.title }
                </span>
              </h4>

              <div className='ml-3'>
                { (exp.details || []).map((detail, i) => (
                  <React.Fragment key={i}>
                    <h5 className='text-xl'>
                      <LinkToIfHref href={detail.href}>
                        { detail.title }
                      </LinkToIfHref>
                    </h5>

                    <div className='ml-3'>
                      { detail.description.map(line => (
                        <p key={line} className='text-sm my-1'>{ line }</p>
                      )) }
                    </div>
                  </React.Fragment>
                )) }
              </div>
            </article>
            <br />
          </React.Fragment>
        )) }
      </div>
    </div>

    <div className='max-w-3xl mx-auto my-2 py-2 px-2 break-inside-avoid-page'>
      <div className='w-4/5 print:w-9/10 ml-auto mb-4'>
        <h3 className='text-3xl font-bold ml-n3.5'>
          <FontAwesomeIcon icon={faAward} className='ml-1 mr-2' />
          { i18n.achievementTitle[locale] }
        </h3>
      </div>

      <div className={classnames(styles.resumeStory, 'w-4/5 print:w-9/10 ml-auto mb-3')}>
        { i18n.achievements[locale].map((ach, i) => (
          <React.Fragment key={i}>
            <div className={styles.timeMark}>
              <span>
                { ach.time }
              </span>
            </div>

            <article className='mb-4'>
              <h4 className='mb-3'>
                <span className='text-2xl font-bold'>
                  <LinkToIfHref href={ach.href}>
                    { ach.what }
                  </LinkToIfHref>
                </span>
                <span className='ml-2 text-xl font-medium '>
                  { ach.title }
                </span>
              </h4>

              <div className='ml-3'>
                { ach.description.map(line => (
                  <p key={line} className='text-sm my-1'>{ line }</p>
                )) }
              </div>
            </article>
            <br />
          </React.Fragment>
        )) }
      </div>
    </div>

    <div className='max-w-3xl mx-auto my-2 py-2 px-2 break-inside-avoid-page'>
      <div className='w-4/5 print:w-9/10 ml-auto mb-4'>
        <h3 className='text-3xl font-bold ml-n3.5'>
          <FontAwesomeIcon icon={faCommentDots} className='mr-2' />
          { i18n.talkTitle[locale] }
        </h3>
      </div>

      <div className={classnames(styles.resumeStory, 'w-4/5 print:w-9/10 ml-auto mb-3')}>
        { i18n.talks[locale].map((talk, i) => (
          <React.Fragment key={i}>
            <div className={styles.timeMark}>
              <span>
                { talk.time }
              </span>
            </div>

            <article>
              <div className='mb-3'>
                <h4 className='text-xl font-bold'>
                  <LinkToIfHref href={talk.href}>
                    { talk.event }
                  </LinkToIfHref>
                </h4>
                <p className='font-medium'>
                  { talk.title }
                </p>
              </div>
            </article>
            <br />
          </React.Fragment>
        )) }
      </div>
    </div>

    <div className='max-w-3xl mx-auto my-2 py-2 px-2 break-inside-avoid-page'>
      <div className='w-4/5 print:w-9/10 ml-auto mb-4'>
        <h3 className='text-3xl font-bold ml-n3.5'>
          <FontAwesomeIcon icon={faGraduationCap} className='mr-2' />
          { i18n.educationTitle[locale] }
        </h3>
      </div>

      <div className={classnames(styles.resumeStory, 'w-4/5 print:w-9/10 ml-auto mb-3')}>
        { i18n.educations[locale].map((edu, i) => (
          <React.Fragment key={i}>
            <div className={styles.timeMark}>
              <span>
                { edu.from }
                { edu.to && (
                  <>
                    { ' ~ ' }
                    <br className='inline sm:hidden' />
                    { edu.to }
                  </>
                ) }
              </span>
            </div>

            <article className='mb-2'>
              <h4 className='mb-3'>
                <span className='text-2xl font-bold'>
                  { edu.school }
                </span>
                <span className='ml-2 text-xl font-medium '>
                  { edu.department }
                </span>
              </h4>

              <div className='ml-3'>
                { (edu.details || []).map(line => (
                  <p key={line} className='text-sm my-1'>{ line }</p>
                )) }
              </div>
            </article>
            <br />
          </React.Fragment>
        )) }
      </div>
    </div>

    <div className='max-w-2xl mx-auto my-2 py-2 px-2 break-inside-avoid-page'>
      <h3 className='text-3xl font-bold text-center mb-4'>
        <FontAwesomeIcon icon={faBook} className='ml-1 mr-2' />
        { i18n.skillTitle[locale] }
      </h3>

      <div className='xs:grid grid-cols-2 justify-center'>
        { i18n.skills[locale].map((skill, i) => (
          <div key={i} className='p-4'>
            <h4 className='text-xl text-semibold text-center border-b'>{ skill.category }</h4>
            <ul className='p-2 list-disc list-inside text-sm'>
              { skill.details.map((detail, i) => (
                <li key={i}>{ detail }</li>
              )) }
            </ul>
          </div>
        )) }
      </div>
    </div>

    <div className='max-w-2xl mx-auto py-1 px-2'>
      <h3 className='text-3xl font-bold text-center my-4'>
        <FontAwesomeIcon icon={faFolderOpen} className='ml-1 mr-2' />
        { i18n.showcasesTitle[locale] }
      </h3>

      <div className='p-2'>
        { i18n.showcases[locale].map((showcase, i) => (
          <div key={i} className={classnames(styles.showcase, 'my-6 break-inside-avoid-page')}>
            <ExternalImage alt={showcase.title} src={showcase.thumbnail} className={styles.thumbnail} />
            <img alt='' src={showcasePrintGradientPng} className={styles.printGradient} />
            <LinkToIfHref href={showcase.href} preventStyle>
              <div className={classnames(styles.container, 'flex flex-col p-4')}>
                <div className={classnames(styles.description, 'flex-1')}>
                  <h4 className='text-2xl font-bold mb-3'>{ showcase.title }</h4>
                  { showcase.details.map((d, i) => (
                    <p key={i} className='text-sm mb-2'>{ d }</p>
                  )) }
                </div>

                { showcase.href && (
                  <p className={styles.action}>
                    <span className='xs:hidden'>
                      { i18n.showcasesAction[locale] }
                    </span>
                    <FontAwesomeIcon icon={faAngleRight} className='ml-1 mr-2' />
                    <span className='hidden xs:inline'>
                      { showcase.href }
                    </span>
                  </p>
                ) }
              </div>
            </LinkToIfHref>
          </div>
        )) }
      </div>
    </div>
  </section>
);

const ResumeContentPortal = ({ locale }) => {
  const [containerDom, setContainerDom] = useState(null);

  useEffect(() => {
    const dom = document.createElement('div');
    dom.classList.add('resume-content-portal');
    document.body.appendChild(dom);
    setContainerDom(dom);

    return () => {
      dom.remove();
    };
  }, []);

  /*
   * Why portal?
   * With this <ResumeContent /> inside App html layout DOM structure, break-inside-avoid-page can not prevent page break in the middle of element when printing
   * instead we put resume outside of App html layout using ReactDOM.createPortal
   */

  return containerDom ? ReactDOM.createPortal(
    <ResumeContent locale={locale} />,
    containerDom,
  ) : null;
};

export default ResumeContentPortal;

const LinkToIfHref = ({ href, children, preventStyle }) => (
  href ? (
    <a
      className={preventStyle ? '' : styles.link}
      href={href}
      target='_blank'
      rel='noreferrer'
    >{ children }</a>
  ) : children
);
