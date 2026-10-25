import type { Locale } from './site';

interface ResumeEntry {
  // Stable across locales and independent of display order. Keep when editing copy.
  id: string;
}

export interface ResumeLine extends ResumeEntry {
  line: string;
  href?: string;
  bold?: boolean;
}

export type Line = string | ResumeLine;

export interface ExperienceDetail extends ResumeEntry {
  title: string;
  href?: string;
  description?: Line[];
}

export interface Experience extends ResumeEntry {
  where: string;
  href?: string;
  title: string;
  from: string;
  to?: string;
  details?: ExperienceDetail[];
}

export interface Achievement extends ResumeEntry {
  what: string;
  title: string;
  href?: string;
  time: string;
  description?: Line[];
}

export interface Talk extends ResumeEntry {
  event: string;
  title: string;
  href?: string;
  time: string;
  description?: Line[];
}

export interface Education extends ResumeEntry {
  school: string;
  department?: string;
  from: string;
  to: string;
  description?: Line[];
}

export interface SkillGroup extends ResumeEntry {
  category: string;
  items: string[];
}

export interface Showcase extends ResumeEntry {
  title: string;
  thumbnail: string;
  href?: string;
  git?: string;
  description?: string[];
}

export interface Resume {
  pageTitle: string;
  experienceTitle: string;
  experience: Experience[];
  breakBeforeAchievements: boolean;
  achievementTitle: string;
  achievements: Achievement[];
  breakBeforeTalks: boolean;
  talkTitle: string;
  talks: Talk[];
  breakBeforeEducation: boolean;
  educationTitle: string;
  educations: Education[];
  breakBeforeSkills: boolean;
  skillTitle: string;
  skills: SkillGroup[];
  breakBeforeShowcases: boolean;
  showcasesTitle: string;
  showcasesViewAction: string;
  showcasesGitAction: string;
  showcases: Showcase[];
}

const skillItems = {
  frontend: [
    'Javascript / Typescript',
    'React / Next.js / React Native',
    'Three.js / WebGL',
    'DOM API / jQuery',
    'CSS / Tailwind CSS / Bootstrap',
  ],
  backend: [
    'Ruby / Rails',
    'Elixir / Phoenix',
    'Node.js',
    'PostgreSQL',
  ],
  devOps: [
    'Linux / ArchLinux / Ubuntu',
    'Git / Git flow CI/CD',
    'Container (Docker / Podman)',
    'Self-hosted Proxmox / GCP',
  ],
};

