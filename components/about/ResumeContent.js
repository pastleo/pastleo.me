import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSuitcase, faAward, faCommentDots, faGraduationCap, faBook, faFolderOpen,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { faGitAlt } from '@fortawesome/free-brands-svg-icons';

import ExternalImage from '../../components/ExternalImage.js';

import { isExternalUrl } from '../../lib/utils.js';

import styles from '../../styles/components/about/resume-content.module.scss';
import { resumeModeBlock } from '../../styles/resume.module.scss';

import t from '../../lib/resumeData';

import showcasePrintGradientPng from '../../assets/showcase-print-gradient.png';

const ResumeContent = ({ locale }) => (
  <section className={classnames(styles.resumeContent, resumeModeBlock)}>
    <div className='max-w-3xl mx-auto mb-2 pt-12 print:pt-9 pb-1 px-2'>
      <div className='w-4/5 print:w-9/10 ml-auto mb-4'>
        <h3 className='text-3xl font-bold ml-n3.5'>
          <FontAwesomeIcon icon={faSuitcase} className='mr-2' />
          { t.experienceTitle[locale] }
        </h3>
      </div>
      { t.experience[locale].map((exp, i) => (
        <div key={i} className={classnames(styles.resumeStory, 'w-4/5 print:w-9/10 ml-auto pb-2 break-inside-avoid-page')}>
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
            <h4 className='mb-1'>
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
                    { (detail.description || []).map((line, i) => (
                      <Line key={i} line={line} className='text-sm print:text-xs my-1' />
                    )) }
                  </div>
                </React.Fragment>
              )) }
            </div>
          </article>
        </div>
      )) }
    </div>

    <div className={classnames(
      'max-w-3xl mx-auto my-2 py-2 px-2',
      { 'break-before-page': t.pageBreakBeforeAchievement[locale] },
    )}>
      <div className='w-4/5 print:w-9/10 ml-auto mb-4'>
        <h3 className='text-3xl font-bold ml-n3.5'>
          <FontAwesomeIcon icon={faAward} className='ml-1 mr-2' />
          { t.achievementTitle[locale] }
        </h3>
      </div>

      { t.achievements[locale].map((ach, i) => (
        <div key={i} className={classnames(styles.resumeStory, 'w-4/5 print:w-9/10 ml-auto pb-2 break-inside-avoid-page')}>
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
              { (ach.description || []).map((line, i) => (
                <Line key={i} line={line} className='text-sm my-1' />
              )) }
            </div>
          </article>
        </div>
      )) }
    </div>

    <div className={classnames(
      'max-w-3xl mx-auto my-2 py-2 px-2',
      { 'break-before-page': t.pageBreakBeforeTalk[locale] },
    )}>
      <div className='w-4/5 print:w-9/10 ml-auto mb-4'>
        <h3 className='text-3xl font-bold ml-n3.5'>
          <FontAwesomeIcon icon={faCommentDots} className='mr-2' />
          { t.talkTitle[locale] }
        </h3>
      </div>

      { t.talks[locale].map((talk, i) => (
        <div key={i} className={classnames(styles.resumeStory, 'w-4/5 print:w-9/10 ml-auto break-inside-avoid-page')}>
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
              { (talk.description || []).map((line, i) => (
                <Line key={i} line={line} className='text-sm' />
              )) }
            </div>
          </article>
        </div>
      )) }
    </div>

    <div className={classnames(
      'max-w-3xl mx-auto my-2 py-2 px-2',
      { 'break-before-page': t.pageBreakBeforeEducation[locale] },
    )}>
      <div className='w-4/5 print:w-9/10 ml-auto mb-4'>
        <h3 className='text-3xl font-bold ml-n3.5'>
          <FontAwesomeIcon icon={faGraduationCap} className='mr-2' />
          { t.educationTitle[locale] }
        </h3>
      </div>

      { t.educations[locale].map((edu, i) => (
        <div key={i} className={classnames(styles.resumeStory, 'w-4/5 print:w-9/10 ml-auto break-inside-avoid-page')}>
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
              { (edu.description || []).map((line, i) => (
                <Line key={i} line={line} className='text-sm my-1' />
              )) }
            </div>
          </article>
        </div>
      )) }
    </div>

    <div className={classnames(
      'max-w-2xl mx-auto my-2 py-2 px-2',
      { 'break-before-page': t.pageBreakBeforeSkill[locale] },
    )}>
      <h3 className='text-3xl font-bold text-center mb-4'>
        <FontAwesomeIcon icon={faBook} className='ml-1 mr-2' />
        { t.skillTitle[locale] }
      </h3>

      <div className='xs:grid grid-cols-2 justify-center break-inside-avoid-page'>
        { t.skills[locale].map((skill, i) => (
          <div key={i} className='p-4'>
            <h4 className='text-xl font-bold text-center border-b'>{ skill.category }</h4>
            <ul className='p-2 list-disc list-inside text-sm'>
              { skill.items.map((line, i) => (
                <Line key={i} tagName='li' line={line} />
              )) }
            </ul>
          </div>
        )) }
      </div>
    </div>

    <div className={classnames(
      'max-w-2xl mx-auto py-1 px-2',
      { 'break-before-page': t.pageBreakBeforeShowcases[locale] },
    )}>
      <h3 className='text-3xl font-bold text-center my-4'>
        <FontAwesomeIcon icon={faFolderOpen} className='ml-1 mr-2' />
        { t.showcasesTitle[locale] }
      </h3>

      <div className='p-2'>
        { t.showcases[locale].map((showcase, i) => (
          <div key={i} className={classnames(styles.showcase, 'mb-6 break-inside-avoid-page')}>
            <ExternalImage alt={showcase.title} src={showcase.thumbnail} className={styles.thumbnail} />
            <img alt='' src={showcasePrintGradientPng} className={styles.printGradient} />
            <div className={classnames(styles.container, 'flex flex-col p-4')}>
              <LinkToIfHref href={showcase.href} preventStyle className='flex-1'>
                <div className={classnames(styles.description)}>
                  <h4 className='text-2xl font-bold mb-3'>{ showcase.title }</h4>
                  { (showcase.description || []).map((line, i) => (
                    <p key={i} className='text-sm print:text-xs mb-1'>
                      { line }
                    </p>
                  )) }
                </div>
              </LinkToIfHref>

              <div className={classnames(styles.actions)}>
                { showcase.git && (
                  <LinkToIfHref href={showcase.git}>
                    <span className={classnames(styles.actionItem, 'xs:block')}>
                      <FontAwesomeIcon icon={faGitAlt} className={classnames(styles.iconBefore, 'mx-1')} />
                      <span className='xs:hidden'>
                        { t.showcasesGitAction[locale] }
                      </span>
                      <span className='hidden xs:inline'>
                        { showcase.git }
                      </span>
                      <FontAwesomeIcon icon={faGitAlt} className={classnames(styles.icon, 'mx-1')} />
                    </span>
                  </LinkToIfHref>
                ) }
                { showcase.href && (
                  <LinkToIfHref href={showcase.href}>
                    <span className={classnames(styles.actionItem, 'xs:block')}>
                      <FontAwesomeIcon icon={faAngleRight} className={classnames(styles.iconBefore, 'mx-1')} />
                      <span className='xs:hidden'>
                        { t.showcasesViewAction[locale] }
                      </span>
                      <span className='hidden xs:inline'>
                        { showcase.href }
                      </span>
                      <FontAwesomeIcon icon={faAngleRight} className={classnames(styles.icon, 'mx-1')} />
                    </span>
                  </LinkToIfHref>
                ) }
              </div>
            </div>
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

const LinkToIfHref = ({ href, preventStyle, className, children }) => (
  href ? (
    <a
      className={classnames(className, { [styles.link]: !preventStyle })}
      href={href}
      target='_blank'
      rel='noreferrer'
    >{ children }</a>
  ) : children
);

/**
 * props line: import type { Line } from '../../lib/i18n/i18n.ts'
 */
const Line = ({ line, className, tagName }) => React.createElement(
  tagName || 'p',
  { className: classnames(className, { 'font-bold': line.bold === true }) },
  typeof line.line === 'string' ? (
    typeof line.href === 'string' ? (
      <a
        className={styles.link}
        href={line.href}
        target='_blank'
        rel='noreferrer'
      >{ line.line }</a>
    ) : (
      line.line
    )
  ) : (
    isExternalUrl(line) ? (
      <a
        className={styles.link}
        href={line}
        target='_blank'
        rel='noreferrer'
      >{ line }</a>
    ) : line
  ),
);
