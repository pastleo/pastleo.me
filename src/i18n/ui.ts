import type { Locale } from './config';

interface UI {
  home: string;
  mainNavigation: string;
  languageNavigation: string;
  contacts: string;
  footer: string;
  title: string;
  description: string;
}

export const ui: Record<Locale, UI> = {
  zh: {
    home: '首頁', mainNavigation: '主導覽', languageNavigation: '語言選擇',
    contacts: '聯絡方式', footer: '以 Astro 靜態生成', title: 'PastLeo',
    description: '興趣使然的軟體工程師，投入於 Web、前端工程，以參與遊戲的開發為目標。',
  },
  en: {
    home: 'Home', mainNavigation: 'Main navigation', languageNavigation: 'Language selection',
    contacts: 'Contact', footer: 'Static site by Astro', title: 'PastLeo',
    description: 'Software engineer focused on web and frontend engineering, with the goal of contributing to game development.',
  },
  ja: {
    home: 'ホーム', mainNavigation: 'メインナビゲーション', languageNavigation: '言語選択',
    contacts: '連絡先', footer: 'Astro で静的生成', title: 'PastLeo',
    description: 'Web・フロントエンド開発に取り組み、ゲーム開発に携わることを目指すソフトウェアエンジニア。',
  },
};
