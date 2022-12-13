import { Line, createI18n } from './i18n/i18n';

interface Experience {
  where: string;
  href?: string;
  title: string;
  from: string;
  to?: string;
  details?: ExperienceDetail[];
  bottomSpace?: 'xs' | 'md' | 'lg';
}

interface ExperienceDetail {
  title: string;
  href?: string;
  description?: Line[];
  bottomSpace?: 'xs' | 'md' | 'lg';
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
  department?: string;
  from: string;
  to: string;
  description?: Line[];
}

interface Skill {
  category: string;
  items: Line[];
}

interface Showcase {
  title: string;
  thumbnail: string;
  href?: string;
  git?: string;
  description?: string[];
}

const experienceZhRecords: Experience[] = [{
  where: 'Crypto.com & CronosLabs',
  title: 'Frontend Engineer',
  from: '2022/3',
  details: [{
    title: 'Defi Apps Development',
  }, {
    title: 'NFT marketplace Development',
  }],
}, {
  where: 'Freelancer',
  title: '進修、自我實現',
  from: '2021/2',
  to: '2022/3',
  details: [{
    title: 'Unamed World',
    href: 'https://intro.unamed.world/',
    description: [
      '累積一定工作經驗後，獨立開發讓大家一起在遊戲中創造的遊戲，實現進入資訊科技領域時的夢想',
      '使用 Typescript 撰寫、Three.js 渲染 3D 畫面、React 作為 UI 框架',
      '專住在操作方式的開發，尤其是行動觸控裝置',
      '發揮創意在地板作畫，並能將繪製的場景建置成物件製作豐富的場景',
    ],
  }, {
    title: 'Cogini 接案',
    href: 'https://www.cogini.com/',
    description: [
      '協助 Elixir / Phoenix 專案之開發',
    ],
  }],
  bottomSpace: 'xs',
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
      '使用 React Native 製作 Android/iOS 跨平台應用程式，並建立 CI/CD 自動化應用程式建置節省開發者時間',
      '後端使用 Ruby on Rails、前端使用 React 作為管理界面前端框架',
    ],
  }, {
    title: '『美玉姨』之入口介紹網站 (checkcheck.me)',
    href: 'https://www.checkcheck.me/',
    description: [
      '透過 Gatsby — React 靜態網站產生器來建立，與設計師合作開發出美觀並具有 RWD, i18n 之網頁',
    ],
  }, {
    title: 'Shopmatic 電商平台',
    href: 'https://goshopmatic.com',
    description: [
      '使用 React 改寫商店、管理編輯頁面，並改善使用體驗',
      '使用 Elixir 製作並進行零下線時間的 DB migration 轉換半百萬筆商店頁面',
      '職涯第一個長期維護、開發的 Ruby on Rails 專案',
    ],
  }],
  bottomSpace: 'xs',
}];