const zh: Resume = {
  pageTitle: 'PastLeo 履歷',
  experienceTitle: '經歷',
  experience: [
    {
      where: 'Crypto.com & CronosLabs',
      id: 'crypto-com-cronoslabs',
      href: 'https://cronos.com/',
      title: 'Frontend Engineer',
      from: '2022/3',
      to: '2026/2',
      details: [
        { id: 'defi-gamefi', href: 'https://vvs.finance', title: 'DEX, DeFi & GameFi Web Apps Development' },
        { id: 'nft-marketplace', href: 'https://minted.network', title: 'NFT marketplace Development' },
      ],
    },
    {
      where: 'Freelancer',
      id: 'freelance',
      title: '進修、自我實現',
      from: '2021/2',
      to: '2022/3',
      details: [
        {
          title: 'Cogini 接案',
          id: 'cogini',
          href: 'https://www.cogini.com/',
          description: ['協助 Elixir / Phoenix 專案之開發'],
        },
      ],
    },
    {
      where: '五倍紅寶石',
      id: '5xruby',
      href: 'https://5xruby.com',
      title: '全端工程師',
      from: '2017/2',
      to: '2021/2',
      details: [
        {
          title: 'QuickBuy クイックバイ 電商平台與手機 App',
          id: 'quickbuy',
          href: 'https://play.google.com/store/apps/details?id=com.standardtransaction.quickbuy.rnapp',
          description: [
            '帶領團隊並協助國際客戶開發 MVP (最小可行性產品)',
            '使用 React Native 製作 Android/iOS 跨平台應用程式，並建立 CI/CD 自動化應用程式建置節省開發者時間',
            '後端使用 Ruby on Rails、前端使用 React 作為管理界面前端框架',
          ],
        },
        {
          title: '『美玉姨』之入口介紹網站 (checkcheck.me)',
          id: 'checkcheck',
          href: 'https://www.checkcheck.me/',
          description: [
            '透過 Gatsby — React 靜態網站產生器來建立，與設計師合作開發出美觀並具有 RWD, i18n 之網頁',
          ],
        },
        {
          title: 'Shopmatic 電商平台',
          id: 'shopmatic',
          href: 'https://goshopmatic.com',
          description: [
            '使用 React 改寫商店、管理編輯頁面，並改善使用體驗',
            '使用 Elixir 製作並進行零下線時間的 DB migration 轉換半百萬筆商店頁面',
            '職涯第一個長期維護、開發的 Ruby on Rails 專案',
          ],
        },
      ],
    },
  ],
  breakBeforeAchievements: true,
  achievementTitle: '成就 & 出版品',
  achievements: [
    {
      what: '著作',
      id: 'webgl-book',
      title: '『WebGL — 建構網頁中的 3D 遊戲，從基礎渲染原理、光影到應用』',
      time: '2022/12',
      description: [
        {
          href: 'https://www.tenlong.com.tw/products/9786267146828',
          id: 'publication',
          line: '深智數位(2022) / ISBN: 9786267146828',
          bold: true,
        },
        '延續 iThome 2021 WebGL 系列文章，使用大量範例帶領讀者學習 WebGL。除了畫面渲染的部份之外，在這本書還加入了『遊戲互動』製作教學，設計出『Catch The Wind!』航行遊戲',
      ],
    },
    {
      what: '優選',
      id: 'ithome-2021',
      title: 'iThome 鐵人賽 2021 Modern Web 組',
      href: 'https://ithelp.ithome.com.tw/2020-12th-ironman/articles/3929',
      time: '2022/1',
      description: [
        {
          href: 'https://ithelp.ithome.com.tw/2020-12th-ironman/articles/3929',
          id: 'series',
          line: '主題：如何在網頁中繪製 3D 場景？從 WebGL 的基礎開始說起',
          bold: true,
        },
        '帶領讀者從 WebGL 的基礎 — 畫三角形開始，到 2D/3D transform、光影效果，最後製作出帆船與海的 3D 場景',
      ],
    },
  ],
  breakBeforeTalks: false,
  talkTitle: '講座、課程',
  talks: [
    {
      event: 'ASTRO Camp 7th',
      id: 'astro-camp-7',
      title: 'Javascript 課程講師',
      href: 'https://astro.5xruby.tw/',
      time: '2021/4',
    },
    {
      event: 'ASTRO Camp 6th',
      id: 'astro-camp-6',
      title: 'Javascript 課程講師',
      href: 'https://astro.5xruby.tw/',
      time: '2020/12',
    },
    {
      event: 'ASTRO Camp 5th',
      id: 'astro-camp-5',
      title: 'Javascript 課程講師',
      href: 'https://astro.5xruby.tw/',
      time: '2020/8',
    },
    {
      event: '快速打造專屬你的神手級工具：翻譯・單字卡',
      id: 'chrome-extension-workshop',
      title: 'Chrome 擴充套件工作坊講師',
      href: 'https://www.accupass.com/event/2008061112286765080000',
      time: '2020/8',
    },
    {
      event: 'COSCUP 2020',
      id: 'coscup-2020',
      title: 'ArchLinux installation workshop',
      href: 'https://coscup.org/2020/zh-TW/agenda/KWEMNF',
      time: '2020/8',
    },
    {
      event: 'COSCUP 2019',
      id: 'coscup-2019',
      title: '用 WebRTC 建立半分散式網路',
      href: 'https://coscup.org/2019/en/programs/58fcc6a0-1e5c-4a17-af0a-3e3dfba381c4',
      time: '2019/8',
    },
    {
      event: 'MOPCON 2018',
      id: 'mopcon-2018',
      title: 'WebComponent & lit-html 前端開發新選擇',
      href: 'https://mopcon.org/2018/speaker.php?id=4',
      time: '2018/11',
    },
    {
      event: 'COSCUP 2018',
      id: 'coscup-2018',
      title: '全面使用 archlinux 之旅',
      href: 'https://coscup.org/2018/programs/full-archlinux/',
      time: '2018/8',
    },
    {
      event: 'Ruby & Elixir Conf TW 2018',
      id: 'ruby-elixir-conf-2018',
      title: 'Not familiar with Elixir? Let me do a simple intro in 30 minutes',
      href: 'https://2018.rubyconf.tw/program#pastleo',
      time: '2018/4',
    },
    {
      event: 'SITCON 2016',
      id: 'sitcon-2016',
      title: '客製化我的開發環境並將它開源！',
      href: 'https://sitcon.org/2016/#target-schedule',
      time: '2016/2',
    },
  ],
  breakBeforeEducation: true,
  educationTitle: '學歷',
  educations: [
    {
      school: '國立中興大學',
      id: 'nchu',
      department: '資訊科學與工程學系',
      from: '2012',
      to: '2016',
      description: ['曾於在學期間擔任資訊社社長、學生會資訊管理人員'],
    },
    {
      school: '新北市板橋高中',
      id: 'panchiao-high-school',
      department: '二類組',
      from: '2009',
      to: '2012',
    },
  ],
  breakBeforeSkills: false,
  skillTitle: '技能',
  skills: [
    { id: 'frontend', category: '前端', items: skillItems.frontend },
    { id: 'backend', category: '後端、資料庫', items: skillItems.backend },
    { id: 'devops', category: 'DevOps', items: skillItems.devOps },
  ],
  breakBeforeShowcases: false,
  showcasesTitle: '作品集',
  showcasesViewAction: '查看',
  showcasesGitAction: '原始碼',
  showcases: [
    {
      title: 'PastLeo.me',
      id: 'pastleo-me',
      thumbnail: '/showcase/pastleo-me.jpg',
      href: 'https://pastleo.me',
      git: 'https://github.com/pastleo/pastleo.me',
      description: [
        '個人網站及部落格，履歷頁面可以直接以直式 A4 列印',
        '使用 https://astro.build/ 及 AI 搭建，並使用靜態網站生成方式佈署',
      ],
    },
    {
      title: '帆船與海',
      id: 'boat-ocean',
      thumbnail: '/showcase/boat-ocean.png',
      href: 'https://static.pastleo.me/webgl-ironman/06-boat-ocean.html',
      description: [
        'iThome 鐵人賽 2021 系列文章帶著讀者撰寫之最終成果',
        '用純 WebGL 實做，讀取帆船 .obj 3D 模型檔案並加入陰影、水面倒影、反光等效果',
      ],
    },
    {
      title: '3D 太空跳棋',
      id: 'diamond-checkers',
      thumbnail: '/showcase/diamond-checkers.png',
      href: 'https://static.pastleo.me/webgl-practice/10-diamond-chinese-checkers.html',
      description: [
        '用純 WebGL 實做的跳棋遊戲，讓三位玩家進行對戰',
        '使用 shader 技巧渲染星空',
      ],
    },
    {
      title: 'Unity 小遊戲 - Drifting Sailboat',
      id: 'drifting-sailboat',
      thumbnail: '/showcase/drifting-sailboat.png',
      href: 'https://static.pastleo.me/DriftingSailboat/',
      git: 'https://github.com/pastleo/DriftingSailboat',
      description: [
        '2022 過年期間進行的自我黑客松，深入使用 Unity 並做出此作品',
        '使用空白鍵或是觸控螢幕開帆乘風前進，供玩家挑戰在觸礁之前能夠航行多遠',
      ],
    },
    {
      title: '鱗片球體與鏡面、陰影效果',
      id: 'scale-sphere',
      thumbnail: '/showcase/scale-sphere.png',
      href: 'https://static.pastleo.me/webgl-ironman/05-framebuffer-shadow.html',
      description: [
        'iThome 鐵人賽 2021 系列文章帶著讀者撰寫成果之一',
        '用純 WebGL 實做，讀取圖片 texture 作為球體之顏色、表面細節',
      ],
    },
    {
      title: 'Bazaar 多人連線橫向捲軸',
      id: 'bazaar',
      thumbnail: '/showcase/bazaar.png',
      git: 'https://github.com/pastleo/bazaar',
      description: [
        '與大學朋友發起的小遊戲專案，透過 Websocket 與伺服器連線，接著透過 WebRTC 進行全連接形成多人連線遊戲',
      ],
    },
    {
      title: '五十音練習小工具',
      id: 'kana-vue',
      thumbnail: '/showcase/kana-vue.png',
      href: 'https://static.pastleo.me/kana-vue',
      git: 'https://github.com/pastleo/kana-vue',
      description: [
        '使用 Vue 前端框架製作',
        '除了有 Vue 2 傳統實做方式之外也做了 Vue 3 composotion API 版',
      ],
    },
    {
      title: '圍框框遊戲',
      id: 'squaring-game',
      thumbnail: '/showcase/squaring-game.png',
      href: 'https://static.pastleo.me/squaring-game',
      git: 'https://github.com/pastleo/squaring-game',
      description: [
        '使用 React 實作，此為女友兒時遊戲的復刻版',
        '雙方玩家輪流選擇一個邊進行佔領',
        '當一個格子的最後一個邊被佔領時該格便被該玩家佔領，並且該玩家得 1 分',
        '比賽進行到所有邊、格子皆被佔領時，分數高者獲勝',
      ],
    },
    {
      title: 'unamed-network-demo',
      id: 'unamed-network-demo',
      thumbnail: '/showcase/unamed-network-demo.png',
      git: 'https://github.com/pastleo/unamed-network',
      description: [
        '使用 WebSocket + WebRTC 進行節點連線，透過 Kademlia DHT 演算法形成 p2p 網路',
        '以房間名稱為 DHT hashing 之輸入值，不同使用者只要輸入相同房間名稱即可找到彼此',
        'DEMO 站運用 unamed-network 提供簡易的文字訊息傳輸功能',
      ],
    },
    {
      title: 'unnamed-network-chat-ysync',
      id: 'network-chat-ysync',
      thumbnail: '/showcase/network-chat-ysync.jpg',
      git: 'https://github.com/pastleo/unnamed-network-chat-ysync',
      description: [
        '提供使用者進行 Youtube 影片同步觀看、文字訊息傳輸功能',
        '使用 WebSocket + WebRTC 進行節點連線，形成半分散式 p2p 網路',
        '在 COSCUP 2019 以及技術文章介紹與 DEMO 此半分散式 p2p 網路而製作此專案',
      ],
    },
    {
      title: 'PopKube',
      id: 'popkube',
      thumbnail: '/showcase/popkube.png',
      git: 'https://github.com/pastleo/k8s-challenge-2021',
      description: [
        '使用 Elixir LiveView 製作類似 POPCAT 計數所有使用者總點擊次數，並實現即時同步功能',
        '此專案完成了 Digital Ocean 的 Kubernetes 2021 挑戰，將 Webapp 包成 container，連同資料庫以及 load balancer 等整套系統部署到 Digital Ocean Kubernetes cluster',
      ],
    },
    {
      title: '透過 Webassembly 執行之 Conway’s game of life',
      id: 'wasm-glife',
      thumbnail: '/showcase/wasm-glife.png',
      href: 'https://static.pastleo.me/rs-wasm-glife-20201213',
      git: 'https://github.com/pastleo/rs-wasm-glife',
      description: [
        '康威生命遊戲，根據一定的開關規則進行棋盤模擬並形成 Pattern',
        '使用 Rust 實作並編譯成 Webassembly 使其跑在瀏覽器中並整合 Javascript DOM API 顯示棋盤與使用者互動',
      ],
    },
    {
      title: 'hello-solidity-web',
      id: 'hello-solidity',
      thumbnail: '/showcase/hello-solidity.png',
      href: 'https://static.pastleo.me/hello-solidity-web',
      git: 'https://github.com/pastleo/hello-solidity-web',
      description: [
        '使用 Solidity 製作運作於 Ethereum 的 smart contract',
        '在鏈上以錢包帳號為 key、讀寫對應此帳號的字串資料，來嘗試以及測試智能合約所提供之功能',
        '使用者只需 Metamask 即可在網頁上進行操作',
      ],
    },
    {
      title: '讓 HowHow 替說你想說的話',
      id: 'howhow-speak',
      thumbnail: '/showcase/howhow-speak.png',
      git: 'https://github.com/pastleo/howhow_speak',
      description: ['使用 Elixir / Phoenix 製作'],
    },
  ],
};

