export const locales = [
  { localeName: 'zh', displayName: '中' },
  { localeName: 'en', displayName: 'EN' },
];

const translations = {
  // /about
  name: {
    zh: 'PastLeo | 西瓜',
    en: 'PastLeo',
  },
  nameFormal: {
    zh: '邱冠喻',
    en: 'Chiu Guan Yu',
  },
  location: {
    zh: '台灣 台北',
    en: 'Taiwan, Taipei',
  },
  jobTitle: {
    zh: '軟體工程師',
    en: 'Software Engineer',
  },
  briefCvTitle: {
    zh: '經歷、成就：',
  },
  briefCv: {
    zh: [
      'iThome 鐵人賽 2021 Modern Web 組優選',
      '多屆 ASTRO Camp Javascript 兼職講師',
      '多年於五倍紅寶石擔任全端工程師',
      'COSCUP, MOPCON, SITCON 等社群活動講者',
      '畢業於中興大學資訊科學與工程學系',
    ],
  },
  briefSkillTitle: {
    zh: '經驗、技能：',
  },
  briefSkill: {
    zh: [
      '熟悉 WebGL、Three.js 等網頁 3D 渲染技術',
      '熟悉 Next.js 作為 React 網站框架',
      '多年 React 開發經驗',
      '多年 Web 前端開發經驗',
      '多年後端框架(Rails)開發經驗',
      '多年 Linux 商轉使用、個人使用經驗',
    ],
  },
  quotes: {
    zh: [
      '興趣使然的軟體工程師，對資訊科技的一切事物有興趣，從電腦硬體、作業系統、網路到網站前後端、應用程式之技術',
      '喜歡有趣的互動體驗以及創造的過程，因此開發讓大家一起遊玩創造力的遊戲平台',
    ],
    en: [
      'Interested in exploring things about computer, from hardware, operating system, Internet to technologies building frontend/backend of web and applications',
      'Loving intriguing interactive experience and process of creating, I develop game where people explore creativity',
    ],
  },
  showFullResume: {
    zh: '顯示履歷',
  },
  back: {
    zh: '回首頁',
    en: 'Back to index',
  },

  // ResumeContent
  experienceTitle: {
    zh: '經歷',
  },
  education: {
    zh: '學歷',
  },
};

export const defaultLocale = locales[0].localeName;
const otherLocales = locales.slice(1, locales.length).map(l => l.localeName);

export const i18n = Object.fromEntries(
  Object.entries(translations).map(([key, { [defaultLocale]: defaultTranslation, ...otherTranslations }]) => ([
    key,
    {
      [defaultLocale]: defaultTranslation,
      ...Object.fromEntries(
        otherLocales.map(l => ([l, otherTranslations[l] || defaultTranslation])),
      ),
    },
  ])),
);