const experienceEnRecords: Experience[] = [{
  where: 'Crypto.com & CronosLabs',
  title: 'Frontend Engineer',
  from: '2022/3',
  details: [{
    title: 'Defi Apps Development',
  }, {
    title: 'NFT marketplace Development',
  }],
}, {
  where: 'Freelancer',
  title: 'Advanced studies, Self-fullfillment',
  from: '2021/2',
  details: [{
    title: 'Unamed World',
    href: 'https://intro.unamed.world/',
    description: [
      'Fulfilling the dream that guide me to CS field after having years of development experience',
      'Have developed an indie game called "Unamed World", a Utopia of player\'s creativity aiming at providing friendly user interaction, especially for mobile devices',
      'By transforming player\'s drawings on terrain into 3D objects, the game allows people to build a realm of inspiration of their own',
      'Using Typescript, Three.js for 3D rendering, React for UI',
    ],
    bottomSpace: 'md',
  }, {
    title: 'Cases from Cogini',
    href: 'https://www.cogini.com/',
    description: [
      'Assisting in the development of Elixir / Phoenix web application',
    ],
    bottomSpace: 'md',
  }],
  bottomSpace: 'lg',
}, {
  where: '5xRuby',
  href: 'https://5xruby.com',
  title: 'Full-stack Engineer',
  from: '2017/2',
  to: '2021/2',
  details: [{
    title: 'QuickBuy クイックバイ Mobile App and E-commerce Platform',
    href: 'https://play.google.com/store/apps/details?id=com.standardtransaction.quickbuy.rnapp',
    description: [
      'Led the team and worked with foreign partner building MVP',
      'Constructed corss-platform mobile app by using React Native for Android/iOS',
      'Established CI/CD to automate app builds and improve efficiency for the team',
      'Used Ruby on Rails server with React frontend for management web interface',
    ],
  }, {
    title: 'Landing page of Auntie Meiyu (checkcheck.me)',
    href: 'https://www.checkcheck.me/',
    description: [
      'Built with Gatsby, a react static-site generator',
      'Collaborated with designers creating an aesthetic page with RWD and i18n',
    ],
  }, {
    title: 'Shopmatic E-commerce Platform',
    href: 'https://goshopmatic.com',
    description: [
      'Rewrote pages of the store and management by React to improve frontend maintainability as well as user experience',
      'Modernized frontend assets bundling and increased working efficiency of the team',
      'Implemented a continuous migration service in Elixir to perform zero down-time database migration of a half million store pages',
      'First long-term supporting and development Ruby on Rails project of career',
    ],
  }],
}];

const achievementZhRecords: Achievement[] = [{
  what: '優選',
  title: 'iThome 鐵人賽 2021 Modern Web 組',
  href: 'https://ithelp.ithome.com.tw/2020-12th-ironman/articles/3929',
  time: '2022/1',
  description: [
    {
      href: 'https://ithelp.ithome.com.tw/2020-12th-ironman/articles/3929',
      line: '主題：如何在網頁中繪製 3D 場景？從 WebGL 的基礎開始說起',
      bold: true,
    },
    '帶領讀者從 WebGL 的基礎 — 畫三角形開始，到 2D/3D transform、光影效果，最後製作出帆船與海的 3D 場景',
    '',
    '此系列文章內容將會擴增成冊出版，預計於 2022 秋推出',
  ],
}];