const en: Resume = {
  pageTitle: 'PastLeo Resume',
  experienceTitle: 'Experience',
  experience: [
    {
      id: 'crypto-com-cronoslabs',
      where: 'Crypto.com & CronosLabs',
      href: 'https://cronos.com/',
      title: 'Frontend Engineer',
      from: '2022/3',
      to: '2026/2',
      details: [
        { ...byId(byId(zh.experience, 'crypto-com-cronoslabs').details, 'defi-gamefi') },
        { ...byId(byId(zh.experience, 'crypto-com-cronoslabs').details, 'nft-marketplace') },
      ],
    },
    {
      where: 'Freelancer',
      title: 'Advanced studies, Self-fullfillment',
      id: 'freelance',
      from: '2021/2',
      details: [
        {
          title: 'Cases from Cogini',
          id: 'cogini',
          href: 'https://www.cogini.com/',
          description: ['Assisting in the development of Elixir / Phoenix web application'],
        },
      ],
    },
    {
      where: '5xRuby',
      id: '5xruby',
      href: 'https://5xruby.com',
      title: 'Full-stack Engineer',
      from: '2017/2',
      to: '2021/2',
      details: [
        {
          title: 'QuickBuy クイックバイ Mobile App and E-commerce Platform',
          id: 'quickbuy',
          href: 'https://play.google.com/store/apps/details?id=com.standardtransaction.quickbuy.rnapp',
          description: [
            'Led the team and worked with foreign partner building MVP',
            'Constructed corss-platform mobile app by using React Native for Android/iOS',
            'Established CI/CD to automate app builds and improve efficiency for the team',
            'Used Ruby on Rails server with React frontend for management web interface',
          ],
        },
        {
          title: 'Landing page of Auntie Meiyu (checkcheck.me)',
          id: 'checkcheck',
          href: 'https://www.checkcheck.me/',
          description: [
            'Built with Gatsby, a react static-site generator',
            'Collaborated with designers creating an aesthetic page with RWD and i18n',
          ],
        },
        {
          title: 'Shopmatic E-commerce Platform',
          id: 'shopmatic',
          href: 'https://goshopmatic.com',
          description: [
            'Rewrote pages of the store and management by React to improve frontend maintainability as well as user experience',
            'Modernized frontend assets bundling and increased working efficiency of the team',
            'Implemented a continuous migration service in Elixir to perform zero down-time database migration of a half million store pages',
            'First long-term supporting and development Ruby on Rails project of career',
          ],
        },
      ],
    },
  ],
  breakBeforeAchievements: false,
  achievementTitle: 'Achievement & Publication',
  achievements: [
    {
      what: 'Author of',
      id: 'webgl-book',
      title: '"WebGL — 建構網頁中的 3D 遊戲，從基礎渲染原理、光影到應用"',
      time: '2022/12',
      description: [
        {
          href: 'https://www.tenlong.com.tw/products/9786267146828',
          id: 'publication',
          line: 'Deepmind Digital (2022) / ISBN: 9786267146828',
          bold: true,
        },
        'Based on iThome 2021 WebGL tech posts, guiding readers to learn about WebGL with examples. Additionally, this book comes with tutorials for games development, building a sailing game "Catch The Wind!"',
      ],
    },
    {
      what: 'Merit Award',
      id: 'ithome-2021',
      title: 'iThome Ironman (tech post marathon) 2021, Modern Web',
      href: 'https://ithelp.ithome.com.tw/2020-12th-ironman/articles/3929',
      time: '2022/1',
      description: [
        {
          href: 'https://ithelp.ithome.com.tw/2020-12th-ironman/articles/3929',
          line: 'Topic: How to render 3D scene? starting from WebGL basic',
          id: 'series',
          bold: true,
        },
        'Guide readers from WebGL fundamentals — triangles, 2D/3D transform, lighting and finally build a 3D scene with a sailboat on ocean',
      ],
    },
  ],
  breakBeforeTalks: false,
  talkTitle: 'Talks, Lectures',
  talks: [
    {
      event: 'ASTRO Camp 7th',
      title: 'Javascript Lecturer',
      id: 'astro-camp-7',
      href: 'https://astro.5xruby.tw/',
      time: '2021/4',
    },
    {
      event: 'ASTRO Camp 6th',
      title: 'Javascript Lecturer',
      id: 'astro-camp-6',
      href: 'https://astro.5xruby.tw/',
      time: '2020/12',
    },
    {
      event: 'ASTRO Camp 5th',
      title: 'Javascript Lecturer',
      id: 'astro-camp-5',
      href: 'https://astro.5xruby.tw/',
      time: '2020/8',
    },
    {
      event: 'Building your own tools: Word cards w/ Translation',
      id: 'chrome-extension-workshop',
      title: 'Chrome extension workshop lecturer',
      href: 'https://www.accupass.com/event/2008061112286765080000',
      time: '2020/8',
    },
    {
      event: 'COSCUP 2020',
      title: 'ArchLinux installation workshop',
      id: 'coscup-2020',
      href: 'https://coscup.org/2020/zh-TW/agenda/KWEMNF',
      time: '2020/8',
    },
    {
      event: 'COSCUP 2019',
      title: 'Establish a semi-decentralized network using WebRTC',
      id: 'coscup-2019',
      href: 'https://coscup.org/2019/en/programs/58fcc6a0-1e5c-4a17-af0a-3e3dfba381c4',
      time: '2019/8',
    },
    {
      event: 'MOPCON 2018',
      title: 'WebComponent & lit-html: another option for frontend development',
      id: 'mopcon-2018',
      href: 'https://mopcon.org/2018/speaker.php?id=4',
      time: '2018/11',
    },
    {
      event: 'COSCUP 2018',
      title: 'Daily-drive Archlinux',
      id: 'coscup-2018',
      href: 'https://coscup.org/2018/programs/full-archlinux/',
      time: '2018/8',
    },
    {
      event: 'Ruby & Elixir Conf TW 2018',
      title: 'Not familiar with Elixir? Let me do a simple intro in 30 minutes',
      id: 'ruby-elixir-conf-2018',
      href: 'https://2018.rubyconf.tw/program#pastleo',
      time: '2018/4',
    },
    {
      event: 'SITCON 2016',
      title: 'Customize my development environment and make it open source!',
      id: 'sitcon-2016',
      href: 'https://sitcon.org/2016/#target-schedule',
      time: '2016/2',
    },
  ],
  breakBeforeEducation: false,
  educationTitle: 'Education',
  educations: [
    {
      school: 'National Chung Hsing University',
      id: 'nchu',
      department: 'Department of Computer Science and Engineering',
      from: '2012',
      to: '2016',
      description: [
        'Also worked as director of IT club and minister of IT department in student association',
      ],
    },
    {
      school: 'Panchiao Senior High School',
      id: 'panchiao-high-school',
      from: '2009',
      to: '2012',
    },
  ],
  breakBeforeSkills: false,
  skillTitle: 'Skills',
  skills: [
    { id: 'frontend', category: 'Frontend', items: skillItems.frontend },
    { id: 'backend', category: 'Backend, Database', items: skillItems.backend },
    { id: 'devops', category: 'DevOps', items: skillItems.devOps },
  ],
  breakBeforeShowcases: true,
  showcasesTitle: 'Showcases',
  showcasesViewAction: 'View',
  showcasesGitAction: 'Source code',
  showcases: [
    {
      title: 'PastLeo.me',
      thumbnail: '/showcase/pastleo-me.jpg',
      id: 'pastleo-me',
      href: 'https://pastleo.me',
      git: 'https://github.com/pastleo/pastleo.me',
      description: [
        'Personal website and blog; its resume page can be printed in A4 portrait',
        'Built with Astro and AI, deployed by static-site generation',
      ],
    },
    {
      title: 'Sailboat on ocean',
      id: 'boat-ocean',
      thumbnail: '/showcase/boat-ocean.png',
      href: 'https://static.pastleo.me/webgl-ironman/06-boat-ocean.html',
      description: [
        'Final result of iThome Ironman 2021 tech posts',
        'Implemented in WebGL, loading .obj 3D model with shadow, reflection effect',
      ],
    },
    {
      title: '3D chinese checkers in space',
      id: 'diamond-checkers',
      thumbnail: '/showcase/diamond-checkers.png',
      href: 'https://static.pastleo.me/webgl-practice/10-diamond-chinese-checkers.html',
      description: [
        'Using WebGL without library, allowing 3 players to play against each other',
        'Program GPU by creating a special shader to render stars',
      ],
    },
    {
      title: 'Unity mini-game: Drifting Sailboat',
      id: 'drifting-sailboat',
      thumbnail: '/showcase/drifting-sailboat.png',
      href: 'https://static.pastleo.me/DriftingSailboat/',
      git: 'https://github.com/pastleo/DriftingSailboat',
      description: [
        'A deep-dive of Unity during 2022 chinese new year',
        'Hold space key or touch screen to catch the wind',
        'For players to challenge how much score they can get before hitting the rocks',
      ],
    },
    {
      title: 'Sphere covered by scale with mirror and shadow effect',
      id: 'scale-sphere',
      thumbnail: '/showcase/scale-sphere.png',
      href: 'https://static.pastleo.me/webgl-ironman/05-framebuffer-shadow.html',
      description: [
        'One of the results from iThome Ironman 2021 tech posts',
        'Implemented in WebGL, loading image files as sphere texture and surface details',
      ],
    },
    {
      title: 'Bazaar — multi-player platform game',
      id: 'bazaar',
      thumbnail: '/showcase/bazaar.png',
      git: 'https://github.com/pastleo/bazaar',
      description: [
        'Started with college friend. Players connect to server via Websocket first, then connect to others via WebRTC',
      ],
    },
    {
      title: 'Hiragana and katakana practice',
      id: 'kana-vue',
      thumbnail: '/showcase/kana-vue.png',
      href: 'https://static.pastleo.me/kana-vue',
      git: 'https://github.com/pastleo/kana-vue',
      description: [
        'Made with frontend framework: Vue',
        'Despite of Vue 2 implementation, there is also Vue 3 composotion API as well',
      ],
    },
    {
      title: 'Squaring game',
      id: 'squaring-game',
      thumbnail: '/showcase/squaring-game.png',
      href: 'https://static.pastleo.me/squaring-game',
      git: 'https://github.com/pastleo/squaring-game',
      description: [
        "Using React, a remake of girlfriend's childhood game",
        'Two players take turn occupying one edge (1 edge can be shared with 2 cells)',
        "When a cell's last edge is occupied, the player gets 1 point",
        'If all cell, edges are occupied, the player with more points wins',
      ],
    },
    {
      title: 'unamed-network-demo',
      thumbnail: '/showcase/unamed-network-demo.png',
      id: 'unamed-network-demo',
      git: 'https://github.com/pastleo/unamed-network',
      description: [
        'Connection between nodes are established by WebSocket and WebRTC, forming p2p network via Kademlia DHT',
        'Taking room name as input of DHT hashing, users with the same room name will find each other',
        'DEMO site utilizes unamed-network and provides simple text messaging feature',
      ],
    },
    {
      title: 'unnamed-network-chat-ysync',
      thumbnail: '/showcase/network-chat-ysync.jpg',
      id: 'network-chat-ysync',
      href: 'https://static.pastleo.me/unnamed-network-chat-ysync',
      git: 'https://github.com/pastleo/unnamed-network-chat-ysync',
      description: [
        'Allow users to watch Youtube videos in sync and send text messages',
        'Connection between nodes are established by WebSocket and WebRTC, forming semi-decentralized p2p network',
        'For demostration of this semi-decentralized p2p network at COSCUP 2019 and tech post',
      ],
    },
    {
      title: 'PopKube',
      thumbnail: '/showcase/popkube.png',
      id: 'popkube',
      git: 'https://github.com/pastleo/k8s-challenge-2021',
      description: [
        "Using Elixir LiveView, making a webapp like POPCAT, counting all user's clicks with real-time counting sync",
        'This project completed 2021 DigitalOcean Kubernetes challenge, which means whole system including webapp, database and load balancer is containerized and deployed to DigitalOcean Kubernetes cluster',
      ],
    },
    {
      title: 'Conway’s game of life, running on Webassembly',
      id: 'wasm-glife',
      thumbnail: '/showcase/wasm-glife.png',
      href: 'https://static.pastleo.me/rs-wasm-glife-20201213',
      git: 'https://github.com/pastleo/rs-wasm-glife',
      description: [
        'Conway’s game of life is a cellular automaton that each cell follow certain rules and form some pattern',
        'Using Rust to implement and compile into Webassembly to run in browser, also integrated with Javascript DOM providing user interactions',
      ],
    },
    {
      title: 'hello-solidity-web',
      thumbnail: '/showcase/hello-solidity.png',
      id: 'hello-solidity',
      href: 'https://static.pastleo.me/hello-solidity-web',
      git: 'https://github.com/pastleo/hello-solidity-web',
      description: [
        'Smart contract built with Solidity, running on Ethereum',
        'By wallet account as key, read/write its string data accordingly to test out smart contract capabilities',
        'The only thing required is Metamask, then user is able to interact with blockchain on web platform',
      ],
    },
    {
      title: 'Make Youtuber HowHow say what you ask him to',
      id: 'howhow-speak',
      thumbnail: '/showcase/howhow-speak.png',
      git: 'https://github.com/pastleo/howhow_speak',
      description: [
        'Implemented in Elixir / Phoenix',
      ],
    },
  ],
};

