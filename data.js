const profile = {
  romanName: "WANG RUIYAO",
  kanaName: "オウ イッヨウ",
  school: "武蔵野美術大学 視覚伝達デザイン学科3年生",
  portrait: "./assets/profile-placeholder.jpg",
  bio:
    "ジェスチャー操作によって星座を描く体験型インタラクティブ作品、Web、タイポグラフィを中心に制作しています。小さな身体感覚や記憶の断片から、静かに手元へ残る視覚体験を探っています。",
  skills: ["Art Direction", "Interaction Design", "Web Design", "Type Design"],
  software: ["Figma", "Illustrator", "Photoshop", "After Effects", "Unity"],
  contact: "ruiyao@example.com",
};

const works = [
  {
    id: "tenohira-seiza-kobo",
    number: "1",
    title: "てのひら星座工房",
    category: "Game Design",
    date: "2025.10-12",
    tags: ["gesture UI", "game design"],
    cover: "./assets/work-01-cover.jpg",
    alt: "てのひら星座工房の仮カバー画像",
    summary:
      "指先の動きで星座を描き、手のひらの中に小さな夜空をつくる体験型作品。",
    description:
      "ジェスチャー操作によって星座を描く体験型インタラクティブ作品です。プレイヤーの指先の動きをリアルタイムで解析し、その軌跡を星として可視化することで、身体の小さな動きと夜空のイメージを結びます。",
    images: [
      {
        src: "./assets/detail-01-a.jpg",
        alt: "てのひら星座工房の展示記録用仮画像 1",
      },
      {
        src: "./assets/detail-01-b.jpg",
        alt: "てのひら星座工房の展示記録用仮画像 2",
      },
    ],
    video: "./assets/hero-pv.mp4",
  },
  {
    id: "satou-ni-yadoru-katachi",
    number: "2",
    title: "砂糖に宿る光の形",
    category: "Web Design",
    date: "2025.4-7",
    tags: ["photography", "material study"],
    cover: "./assets/work-03-cover.jpg",
    alt: "砂糖に宿る形の仮カバー画像",
    summary:
      "砂糖の結晶、溶け方、記憶の質感を観察する静かなWebアーカイブ。",
    description:
      "日常的な素材である砂糖を、形、光、記憶の媒体として観察するWeb作品です。写真、短い文章、余白を組み合わせ、結晶が溶けていく時間の層を淡く記録します。",
    images: [
      {
        src: "./assets/detail-03-a.jpg",
        alt: "砂糖に宿る形の詳細用仮画像 1",
      },
      {
        src: "./assets/detail-03-b.jpg",
        alt: "砂糖に宿る形の詳細用仮画像 2",
      },
    ],
  },
  {
    id: "ai-niwa-dekinai-koto",
    number: "3",
    title: "AIは、花の匂いを知らない",
    category: "Web Design",
    date: "2026.5-7",
    tags: ["copy writing", "web design"],
    cover: "./assets/work-02-cover.jpg",
    alt: "AIは、花の匂いを知らないの仮カバー画像",
    summary:
      "自動化できるものと、身体や判断の揺らぎに残るものを扱うWebプロジェクト。",
    description:
      "AIによる生成や判断が日常化する中で、人の手つき、迷い、時間のかかる観察に残る価値を再考するWebデザインです。画面上の余白とゆっくりした遷移で、情報を急がず読むための状態をつくります。",
    images: [
      {
        src: "./assets/detail-02-a.jpg",
        alt: "AIにはできないことの詳細用仮画像 1",
      },
      {
        src: "./assets/detail-02-b.jpg",
        alt: "AIにはできないことの詳細用仮画像 2",
      },
    ],
  },
  {
    id: "typography",
    number: "4",
    title: "タイポグラフィ",
    category: "Type Design",
    date: "2025.4-7",
    tags: ["typography", "type design"],
    cover: "./assets/work-04-cover.jpg",
    alt: "タイポグラフィの仮カバー画像",
    summary:
      "文字の重心、余白、紙面上の沈黙を扱うタイポグラフィ実験。",
    description:
      "文字を情報の器としてだけでなく、紙面上に置かれた物質として捉えるタイポグラフィ制作です。行間、太さ、視線の速度を調整しながら、静かな緊張感のある組版を探りました。",
    images: [
      {
        src: "./assets/typography-01.png",
        alt: "タイポグラフィの詳細用仮画像 1",
      },
      {
        src: "./assets/typography-02.png",
        alt: "タイポグラフィの詳細用仮画像 2",
      },
    ],
  },
];

window.PORTFOLIO_DATA = {
  profile,
  works,
};