const achievementEnRecords: Achievement[] = [{
  what: 'Merit Award',
  title: 'iThome Ironman (tech post marathon) 2021, Modern Web',
  href: 'https://ithelp.ithome.com.tw/2020-12th-ironman/articles/3929',
  time: '2022/1',
  description: [
    {
      href: 'https://ithelp.ithome.com.tw/2020-12th-ironman/articles/3929',
      line: 'Topic: How to render 3D scene? starting from WebGL basic',
      bold: true,
    },
    'Guide readers from WebGL fundamentals — triangles, 2D/3D transform, lighting and finally build a 3D scene with a sailboat on ocean',
    '',
    'Content of these 30 tech posts will be extended and publish as book, estimated to be release on fall in 2022',
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
  event: '快速打造專屬你的神手級工具：翻譯・單字卡',
  title: 'Chrome 擴充套件工作坊講師',
  href: 'https://www.accupass.com/event/2008061112286765080000',
  time: '2020/8',
}, {
  event: 'COSCUP 2020',
  title: 'ArchLinux installation workshop',
  href: 'https://coscup.org/2020/zh-TW/agenda/KWEMNF',
  time: '2020/8',
}, {
  event: 'COSCUP 2019',
  title: '用 WebRTC 建立半分散式網路',
  href: 'https://coscup.org/2019/en/programs/58fcc6a0-1e5c-4a17-af0a-3e3dfba381c4',
  time: '2019/8',
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

const talkEnRecords: Talk[] = [{
  event: 'ASTRO Camp 7th',
  title: 'Javascript Lecturer',
  href: 'https://astro.5xruby.tw/',
  time: '2021/4',
}, {
  event: 'ASTRO Camp 6th',
  title: 'Javascript Lecturer',
  href: 'https://astro.5xruby.tw/',
  time: '2020/12',
}, {
  event: 'ASTRO Camp 5th',
  title: 'Javascript Lecturer',
  href: 'https://astro.5xruby.tw/',
  time: '2020/8',
}, {
  event: 'Building your own tools: Word cards w/ Translation',
  title: 'Chrome extension workshop lecturer',
  href: 'https://www.accupass.com/event/2008061112286765080000',
  time: '2020/8',
}, {
  event: 'COSCUP 2020',
  title: 'ArchLinux installation workshop',
  href: 'https://coscup.org/2020/zh-TW/agenda/KWEMNF',
  time: '2020/8',
}, {
  event: 'COSCUP 2019',
  title: 'Establish a semi-decentralized network using WebRTC',
  href: 'https://coscup.org/2019/en/programs/58fcc6a0-1e5c-4a17-af0a-3e3dfba381c4',
  time: '2019/8',
}, {
  event: 'MOPCON 2018',
  title: 'WebComponent & lit-html: another option for frontend development',
  href: 'https://mopcon.org/2018/speaker.php?id=4',
  time: '2018/11',
}, {
  event: 'COSCUP 2018',
  title: 'Daily-drive Archlinux',
  href: 'https://coscup.org/2018/programs/full-archlinux/',
  time: '2018/8',
}, {
  event: 'Ruby & Elixir Conf TW 2018',
  title: 'Not familiar with Elixir? Let me do a simple intro in 30 minutes',
  href: 'https://2018.rubyconf.tw/program#pastleo',
  time: '2018/4',
}, {
  event: 'SITCON 2016',
  title: 'Customize my development environment and make it open source!',
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

const educationEnRecords: Education[] = [{
  school: 'National Chung Hsing University',
  department: 'Department of Computer Science and Engineering',
  from: '2012',
  to: '2016',
  description: [
    'Also worked as director of IT club and minister of IT department in student association',
  ],
}, {
  school: 'Panchiao Senior High School',
  from: '2009',
  to: '2012',
}];

const skills = {
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
    'Docker / Kubernetes',
    'GCP / Heroku',
  ],
};

const skillZhRecords: Skill[] = [{
  category: '前端',
  items: skills.frontend,
}, {
  category: '後端、資料庫',
  items: skills.backend,
}, {
  category: 'DevOps',
  items: skills.devOps,
}];

const skillEnRecords: Skill[] = [{
  category: 'Frontend',
  items: skills.frontend,
}, {
  category: 'Backend, Database',
  items: skills.backend,
}, {
  category: 'DevOps',
  items: skills.devOps,
}];

const showcaseZhRecords: Showcase[] = [{
  title: 'Unamed World',
  thumbnail: 'https://i.imgur.com/tEHlwPBh.png',
  href: 'https://intro.unamed.world',
  git: 'https://github.com/pastleo/unamed-world',
  description: [
    '讓大家一起遊玩創造力的世界',
    '受『讓玩家在遊戲中創造之 minecraft』所啟發',
    '供使用者繪製、調整地面、製作物件以及匯出匯入，並持續開發中',
    '使用 Three.js 渲染 3D 畫面、React 作為 UI 框架，並採用 Typescript 以提昇專案可維護性',
    '採用 WebSocket + WebRTC 所產生的 p2p 網路進行連線',
  ],
}, {
  title: 'PastLeo.me',
  thumbnail: 'https://i.imgur.com/29LVG3uh.jpg',
  href: 'https://pastleo.me',
  git: 'https://github.com/pastleo/pastleo.me',
  description: [
    '個人網站及部落格，也就是你現在看到的這個網站，其 /about 頁面可以直接以直式 A4 列印成為履歷',
    '使用 Next.js / React 搭建，並使用靜態網站生成方式佈署',
  ],
}, {
  title: '帆船與海',
  thumbnail: 'https://i.imgur.com/5ZGLxyXh.png',
  href: 'https://static.pastleo.me/webgl-ironman/06-boat-ocean.html',
  description: [
    'iThome 鐵人賽 2021 系列文章帶著讀者撰寫之最終成果',
    '用純 WebGL 實做，讀取帆船 .obj 3D 模型檔案並加入陰影、水面倒影、反光等效果',
  ],
}, {
  title: '3D 太空跳棋',
  thumbnail: 'https://i.imgur.com/zKbyfs3h.png',
  href: 'https://static.pastleo.me/webgl-practice/10-diamond-chinese-checkers.html',
  description: [
    '用純 WebGL 實做的跳棋遊戲，讓三位玩家進行對戰',
    '使用 shader 技巧渲染星空',
  ],
}, {
  title: 'Unity 小遊戲 - Drifting Sailboat',
  thumbnail: 'https://i.imgur.com/YgI3o5eh.png',
  href: 'https://static.pastleo.me/DriftingSailboat/',
  git: 'https://github.com/pastleo/DriftingSailboat',
  description: [
    '2022 過年期間進行的自我黑客松，深入使用 Unity 並做出此作品',
    '使用空白鍵或是觸控螢幕開帆乘風前進，供玩家挑戰在觸礁之前能夠航行多遠',
  ],
}, {
  title: '鱗片球體與鏡面、陰影效果',
  thumbnail: 'https://i.imgur.com/RI4fRJzh.png',
  href: 'https://static.pastleo.me/webgl-ironman/05-framebuffer-shadow.html',
  description: [
    'iThome 鐵人賽 2021 系列文章帶著讀者撰寫成果之一',
    '用純 WebGL 實做，讀取圖片 texture 作為球體之顏色、表面細節',
  ],
}, {
  title: 'Bazaar 多人連線橫向捲軸',
  thumbnail: 'https://i.imgur.com/s31LuGPh.png',
  href: 'https://bazaar-pre.pastleo.me/',
  git: 'https://github.com/pastleo/bazaar',
  description: [
    '與大學朋友發起的小遊戲專案，透過 Websocket 與伺服器連線，接著透過 WebRTC 進行全連接形成多人連線遊戲',
  ],
}, {
  title: '五十音練習小工具',
  thumbnail: 'https://i.imgur.com/dAfiRheh.png',
  href: 'https://static.pastleo.me/kana-vue',
  git: 'https://github.com/pastleo/kana-vue',
  description: [
    '使用 Vue 前端框架製作',
    '除了有 Vue 2 傳統實做方式之外也做了 Vue 3 composotion API 版',
  ],
}, {
  title: '圍框框遊戲',
  thumbnail: 'https://i.imgur.com/J5tYKxfh.png',
  href: 'https://static.pastleo.me/squaring-game',
  git: 'https://github.com/pastleo/squaring-game',
  description: [
    '使用 React 實作，此為女友兒時遊戲的復刻版',
    '雙方玩家輪流選擇一個邊進行佔領',
    '當一個格子的最後一個邊被佔領時該格便被該玩家佔領，並且該玩家得 1 分',
    '比賽進行到所有邊、格子皆被佔領時，分數高者獲勝',
  ],
}, {
  title: 'unamed-network-demo',
  thumbnail: 'https://i.imgur.com/2YibC9ph.png',
  href: 'https://static.pastleo.me/unamed-network-202201-demo',
  git: 'https://github.com/pastleo/unamed-network',
  description: [
    '使用 WebSocket + WebRTC 進行節點連線，透過 Kademlia DHT 演算法形成 p2p 網路',
    '以房間名稱為 DHT hashing 之輸入值，不同使用者只要輸入相同房間名稱即可找到彼此',
    'DEMO 站運用 unamed-network 提供簡易的文字訊息傳輸功能',
  ],
}, {
  title: 'unnamed-network-chat-ysync',
  thumbnail: 'https://i.imgur.com/VjtceVUh.jpg',
  href: 'https://static.pastleo.me/unnamed-network-chat-ysync',
  git: 'https://github.com/pastleo/unnamed-network-chat-ysync',
  description: [
    '提供使用者進行 Youtube 影片同步觀看、文字訊息傳輸功能',
    '使用 WebSocket + WebRTC 進行節點連線，形成半分散式 p2p 網路',
    '在 COSCUP 2019 以及技術文章介紹與 DEMO 此半分散式 p2p 網路而製作此專案',
  ],
}, {
  title: 'PopKube',
  thumbnail: 'https://i.imgur.com/49amEAqh.png',
  href: 'https://popkube.herokuapp.com/',
  git: 'https://github.com/pastleo/k8s-challenge-2021',
  description: [
    '使用 Elixir LiveView 製作類似 POPCAT 計數所有使用者總點擊次數，並實現即時同步功能',
    '此專案完成了 Digital Ocean 的 Kubernetes 2021 挑戰，將 Webapp 包成 container，連同資料庫以及 load balancer 等整套系統部署到 Digital Ocean Kubernetes cluster',
    '註：挑戰完成後已重新佈署 container 至 Heroku 以節省成本',
  ],
}, {
  title: '透過 Webassembly 執行之 Conway’s game of life',
  thumbnail: 'https://i.imgur.com/QrQvXyUh.png',
  href: 'https://static.pastleo.me/rs-wasm-glife-20201213',
  git: 'https://github.com/pastleo/rs-wasm-glife',
  description: [
    '康威生命遊戲，根據一定的開關規則進行棋盤模擬並形成 Pattern',
    '使用 Rust 實作並編譯成 Webassembly 使其跑在瀏覽器中並整合 Javascript DOM API 顯示棋盤與使用者互動',
  ],
}, {
  title: 'hello-solidity-web',
  thumbnail: 'https://i.imgur.com/eaJMfdoh.png',
  href: 'https://static.pastleo.me/hello-solidity-web',
  git: 'https://github.com/pastleo/hello-solidity-web',
  description: [
    '使用 Solidity 製作運作於 Ethereum 的 smart contract',
    '在鏈上以錢包帳號為 key、讀寫對應此帳號的字串資料，來嘗試以及測試智能合約所提供之功能',
    '使用者只需 Metamask 即可在網頁上進行操作',
  ],
}, {
  title: '讓 HowHow 替說你想說的話',
  thumbnail: 'https://i.imgur.com/3W1iEdwh.png',
  href: 'https://howhow-speak.herokuapp.com',
  git: 'https://github.com/pastleo/howhow_speak',
  description: [
    '使用 Elixir / Phoenix 製作，並佈署到 Heroku',
  ],
}];

const showcaseEnRecords: Showcase[] = [{
  title: 'Unamed World',
  thumbnail: 'https://i.imgur.com/tEHlwPBh.png',
  href: 'https://intro.unamed.world',
  git: 'https://github.com/pastleo/unamed-world',
  description: [
    'A world where people explore creativity together',
    'Inspired by Minecraft, that player can create while playing in-game',
    'A realm can be manipulated by drawing, adjusting terrain, then building into sprite, export and import. While more featuers are comming under development',
    'Using Three.js to render 3D scene, React to render UI and Typescript to enhance maintainability',
    'p2p network is established by WebSocket and WebRTC',
  ],
}, {
  title: 'PastLeo.me',
  thumbnail: 'https://i.imgur.com/29LVG3uh.jpg',
  href: 'https://pastleo.me',
  git: 'https://github.com/pastleo/pastleo.me',
  description: [
    'My blog and intro website that you may be browsing now, its /about page can be printed in A4 portrait as resume',
    'Built with Next.js / React and deployed by static-site generation',
  ],
}, {
  title: 'Sailboat on ocean',
  thumbnail: 'https://i.imgur.com/5ZGLxyXh.png',
  href: 'https://static.pastleo.me/webgl-ironman/06-boat-ocean.html',
  description: [
    'Final result of iThome Ironman 2021 tech posts',
    'Implemented in WebGL, loading .obj 3D model with shadow, reflection effect',
  ],
}, {
  title: '3D chinese checkers in space',
  thumbnail: 'https://i.imgur.com/zKbyfs3h.png',
  href: 'https://static.pastleo.me/webgl-practice/10-diamond-chinese-checkers.html',
  description: [
    'Using WebGL without library, allowing 3 players to play against each other',
    'Program GPU by creating a special shader to render stars',
  ],
}, {
  title: 'Unity mini-game: Drifting Sailboat',
  thumbnail: 'https://i.imgur.com/YgI3o5eh.png',
  href: 'https://static.pastleo.me/DriftingSailboat/',
  git: 'https://github.com/pastleo/DriftingSailboat',
  description: [
    'A deep-dive of Unity during 2022 chinese new year',
    'Hold space key or touch screen to catch the wind',
    'For players to challenge how much score they can get before hitting the rocks',
  ],
}, {
  title: 'Sphere covered by scale with mirror and shadow effect',
  thumbnail: 'https://i.imgur.com/RI4fRJzh.png',
  href: 'https://static.pastleo.me/webgl-ironman/05-framebuffer-shadow.html',
  description: [
    'One of the results from iThome Ironman 2021 tech posts',
    'Implemented in WebGL, loading image files as sphere texture and surface details',
  ],
}, {
  title: 'Bazaar — multi-player platform game',
  thumbnail: 'https://i.imgur.com/s31LuGPh.png',
  href: 'https://bazaar-pre.pastleo.me/',
  git: 'https://github.com/pastleo/bazaar',
  description: [
    'Started with college friend. Players connect to server via Websocket first, then connect to others via WebRTC',
  ],
}, {
  title: 'Hiragana and katakana practice',
  thumbnail: 'https://i.imgur.com/dAfiRheh.png',
  href: 'https://static.pastleo.me/kana-vue',
  git: 'https://github.com/pastleo/kana-vue',
  description: [
    'Made with frontend framework: Vue',
    'Despite of Vue 2 implementation, there is also Vue 3 composotion API as well',
  ],
}, {
  title: 'Squaring game',
  thumbnail: 'https://i.imgur.com/J5tYKxfh.png',
  href: 'https://static.pastleo.me/squaring-game',
  git: 'https://github.com/pastleo/squaring-game',
  description: [
    'Using React, a remake of girlfriend\'s childhood game',
    'Two players take turn occupying one edge (1 edge can be shared with 2 cells)',
    'When a cell\'s last edge is occupied, the player gets 1 point',
    'If all cell, edges are occupied, the player with more points wins',
  ],
}, {
  title: 'unamed-network-demo',
  thumbnail: 'https://i.imgur.com/2YibC9ph.png',
  href: 'https://static.pastleo.me/unamed-network-202201-demo',
  git: 'https://github.com/pastleo/unamed-network',
  description: [
    'Connection between nodes are established by WebSocket and WebRTC, forming p2p network via Kademlia DHT',
    'Taking room name as input of DHT hashing, users with the same room name will find each other',
    'DEMO site utilizes unamed-network and provides simple text messaging feature',
  ],
}, {
  title: 'unnamed-network-chat-ysync',
  thumbnail: 'https://i.imgur.com/VjtceVUh.jpg',
  href: 'https://static.pastleo.me/unnamed-network-chat-ysync',
  git: 'https://github.com/pastleo/unnamed-network-chat-ysync',
  description: [
    'Allow users to watch Youtube videos in sync and send text messages',
    'Connection between nodes are established by WebSocket and WebRTC, forming semi-decentralized p2p network',
    'For demostration of this semi-decentralized p2p network at COSCUP 2019 and tech post',
  ],
}, {
  title: 'PopKube',
  thumbnail: 'https://i.imgur.com/49amEAqh.png',
  href: 'https://popkube.herokuapp.com/',
  git: 'https://github.com/pastleo/k8s-challenge-2021',
  description: [
    'Using Elixir LiveView, making a webapp like POPCAT, counting all user\'s clicks with real-time counting sync',
    'This project completed 2021 DigitalOcean Kubernetes challenge, which means whole system including webapp, database and load balancer is containerized and deployed to DigitalOcean Kubernetes cluster',
    '(*) webapp container is re-deployed to Heroku to reduce cost',
  ],
}, {
  title: 'Conway’s game of life, running on Webassembly',
  thumbnail: 'https://i.imgur.com/QrQvXyUh.png',
  href: 'https://static.pastleo.me/rs-wasm-glife-20201213',
  git: 'https://github.com/pastleo/rs-wasm-glife',
  description: [
    'Conway’s game of life is a cellular automaton that each cell follow certain rules and form some pattern',
    'Using Rust to implement and compile into Webassembly to run in browser, also integrated with Javascript DOM providing user interactions',
  ],
}, {
  title: 'hello-solidity-web',
  thumbnail: 'https://i.imgur.com/eaJMfdoh.png',
  href: 'https://static.pastleo.me/hello-solidity-web',
  git: 'https://github.com/pastleo/hello-solidity-web',
  description: [
    'Smart contract built with Solidity, running on Ethereum',
    'By wallet account as key, read/write its string data accordingly to test out smart contract capabilities',
    'The only thing required is Metamask, then user is able to interact with blockchain on web platform',
  ],
}, {
  title: 'Make Youtuber HowHow say what you ask him to',
  thumbnail: 'https://i.imgur.com/3W1iEdwh.png',
  href: 'https://howhow-speak.herokuapp.com',
  git: 'https://github.com/pastleo/howhow_speak',
  description: [
    'Implemented in Elixir / Phoenix, the webapp is deployed to Heroku',
  ],
}];

export default createI18n({
  experienceTitle: {
    zh: '經歷',
    en: 'Experience',
  },
  experience: {
    zh: experienceZhRecords,
    en: experienceEnRecords,
  },
  pageBreakBeforeAchievement: {
    zh: true,
    en: false,
  },
  achievementTitle: {
    zh: '成就',
    en: 'Achievement',
  },
  achievements: {
    zh: achievementZhRecords,
    en: achievementEnRecords,
  },
  pageBreakBeforeTalk: {
    zh: false,
    en: false,
  },
  talkTitle: {
    zh: '講座、課程',
    en: 'Talks, Lectures',
  },
  talks: {
    zh: talkZhRecords,
    en: talkEnRecords,
  },
  pageBreakBeforeEducation: {
    zh: true,
    en: false,
  },
  educationTitle: {
    zh: '學歷',
    en: 'Education',
  },
  educations: {
    zh: educationZhRecords,
    en: educationEnRecords,
  },
  pageBreakBeforeSkill: {
    zh: false,
    en: false,
  },
  skillTitle: {
    zh: '技能',
    en: 'Skills',
  },
  skills: {
    zh: skillZhRecords,
    en: skillEnRecords,
  },
  pageBreakBeforeShowcases: {
    zh: false,
    en: true,
  },
  showcasesTitle: {
    zh: '作品集',
    en: 'Showcases',
  },
  showcasesViewAction: {
    zh: '查看',
    en: 'View',
  },
  showcasesGitAction: {
    zh: '原始碼',
    en: 'Source code',
  },
  showcases: {
    zh: showcaseZhRecords,
    en: showcaseEnRecords,
  },
});