// References must resolve explicitly: spreading an undefined .find() result
// would otherwise silently lose dates, URLs, and images.
function byId<T extends ResumeEntry>(items: readonly T[] | undefined, id: string): T {
  const item = items?.find((entry) => entry.id === id);
  if (!item) throw new Error(`Missing resume entry with id "${id}"`);
  return item;
}

function lineById(lines: readonly Line[] | undefined, id: string): ResumeLine {
  return byId(lines?.filter((line): line is ResumeLine => typeof line !== 'string'), id);
}

function validateResume(data: Resume): void {
  const uniqueIds = (items: readonly ResumeEntry[], context: string) => {
    const ids = new Set<string>();
    for (const { id } of items) {
      if (!id || ids.has(id)) throw new Error(`Missing or duplicate resume id "${id}" in ${context}`);
      ids.add(id);
    }
  };
  const lineIds = (lines: Line[] | undefined, context: string) =>
    uniqueIds((lines ?? []).filter((line): line is ResumeLine => typeof line !== 'string'), context);

  for (const section of ['experience', 'achievements', 'talks', 'educations', 'skills', 'showcases'] as const) {
    uniqueIds(data[section], section);
  }
  for (const experience of data.experience) {
    uniqueIds(experience.details ?? [], `experience.${experience.id}.details`);
    for (const detail of experience.details ?? []) lineIds(detail.description, `detail.${detail.id}.description`);
  }
  for (const entry of [...data.achievements, ...data.talks, ...data.educations]) {
    lineIds(entry.description, `${entry.id}.description`);
  }
}

