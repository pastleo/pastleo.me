import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSuitcase, faMobileAlt, faStore, faUser,
  faCommentDots, faGraduationCap, faBook,
  faLanguage, faTerminal, faGem, faServer,
  faRocket, faAddressCard,
} from '@fortawesome/free-solid-svg-icons';
import { faHtml5 } from '@fortawesome/free-brands-svg-icons';

import styles from '../../styles/components/about/resume-content.module.scss';

const ResumeContent = ({ locale }) => (locale === 'en' && (
  <section className={classnames(styles.resumeContent)}>
    <div className={styles.gradient} />
    <div className='max-w-3xl mx-auto pt-4 pb-6 px-2'>
      <div className='w-4/5 print:w-9/10 m-auto py-4 print:py-0'>
        <p className='pb-2'>
          Currently working for 5xruby.tw as my first job, my experience and skills have been building up quickly to develop software for business. With rich experience about frontend and React development for 2 years, now I am leading a team building an E-commerce platform, and it has received very positive feedback from our cooperative partner.
        </p>
        <p className='pb-2'>
          As part of the open source community, I have contributed my exploration of the web and open source technologies through 4 conference talks and patches to open source projects.
        </p>
      </div>
      <div className={classnames(styles.pagebreak, 'w-4/5 print:w-9/10 mx-auto mb-4')}>
        <h1 className='text-3xl font-bold ml-6'>
          <FontAwesomeIcon icon={faSuitcase} className='mr-2' />
          Experience
        </h1>
      </div>
      <div className={classnames(styles.resumeStory, 'w-4/5 print:w-9/10 ml-auto border-solid border-black border-l mb-3')}>
        <div className={styles.timeMark}>
          <h5>2017/2 ~</h5>
        </div>
        <article>
          <h2 className='font-bold text-2xl'>
            { 'Rails/Full-stack Engineer at ' }
            <a href='https://5xruby.tw' target='_blank' rel='noreferrer'>5xRuby</a>
          </h2>
          <div className='details ml-3'>
            <h3 className='text-xl'>
              <a href='https://www.quickbuy.jp/' target='_blank' rel='noreferrer'>
                <FontAwesomeIcon icon={faMobileAlt} className='mr-1 print:hidden' />
                QuickBuy E-commerce Platform and App
              </a>
            </h3>
            <h4 className='ml-3'>
              Project lead:
              <span>
                leading the team building a MVP in 3 months while communicating and working with foreign partner
              </span>
            </h4>
            <h4 className='ml-3'>
              Improve user experience of E-commerce App:
              <span>
                developing for both Android and iOS based on React native
              </span>
            </h4>
            <h4 className='ml-3'>
              Setup App build automation and save time for the team:
              <span>
                CI/CD flow from git push to Testflight and Google Play within 20 minutes using fastlane
              </span>
            </h4>
            <h4 className='ml-3'>
              Improve management site of the E-commerce platform:
              <span>
                developing Ruby on Rails application with React frontend
              </span>
            </h4>
            <h3 className='text-xl'>
              <a href='https://goshopmatic.com/sg/' target='_blank' rel='noreferrer'>
                <FontAwesomeIcon icon={faStore} className='mr-1 print:hidden' />
                Shopmatic E-commerce Platform
              </a>
            </h3>
            <h4 className='ml-3'>
              Successfully complete a complex migration without any downtime:
              <br />
              <span>
                converting half million customized webpage data to change from HTML format to React props. Utilizing Elixir, it can be done in 20 minutes and re-migrate data changed by user
              </span>
            </h4>
            <h4 className='ml-3'>
              Boost frontend maintainability and user experience:
              <span>
                rewriting rich-user-interaction pages using React
              </span>
            </h4>
            <h4 className='ml-3'>
              Modernize frontend assets bundling, making development and deployment less heavy:
              <span>
                integrating frontend workflow such as webpack with Rails, reducing compiling time from 20+ minutes to 5 minutes
              </span>
            </h4>
            <h4 className='ml-3'>
              Improve and maintain backend of E-commerce platform
            </h4>
          </div>
        </article>
      </div>
      <div className={classnames(styles.resumeStory, 'w-4/5 print:w-9/10 ml-auto border-solid border-black border-l mb-3')}>
        <h2 className='font-bold text-2xl ml-3'>
          <FontAwesomeIcon icon={faUser} className='mr-2' />
          Community
        </h2>
        <div className={styles.timeMark}>
          <h5>2018/11</h5>
        </div>
        <article>
          <h4>
            <FontAwesomeIcon icon={faCommentDots} className='mr-1 print:hidden' />
            <a href='https://mopcon.org/2018/' target='_blank' rel='noreferrer'>
              MOPCON 2018
            </a>
            Speaker
          </h4>
          <h4 className='ml-3 screen:text-right'>
            <a href='https://mopcon.org/2018/speaker.php?id=4' target='_blank' rel='noreferrer'>
              WebComponent &amp; lit-html - another frontend implementation choice
            </a>
          </h4>
        </article>
        <br />
        <div className={styles.timeMark}>
          <h5>2018/8</h5>
        </div>
        <article>
          <h4>
            <FontAwesomeIcon icon={faCommentDots} className='mr-1 print:hidden' />
            <a href='https://2018.coscup.org' target='_blank' rel='noreferrer'>
              COSCUP 2018
            </a>
            Speaker
          </h4>
          <h4 className='ml-3 screen:text-right'>
            <a href='https://2018.coscup.org/programs/full-archlinux/' target='_blank' rel='noreferrer'>
              Archlinux for daily usage
            </a>
          </h4>
        </article>
        <br />
        <div className={styles.timeMark}>
          <h5>2018/4</h5>
        </div>
        <article>
          <h4>
            <FontAwesomeIcon icon={faCommentDots} className='mr-1 print:hidden' />
            <a href='https://2018.rubyconf.tw/' target='_blank' rel='noreferrer'>
              Ruby &amp; Elixir Conf TW 2018
            </a>
            Speaker
          </h4>
          <h4 className='ml-3 screen:text-right'>
            <a href='https://2018.rubyconf.tw/program#pastleo' target='_blank' rel='noreferrer'>
              Not familiar with Elixir? Let me do a simple intro in 30 minutes
            </a>
          </h4>
        </article>
        <br />
        <div className={styles.timeMark}>
          <h5>2016/2</h5>
        </div>
        <article>
          <h4>
            <FontAwesomeIcon icon={faCommentDots} className='mr-1 print:hidden' />
            <a href='http://sitcon.org/2016/' target='_blank' rel='noreferrer'>
              SITCON 2016
            </a>
            Speaker
          </h4>
          <h4 className='ml-3 screen:text-right'>
            <a href='http://sitcon.org/2016/#target-schedule' target='_blank' rel='noreferrer'>
              Customize my development environment and make it open-source!
            </a>
          </h4>
        </article>
        <br />
        <div className={styles.timeMark}>
          <h5>2015/8 ~ <br className='inline sm:hidden' />2016/8</h5>
        </div>
        <article>
          <h3 className='text-xl'>
            Director of
            <a href='http://nchuit.cc/' target='_blank' rel='noreferrer'>
              National Chung Hsing University Information Technologies Club
            </a>
          </h3>
          <h4 className='ml-3'>
            Held several courses
            <span>
              about Web technologies such as HTML, Javascript, jQuery or even making games on web to promote IT knowledges to other students
            </span>
          </h4>
        </article>
        <br />
        <div className={styles.timeMark}>
          <h5>2013/8 ~ <br className='inline sm:hidden' />2015/8</h5>
        </div>
        <article>
          <h3 className='text-xl'>
            Information Technologies Department of
            <a href='http://nchusg.org/' target='_blank' rel='noreferrer'>
              National Chung Hsing University Student Association
            </a>
          </h3>
          <h4 className='ml-3'>
            Maintain Linux server
            <span>
              which runs student association services such as poster management system
            </span>
          </h4>
        </article>
      </div>
      <div className={classnames(styles.resumeStory, 'w-4/5 print:w-9/10 ml-auto border-solid border-black border-l mb-3')}>
        <h2 className='font-bold text-2xl ml-3'>
          <FontAwesomeIcon icon={faGraduationCap} className='mr-1' />
          Education
        </h2>
        <div className={styles.timeMark}>
          <h5>2012 ~ <br className='inline sm:hidden' />2016</h5>
        </div>
        <article>
          <h3 className='text-xl'>
            <a href='https://www.nchu.edu.tw/' target='_blank' rel='noreferrer'>
              National Chung Hsing University
            </a>
            <a href='http://www.cs.nchu.edu.tw/' target='_blank' rel='noreferrer'>
              Department of Computer Science and Engineering
            </a>
          </h3>
        </article>
        <br />
        <div className={styles.timeMark}>
          <h5>2009 ~ <br className='inline sm:hidden' />2012</h5>
        </div>
        <article>
          <h3 className='text-xl'>
            <a href='http://www.pcsh.ntpc.edu.tw/' target='_blank' rel='noreferrer'>
              New Taipei Municipal Panchiao Senior High School
            </a>
          </h3>
        </article>
      </div>
      <hr className='h-px border-t border-solid border-black' />
      <div className={classnames(styles.resumeStory, 'w-4/5 print:w-9/10 ml-auto border-solid border-black border-l mb-3')}>
        <div className={styles.leftTitle}>
          <h2 className='font-bold text-2xl ml-3 text-right'>
            <FontAwesomeIcon icon={faBook} className='mb-2 ml-2 mt-2' />
            Skills
          </h2>
        </div>
        <article>
          <h3 className='text-xl'>
            Languages Skills
          </h3>
          <div className='details ml-3'>
            <h4>
              <FontAwesomeIcon icon={faLanguage} className='mr-1 print:hidden' />
              English: able to hold daily conversation and meeting
            </h4>
            <h4>
              <FontAwesomeIcon icon={faLanguage} className='mr-1 print:hidden' />
              Chinese: native
            </h4>
          </div>
        </article>
        <article>
          <h3 className='text-xl'>
            IT Skills / Knowledges
          </h3>
          <div className='details ml-3'>
            <h4>
              <FontAwesomeIcon icon={faTerminal} className='mr-1 print:hidden' />
              Experienced Programming Languages: Javascript, Ruby, Elixir
            </h4>
            <p className='ml-3'>
              Learning Rust, has written C/C++, Python, Java, PHP, Golang
            </p>
            <h4>
              <FontAwesomeIcon icon={faHtml5} className='mr-1 print:hidden' />
              Frontend: React, Redux (Thunk)
            </h4>
            <p className='ml-3'>
              HTML, Vanilla Javascript, jQuery, CSS, Boostrap, Webpack, Babel
            </p>
            <h4>
              <FontAwesomeIcon icon={faGem} className='mr-1 print:hidden' />
              Ruby on Rails
            </h4>
            <p className='ml-3'>
              Devise, Doorkeeper, CarrierWave, ActiveAdmin, Rspec
            </p>
            <h4>
              <FontAwesomeIcon icon={faServer} className='mr-1 print:hidden' />
              Linux, ArchLinux, Shell scripting, Docker, Git, PostgreSQL
            </h4>
          </div>
        </article>
      </div>
    </div>
  </section>
));

export default ResumeContent;
