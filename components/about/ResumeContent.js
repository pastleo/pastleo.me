import React from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSuitcase, faAward, faCommentDots, faGraduationCap, faBook, faFolderOpen,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

import styles from '../../styles/components/about/resume-content.module.scss';
import { resumeModeBlock } from '../../styles/resume.module.scss';

import { i18n } from '../../lib/i18n.js';

const ResumeContent = ({ locale }) => (
  <section className={classnames(styles.resumeContent, resumeModeBlock)}>
    <div className='max-w-3xl mx-auto pt-12 pb-6 px-2'>
      <div className={classnames('w-4/5 print:w-9/10 ml-auto mb-4')}>
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

      <div className={classnames(styles.pagebreak, 'w-4/5 print:w-9/10 ml-auto mb-4')}>
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

      <div className={classnames('w-4/5 print:w-9/10 ml-auto mb-4')}>
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

      <div className={classnames('w-4/5 print:w-9/10 ml-auto mb-4')}>
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

    <div className={classnames(styles.pagebreak, 'max-w-2xl mx-auto py-6 px-2')}>
      <h3 className='text-3xl font-bold text-center mb-4'>
        <FontAwesomeIcon icon={faBook} className='ml-1 mr-2' />
        { i18n.skillTitle[locale] }
      </h3>

      <div className={classnames('grid grid-cols-2 justify-center')}>
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

      <h3 className='text-3xl font-bold text-center my-4'>
        <FontAwesomeIcon icon={faFolderOpen} className='ml-1 mr-2' />
        { i18n.showcastTitle[locale] }
      </h3>
      <div>
        { i18n.showcasts[locale].map((showcase, i) => (
          <div key={i}
            className={classnames(styles.showcase, 'my-6')}
          >
            <img alt={showcase.title} src={showcase.thumbnail} className={classnames(styles.thumbnail, '')} />
            <LinkToIfHref href={showcase.href} preventStyle>
              <div className={classnames(styles.gradient, 'flex flex-col p-4')}>
                <div className={classnames(styles.description, 'flex-1')}>
                  <h4 className='text-2xl font-bold mb-3'>{ showcase.title }</h4>
                  { showcase.details.map((d, i) => (
                    <p key={i} className='text-sm mb-2'>{ d }</p>
                  )) }
                </div>

                { showcase.href && (
                  <p className={styles.action}>
                    <FontAwesomeIcon icon={faAngleRight} className='ml-1 mr-2' />
                    { showcase.href }
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

export default ResumeContent;

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
