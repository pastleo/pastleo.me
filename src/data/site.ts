import type { Locale as SiteLocale } from '../i18n/config';

export type Locale = SiteLocale;
export { defaultLocale } from '../i18n/config';

export const site = {
  name: 'PastLeo',
  url: 'https://pastleo.me',
};

export interface NavLink {
  page: string;
  label: string;
}

// Navigation is rendered only for pages implemented in the current locale;
// destinations are resolved through the translatedPages registry.
export const nav: Record<SiteLocale, NavLink[]> = {
  zh: [
    { page: 'about', label: '關於我' },
    { page: 'blog', label: '部落格' },
  ],
  en: [
    { page: 'about', label: 'About' },
  ],
  ja: [
    { page: 'about', label: '自己紹介' },
  ],
};

export interface ContactLink {
  label: string;
  href: string;
  display?: string;
  external?: boolean;
}

export const contacts: ContactLink[] = [
  {
    label: 'Email',
    href: 'mailto:chgu82837@gmail.com',
    display: 'chgu82837@gmail.com',
  },
  { label: 'GitHub', href: 'https://github.com/pastleo', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pastleo', external: true },
  { label: 'Facebook', href: 'https://fb.me/pastleo', external: true },
];

export interface PageContent {
  name: string;
  nameFormal: string;
  jobTitle: string;
  location: string;
  quotes: string[];
  briefCvTitle: string;
  briefCv: string[];
  showFullResume: string;
}

export const pageContent: Record<SiteLocale, PageContent> = {
  zh: {
    name: '西瓜 | Leo',
    nameFormal: '邱冠喻',
    jobTitle: '軟體工程師',
    location: '台灣 台北',
    quotes: [
      '興趣使然的軟體工程師，對資訊科技的一切事物有興趣，從電腦硬體、作業系統、網路到網站前後端、應用程式之技術',
      '投入於 Web、前端工程，喜歡有趣的互動體驗以及創造的過程，以參與遊戲的開發為目標。',
    ],
    briefCvTitle: '經歷摘要',
    briefCv: [
      'DEX, DeFi & GameFi 前端開發',
      '鑽研 GPU 渲染技術，撰寫 WebGL 技術文章，獲得 2021 iThome 鐵人賽優選，出版『WebGL — 建構網頁中的 3D 遊戲，從基礎渲染原理、光影到應用』書籍',
      'ASTRO Camp Javascript 兼任講師',
      '多年 React, React Native 以及 Next.js 前端開發經驗',
      '多年 Rails, Elixir 後端開發經驗',
      'COSCUP, MOPCON, SITCON 等社群活動講者',
      '多年 Linux 商轉、個人電腦使用經驗',
    ],
    showFullResume: '查看完整履歷',
  },
  en: {
    name: 'Leo / PastLeo',
    nameFormal: 'Chiu Guan Yu',
    jobTitle: 'Software Engineer',
    location: 'Taipei, Taiwan',
    quotes: [
      "Interested in a wide range of IT and computer fields, including hardware, operating system, Internet as well as frontend and backend technologies of web and applications",
      'Fond of intriguing interactive experience and process of creating. Devoted to Web & frontend engineering, with the goal of contributing to game development.',
    ],
    briefCvTitle: 'Summary of my career',
    briefCv: [
      'Frontend development of DEX, DeFi & GameFi',
      'Author of Book "WebGL — 建構網頁中的 3D 遊戲，從基礎渲染原理、光影到應用"',
      'Merit award of iThome Ironman (tech post marathon) 2021 writing about WebGL',
      'Javascript lecturer of ASTRO Camp',
      'Years of React, React Native, Next.js, frontend development experience',
      'Years of Rails, Elixir backend development experience',
      'Speaker of conferences such as COSCUP, MOPCON, SITCON',
      'Years of Linux experience for commercial and personal use',
    ],
    showFullResume: 'Show full resume',
  },
  ja: {
    name: '西瓜（スイカ） / Leo', nameFormal: '邱冠喻（キュウ カンユ）',
    jobTitle: 'ソフトウェアエンジニア', location: '台湾・台北',
    quotes: [
      'ハードウェア、OS、ネットワークから Web のフロントエンド・バックエンド、アプリケーション開発まで、情報技術の幅広い分野に興味があります。',
      'おもしろいインタラクションやものづくりの過程が好きで、Web・フロントエンド開発に取り組みながら、ゲーム開発に携わることを目指しています。',
    ],
    briefCvTitle: '経歴概要',
    briefCv: [
      'DEX・DeFi・GameFi のフロントエンド開発',
      'GPU レンダリングを探求し、WebGL の技術記事を執筆。2021 年 iThome 鉄人賽で優選を受賞し、『WebGL — 建構網頁中的 3D 遊戲，從基礎渲染原理、光影到應用』を出版',
      'ASTRO Camp の JavaScript 非常勤講師',
      'React・React Native・Next.js による長年のフロントエンド開発経験',
      'Rails・Elixir による長年のバックエンド開発経験',
      'COSCUP・MOPCON・SITCON などのコミュニティイベントで登壇',
      '業務・個人利用における長年の Linux 経験',
    ],
    showFullResume: '履歴書を見る',
  },
};
