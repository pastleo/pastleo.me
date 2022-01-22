import { Line, createI18n } from './i18n/i18n';

interface Experience {
  where: string;
  href?: string;
  title: string;
  from: string;
  to?: string;
  details?: ExperienceDetail[];
}

interface ExperienceDetail {
  title: string;
  href?: string;
  description?: Line[];
}

interface Achievement {
  what: string;
  title: string;
  href?: string;
  time: string;
  description?: Line[];
}

interface Talk {
  event: string;
  title: string;
  href?: string;
  time: string;
  description?: Line[];
}

interface Education {
  school: string;
  department: string;
  from: string;
  to: string;
  description?: Line[];
}

interface Skill {
  category: string;
  items: string[];
}

interface Showcase {
  thumbnail: string;
  title: string;
  href: string;
  description: string[];
}

const experienceZhRecords: Experience[] = [{
  where: 'SOHO',
  title: '兼職、進修、自我實現',
  from: '2021/2',
  details: [{
    title: 'Unamed World',
    href: 'https://intro.unamed.world/',
    description: [
      '累積一定工作經驗後，嘗試實現進入資訊科技領域時的夢想',
      '獨立開發製作一個讓大家一起在遊戲中創造的遊戲',
      '使用 three.js 渲染 3D 畫面、React 作為 UI 框架',
      '專住在操作方式的開發，尤其是行動觸控裝置',
      '發揮創意在地板作畫，並能將繪製的場景建置成物件製作豐富的場景',
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
      '帶領團隊並協助國際客戶開發 MVP (最小可行性產品)',
      '使用 React Native 製作 Android/iOS 跨平台應用程式',
      '建立 CI/CD 自動化應用程式建置節省開發者時間',
      '後端使用 Ruby on Rails、前端使用 React 作為管理界面前端框架',
    ],
  }, {
    title: 'Shopmatic 電商平台',
    href: 'https://goshopmatic.com',
    description: [
      '使用 React 改寫商店、管理編輯頁面，並改善使用體驗',
      '改善前端建置系統，加快團隊開發效率',
      '職涯第一個長期維護、開發的 Ruby on Rails 專案',
      '使用 Elixir 製作並進行零下線時間的 DB migration 轉換近半百萬筆商店頁面',
    ],
  }],
}];

const achievementZhRecords: Achievement[] = [{
  what: '優選',
  title: 'iThome 鐵人賽 2021 Modern Web 組',
  href: 'https://ithelp.ithome.com.tw/2021ironman/reward',
  time: '2022/1',
  description: [
    {
      href: 'https://ithelp.ithome.com.tw/users/20140099/ironman/3929',
      line: '主題：如何在網頁中繪製 3D 場景？從 WebGL 的基礎開始說起',
      bold: true,
    },
    '帶領讀者從 WebGL 的基礎 — 畫三角形開始，到 2D/3D transform、光影效果，最後製作出帆船與海的 3D 場景',
    '',
    '此系列文章內容將會擴增成冊出版，預計於 2022 秋推出',
  ],
}];

const talkZhRecords: Talk[] = [{
  event: 'ASTRO Camp 7th',
  title: 'Javascript 課程講師',
  href: 'https://astro.5xruby.tw/',
  time: '2021/4',
}, {
  event: 'ASTRO Camp 6th',
  title: 'Javascript 課程講師',
  href: 'https://astro.5xruby.tw/',
  time: '2020/12',
}, {
  event: 'ASTRO Camp 5th',
  title: 'Javascript 課程講師',
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
}];

const educationZhRecords: Education[] = [{
  school: '國立中興大學',
  department: '資訊科學與工程學系',
  from: '2012',
  to: '2016',
  description: [
    '曾於在學期間擔任資訊社社長、學生會資訊管理人員',
  ],
}, {
  school: '新北市板橋高中',
  department: '二類組',
  from: '2009',
  to: '2012',
}];

const skillZhRecords: Skill[] = [{
  category: '前端',
  items: [
    'Javascript / Typescript',
    'React / Next.js / React Native',
    'Three.js / WebGL',
    'DOM API / jQuery',
    'CSS / Tailwind CSS / Bootstrap',
  ],
}, {
  category: '後端、資料庫',
  items: [
    'Ruby / Rails',
    'Elixir / Phoenix',
    'Node.js',
    'PostgreSQL',
  ],
}, {
  category: 'DevOps',
  items: [
    'Linux / ArchLinux / Ubuntu',
    'Git / Git flow CI/CD',
    'Docker / Kubernetes',
    'GCP / Heroku',
  ],
}];

const showcaseZhRecords: Showcase[] = [{
  thumbnail: 'https://i.imgur.com/tEHlwPBh.png',
  title: 'Unamed World',
  href: 'https://intro.unamed.world',
  description: [
    '讓大家一起遊玩創造力的世界',
    '受『讓玩家在遊戲中創造之 minecraft』所啟發',
    '供使用者繪製、調整地面、製作物件以及匯出匯入，並持續開發中',
    '使用 three.js 渲染 3D 畫面、React 作為 UI 框架',
    '採用 WebSocket + WebRTC 所產生的 p2p 網路進行連線',
  ],
}, {
  thumbnail: 'https://i.imgur.com/29LVG3uh.jpg',
  title: 'PastLeo.me',
  href: 'https://github.com/pastleo/pastleo.me',
  description: [
    '你現在看到的這個網站，其 /about 頁面可以直接轉成 PDF 列印',
    '使用 Next.js / React 搭建，並使用靜態網站生成方式佈署',
  ],
}, {
  thumbnail: 'https://i.imgur.com/5ZGLxyXh.png',
  title: '帆船與海',
  href: 'https://static.pastleo.me/webgl-ironman/06-boat-ocean.html',
  description: [
    'iThome 鐵人賽 2021 鐵人賽帶著讀者撰寫之成果',
    '用純 WebGL 實做，讀取帆船 .obj 3D 模型檔案並加入陰影、水面倒影、反光等效果',
  ],
}, {
  thumbnail: 'https://i.imgur.com/zKbyfs3h.png',
  title: '3D 太空跳棋',
  href: 'https://static.pastleo.me/webgl-practice/10-diamond-chinese-checkers.html',
  description: [
    '用純 WebGL 實做的跳棋遊戲，讓三位玩家進行對戰',
    '使用 shader 技巧渲染星空',
  ],
}];

export default createI18n({
  experienceTitle: {
    zh: '經歷',
  },
  experience: {
    zh: experienceZhRecords,
  },
  achievementTitle: {
    zh: '成就',
  },
  achievements: {
    zh: achievementZhRecords,
  },
  talkTitle: {
    zh: '講座、課程',
  },
  talks: {
    zh: talkZhRecords,
  },
  educationTitle: {
    zh: '學歷',
  },
  educations: {
    zh: educationZhRecords,
  },
  skillTitle: {
    zh: '技能',
  },
  skills: {
    zh: skillZhRecords,
  },
  showcasesTitle: {
    zh: '作品集',
  },
  showcasesAction: {
    zh: '查看',
  },
  showcases: {
    zh: showcaseZhRecords,
  },
});
