export const locales = [
  { localeName: 'zh', displayName: '中' },
  { localeName: 'en', displayName: 'EN' },
];

const translations = {
  // /about
  name: {
    zh: 'PastLeo | 西瓜',
    en: 'PastLeo / Leo',
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
    zh: '經歷摘要：',
  },
  briefCv: {
    zh: [
      '於 2021 iThome 鐵人賽撰寫 WebGL 文章獲得優選',
      'ASTRO Camp Javascript 兼任講師',
      '多年 React, React Native 以及 Next.js 前端開發經驗',
      '多年 Rails, Elixir 後端開發經驗',
      'COSCUP, MOPCON, SITCON 等社群活動講者',
      '多年 Linux 商轉、個人使用經驗',
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
    zh: '顯示完整履歷',
  },
  back: {
    zh: '回首頁',
    en: 'Back to index',
  },

  // ResumeContent
  experienceTitle: {
    zh: '經歷',
  },
  experience: {
    zh: [{
      where: 'SOHO',
      title: '兼職、進修、自我實現',
      from: '2021/2',
      details: [{
        title: 'Unamed World',
        href: 'https://intro.unamed.world/',
        description: [
          '讓大家一起遊玩創造力的世界，由 PastLeo 發起的計畫，由『讓玩家在遊戲中創造之 minecraft』所啟發',
          '供使用者繪製、調整地面、製作物件，並持續開發中',
          '使用 three.js 渲染 3D 畫面、React 作為 UI 框架，採用 WebSocket + WebRTC 所產生的 p2p 網路進行連線',
        ],
      }],
    }, {
      where: '五倍紅寶石',
      href: 'https://5xruby.com',
      title: '全端工程師',
      from: '2017/2',
      to: '2021/2',
      details: [{
        title: 'QuickBuy クイックバイ 電商平台與手機 App',
        href: 'https://play.google.com/store/apps/details?id=com.standardtransaction.quickbuy.rnapp',
        description: [
          '使用 React Native 製作 Android/iOS 跨平台應用程式，並建立 CI/CD 自動化應用程式建置節省開發者時間',
          '後端使用 Ruby on Rails、前端使用 React 作為管理界面前端框架',
        ],
      }, {
        title: 'Shopmatic 電商平台',
        href: 'https://goshopmatic.com',
        description: [
          '後端使用 Ruby on Rails、前端使用 React 作為商店、管理編輯頁面之框架',
        ],
      }],
    }],
  },

  achievementTitle: {
    zh: '成就',
  },
  achievements: {
    zh: [{
      what: '優選',
      title: 'iThome 鐵人賽 2021 Modern Web 組',
      href: 'https://ithelp.ithome.com.tw/2021ironman/reward',
      time: '2022/1',
      description: [
        '主題：如何在網頁中繪製 3D 場景？從 WebGL 的基礎開始說起',
      ],
    }],
  },

  talkTitle: {
    zh: '講座、課程',
  },
  talks: {
    zh: [{
      event: 'ASTRO Camp 7th',
      title: 'Javascript 課程兼任講師',
      href: 'https://astro.5xruby.tw/',
      time: '2021/4',
    }, {
      event: 'ASTRO Camp 6th',
      title: 'Javascript 課程兼任講師',
      href: 'https://astro.5xruby.tw/',
      time: '2020/12',
    }, {
      event: 'ASTRO Camp 5th',
      title: 'Javascript 課程兼任講師',
      href: 'https://astro.5xruby.tw/',
      time: '2020/8',
    }, {
      event: 'MOPCON 2018',
      title: 'WebComponent & lit-html 前端開發新選擇',
      href: 'https://mopcon.org/2018/speaker.php?id=4',
      time: '2018/11',
    }, {
      event: 'COSCUP 2018',
      title: '全面使用 archlinux 之旅',
      href: 'https://coscup.org/2018/programs/full-archlinux/',
      time: '2018/8',
    }, {
      event: 'Ruby & Elixir Conf TW 2018',
      title: 'Not familiar with Elixir? Let me do a simple intro in 30 minutes',
      href: 'https://2018.rubyconf.tw/program#pastleo',
      time: '2018/4',
    }, {
      event: 'SITCON 2016',
      title: '客製化我的開發環境並將它開源！',
      href: 'https://sitcon.org/2016/#target-schedule',
      time: '2016/2',
    }],
  },

  educationTitle: {
    zh: '學歷',
  },
  educations: {
    zh: [{
      school: '國立中興大學',
      department: '資訊科學與工程學系',
      from: '2012',
      to: '2016',
      details: [
        '曾於在學期間擔任資訊社社長、學生會資訊管理人員',
      ],
    }, {
      school: '新北市板橋高中',
      department: '二類組',
      from: '2009',
      to: '2012',
    }],
  },

  skillTitle: {
    zh: '技能',
  },
  skills: {
    zh: [{
      category: '前端',
      details: [
        'Javascript / Typescript',
        'React / Next.js / React Native',
        'Three.js / WebGL',
        'Vanilla DOM / jQuery',
        'CSS / Tailwindcss',
      ],
    }, {
      category: '後端、資料庫',
      details: [
        'Ruby / Rails',
        'Elixir / Phoenix',
        'Node.js',
        'PostgreSQL',
      ],
    }, {
      category: 'DevOps',
      details: [
        'Linux / Ubuntu / ArchLinux',
        'Git / Git flow CI/CD',
        'Docker / Kubernetes',
        'GCP / Heroku',
      ],
    }],
  },

  showcasesTitle: {
    zh: '作品集',
  },
  showcasesAction: {
    zh: '查看',
  },
  showcases: {
    zh: [{
      thumbnail: 'https://i.imgur.com/tEHlwPBh.png',
      title: 'Unamed World',
      href: 'https://intro.unamed.world',
      details: [
        '讓大家一起遊玩創造力的世界，由 PastLeo 發起的計畫，由『讓玩家在遊戲中創造之 minecraft』所啟發',
        '供使用者繪製、調整地面、製作物件，並持續開發中',
        '使用 three.js 渲染 3D 畫面、React 作為 UI 框架，採用 WebSocket + WebRTC 所產生的 p2p 網路進行連線',
      ],
    }, {
      thumbnail: 'https://i.imgur.com/29LVG3uh.jpg',
      title: 'PastLeo.me',
      href: 'https://github.com/pastleo/pastleo.me',
      details: [
        '你現在看到的這個網站，其 /about 頁面可以直接轉成 PDF 列印',
        '使用 Next.js / React 搭建，並使用靜態網站生成方式佈署',
      ],
    }, {
      thumbnail: 'https://i.imgur.com/5ZGLxyXh.png',
      title: '帆船與海',
      href: 'https://static.pastleo.me/webgl-ironman/06-boat-ocean.html',
      details: [
        'iThome 鐵人賽 2021 鐵人賽帶著讀者撰寫之成果',
        '用純 WebGL 實做，讀取帆船 .obj 3D 模型檔案並加入陰影、水面倒影、反光等效果',
      ],
    }, {
      thumbnail: 'https://i.imgur.com/zKbyfs3h.png',
      title: '3D 太空跳棋',
      href: 'https://static.pastleo.me/webgl-practice/10-diamond-chinese-checkers.html',
      details: [
        '用純 WebGL 實做的跳棋遊戲，讓三位玩家進行對戰',
        '使用 shader 技巧渲染星空',
      ],
    }],
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