// Draft Japanese translation of the existing Chinese career record. Keep IDs
// stable when editing/reordering entries; lookup order never determines identity.
export function translateJapaneseResume(zh: Resume): Resume {
  validateResume(zh);
  return {
  ...zh,
  pageTitle: 'PastLeo 職務経歴書',
  experienceTitle: '職務経歴',
  experience: [
    {
      ...byId(zh.experience, 'crypto-com-cronoslabs'),
      title: 'フロントエンドエンジニア',
      details: [
        { ...byId(byId(zh.experience, 'crypto-com-cronoslabs').details, 'defi-gamefi'), title: 'DEX・DeFi・GameFi の Web アプリケーション開発' },
        { ...byId(byId(zh.experience, 'crypto-com-cronoslabs').details, 'nft-marketplace'), title: 'NFT マーケットプレイスの開発' },
      ],
    },
    {
      ...byId(zh.experience, 'freelance'),
      where: 'フリーランス',
      title: '技術探究・個人開発',
      details: [
        {
          ...byId(byId(zh.experience, 'freelance').details, 'cogini'),
          title: 'Cogini からの受託開発',
          description: ['Elixir / Phoenix プロジェクトの開発を支援。'],
        },
      ],
    },
    {
      ...byId(zh.experience, '5xruby'),
      where: '五倍紅寶石（5xRuby）',
      title: 'フルスタックエンジニア',
      details: [
        {
          ...byId(byId(zh.experience, '5xruby').details, 'quickbuy'),
          title: 'QuickBuy クイックバイ EC プラットフォーム・モバイルアプリ',
          description: [
            'チームを率い、海外の顧客と協力して MVP（実用最小限の製品）を開発。',
            'React Native で Android / iOS 向けのクロスプラットフォームアプリを構築。CI/CD によるビルド自動化で開発作業を効率化。',
            'バックエンドに Ruby on Rails、管理画面のフロントエンドに React を使用。',
          ],
        },
        {
          ...byId(byId(zh.experience, '5xruby').details, 'checkcheck'),
          title: '「美玉姨」紹介サイト（checkcheck.me）',
          description: ['React ベースの静的サイトジェネレーター Gatsby を使用。デザイナーと協力し、レスポンシブ対応・多言語対応のサイトを制作。'],
        },
        {
          ...byId(byId(zh.experience, '5xruby').details, 'shopmatic'),
          title: 'Shopmatic EC プラットフォーム',
          description: [
            'ストア画面と管理・編集画面を React で刷新し、ユーザー体験を改善。',
            'Elixir で移行処理を実装し、約 50 万件のストアページのデータを無停止で移行。',
            'キャリアで初めて長期的な保守・開発を担当した Ruby on Rails プロジェクト。',
          ],
        },
      ],
    },
  ],
  achievementTitle: '受賞・出版',
  achievements: [
    {
      ...byId(zh.achievements, 'webgl-book'),
      what: '著書',
      description: [
        { ...lineById(byId(zh.achievements, 'webgl-book').description, 'publication'), line: '深智數位（2022 年）/ ISBN: 9786267146828' },
        '2021 年の iThome WebGL 連載をもとに、豊富なサンプルで WebGL を解説。描画に加え、ゲームのインタラクション実装も扱い、帆走ゲーム「Catch The Wind!」を制作。',
      ],
    },
    {
      ...byId(zh.achievements, 'ithome-2021'),
      what: '優選受賞',
      title: 'iThome 鉄人賽 2021 Modern Web 部門',
      description: [
        { ...lineById(byId(zh.achievements, 'ithome-2021').description, 'series'), line: 'テーマ：Web で 3D シーンを描画するには？ WebGL の基礎から' },
        '三角形の描画から始め、2D / 3D 変換、ライティングを解説し、最後に帆船と海の 3D シーンを制作する連載を執筆。',
      ],
    },
  ],
  talkTitle: '登壇・講師',
  talks: [
    { ...byId(zh.talks, 'astro-camp-7'), title: 'JavaScript 講師' },
    { ...byId(zh.talks, 'astro-camp-6'), title: 'JavaScript 講師' },
    { ...byId(zh.talks, 'astro-camp-5'), title: 'JavaScript 講師' },
    { ...byId(zh.talks, 'chrome-extension-workshop'), event: '自分専用の便利ツールを作ろう：翻訳・単語カード', title: 'Chrome 拡張機能ワークショップ講師' },
    { ...byId(zh.talks, 'coscup-2020'), title: 'Arch Linux インストールワークショップ' },
    { ...byId(zh.talks, 'coscup-2019'), title: 'WebRTC で半分散型ネットワークを構築する' },
    { ...byId(zh.talks, 'mopcon-2018'), title: 'WebComponent & lit-html：フロントエンド開発の新たな選択肢' },
    { ...byId(zh.talks, 'coscup-2018'), title: 'Arch Linux を日常的に使うまでの道のり' },
    { ...byId(zh.talks, 'ruby-elixir-conf-2018'), title: 'Elixir を知らない方へ：30 分で紹介' },
    { ...byId(zh.talks, 'sitcon-2016'), title: '開発環境をカスタマイズしてオープンソースに！' },
  ],
  educationTitle: '学歴',
  educations: [
    {
      ...byId(zh.educations, 'nchu'),
      school: '国立中興大学',
      department: '情報科学・工学科',
      description: ['在学中、情報系サークルの代表および学生会の情報管理担当を経験。'],
    },
    { ...byId(zh.educations, 'panchiao-high-school'), school: '新北市立板橋高級中学', department: '理系コース' },
  ],
  skillTitle: 'スキル',
  skills: [
    { ...byId(zh.skills, 'frontend'), category: 'フロントエンド' },
    { ...byId(zh.skills, 'backend'), category: 'バックエンド・データベース' },
    { ...byId(zh.skills, 'devops'), category: 'DevOps' },
  ],
  showcasesTitle: '制作実績',
  showcasesViewAction: 'サイトを見る',
  showcasesGitAction: 'ソースコード',
  showcases: [
    {
      ...byId(zh.showcases, 'pastleo-me'),
      description: [
        '個人サイト・ブログ。履歴書ページを A4 縦で印刷できるよう設計。',
        'https://astro.build/ と AI で構築し、静的サイトとして配信。',
      ],
    },
    {
      ...byId(zh.showcases, 'boat-ocean'), title: '帆船と海',
      description: ['iThome 鉄人賽 2021 の連載で制作した最終成果。', 'ライブラリを使わず WebGL で実装。.obj 形式の帆船モデルを読み込み、影、水面への映り込み、反射を表現。'],
    },
    {
      ...byId(zh.showcases, 'diamond-checkers'), title: '宇宙の 3D ダイヤモンドゲーム',
      description: ['WebGL で実装した、3 人で対戦できるダイヤモンドゲーム。', 'シェーダーを用いて星空を描画。'],
    },
    {
      ...byId(zh.showcases, 'drifting-sailboat'), title: 'Unity ミニゲーム：Drifting Sailboat',
      description: ['2022 年の旧正月に、個人ハッカソンとして Unity を学びながら制作。', 'スペースキーまたはタッチ操作で帆を開いて風に乗り、岩に衝突するまでにどこまで航行できるかに挑戦するゲーム。'],
    },
    {
      ...byId(zh.showcases, 'scale-sphere'), title: '鱗状の球体・鏡面・影の表現',
      description: ['iThome 鉄人賽 2021 の連載で制作した作品の一つ。', 'WebGL で実装し、画像テクスチャで球体の色や表面の細部を表現。'],
    },
    {
      ...byId(zh.showcases, 'bazaar'), title: 'Bazaar：マルチプレイヤー横スクロールゲーム',
      description: ['大学の友人と始めたゲームプロジェクト。WebSocket でサーバーに接続した後、WebRTC でプレイヤー同士をフルメッシュ接続し、マルチプレイを実現。'],
    },
    {
      ...byId(zh.showcases, 'kana-vue'), title: 'ひらがな・カタカナ練習ツール',
      description: ['Vue で制作。', 'Vue 2 の従来の実装に加え、Vue 3 Composition API 版も実装。'],
    },
    {
      ...byId(zh.showcases, 'squaring-game'), title: 'マス取りゲーム',
      description: ['React で、交際相手が子どもの頃に遊んでいたゲームを再現。', '2 人のプレイヤーが交互に辺を一つずつ選んで獲得。', 'マスの最後の辺を取ったプレイヤーがそのマスを獲得し、1 点を得る。', 'すべての辺とマスが埋まった時点で、得点の高いプレイヤーが勝利。'],
    },
    {
      ...byId(zh.showcases, 'unamed-network-demo'),
      description: ['WebSocket + WebRTC でノードを接続し、Kademlia DHT アルゴリズムで P2P ネットワークを構成。', 'ルーム名を DHT のハッシュ入力に使い、同じルーム名を入力したユーザー同士が接続できる仕組みを実装。', 'デモサイトでは unamed-network を使ったシンプルなテキストチャットを提供。'],
    },
    {
      ...byId(zh.showcases, 'network-chat-ysync'),
      description: ['YouTube 動画の同期視聴とテキストチャットを提供。', 'WebSocket + WebRTC でノードを接続し、半分散型の P2P ネットワークを構成。', 'COSCUP 2019 の登壇と技術記事で、このネットワークを紹介・実演するために制作。'],
    },
    {
      ...byId(zh.showcases, 'popkube'),
      description: ['Elixir LiveView で POPCAT のようなアプリを制作。全ユーザーのクリック数を集計し、リアルタイムに同期。', 'DigitalOcean Kubernetes Challenge 2021 の成果物。Web アプリ、データベース、ロードバランサーを含むシステム全体をコンテナ化し、Kubernetes クラスターにデプロイ。'],
    },
    {
      ...byId(zh.showcases, 'wasm-glife'), title: 'WebAssembly で動く Conway’s Game of Life',
      description: ['一定の規則に従ってセルが変化し、パターンを形成するライフゲーム。', 'Rust で実装して WebAssembly にコンパイルし、ブラウザー上で実行。JavaScript DOM API と連携し、盤面の表示とユーザー操作に対応。'],
    },
    {
      ...byId(zh.showcases, 'hello-solidity'),
      description: ['Solidity で Ethereum 上のスマートコントラクトを実装。', 'ウォレットアドレスをキーに文字列データを読み書きし、スマートコントラクトの機能を検証。', 'MetaMask があれば Web ページから操作可能。'],
    },
    {
      ...byId(zh.showcases, 'howhow-speak'), title: 'HowHow に好きな言葉を話してもらうツール',
      description: ['Elixir / Phoenix で制作した。'],
    },
  ],
  };
}

const ja = translateJapaneseResume(zh);
export const resume: Record<Locale, Resume> = { zh, en, ja };
for (const data of Object.values(resume)) validateResume(data);
