const { profile, works } = window.PORTFOLIO_DATA;

function nav(active = "home", workTitle = "") {
  const isAbout = active === "about";
  const isWork = active !== "home" && active !== "about";
  return `
    <header class="site-nav" aria-label="Primary navigation">
      <a class="nav-link nav-home ${active === "home" ? "is-active" : ""}" href="#/" data-cursor="link">portfolio</a>
      <a class="nav-link nav-work-main ${isWork ? "is-active" : ""}" href="#/works" data-cursor="link">works</a>
      <a class="nav-link nav-about ${isAbout ? "is-active" : ""}" href="#/about" data-cursor="link">about me</a>
    </header>
  `;
}

function hero() {
  return `
    <section class="hero" aria-label="Portfolio hero">
      <video
        class="hero-video"
        src="./hero-pv.mp4"
        autoplay
        muted
        playsinline
        preload="metadata"
        aria-label="てのひら星座工房 プロモーション映像"
      ></video>
    </section>
  `;
}

function workStack() {
  const scrollStep = 1.75;
  const scrollHeight = ((works.length - 1) * scrollStep + 1.02) * 100;

  return `
    <section class="stack-scroll" style="height: ${scrollHeight}vh">
      <div class="works-heading"><h2>works</h2></div>
      <div class="stack-stage" aria-label="Works">
        ${works.map(workPanel).join("")}
      </div>
    </section>
    <section class="thanks-section">
      <p>OIY.</p>
      <p>Department of Visual Communication Design</p>
      <p>han7191909@gmail.com</p>
    </section>
  `;
}

function workPanel(work, index) {
  const tags = work.tags || ["programming", work.category.toLowerCase()];
  return `
    <article class="work-panel" data-panel-index="${index}" style="z-index: ${
      index + 1
    }">
      <a class="work-hit-area" href="#/work/${work.id}" data-cursor="work" aria-label="${work.title} の詳細を見る">
        <div class="work-info">
          <div class="work-title"><span>#${work.number}</span><strong>${work.title}</strong></div>
          <div class="work-body">
            <div class="work-copy">
              <p>${work.summary}</p>
              <div class="work-tags">${tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
            </div>
            <figure class="work-cover-wrap">
              <img class="work-cover" src="${work.cover}" alt="${work.alt}" loading="lazy" decoding="async" />
            </figure>
          </div>
        </div>
      </a>
    </article>
  `;
}

function detailPage(work) {
  if (work.id === "tenohira-seiza-kobo") {
    return tenohiraDetailPage(work);
  }

  if (work.id === "ai-niwa-dekinai-koto") {
    return aiDetailPage(work);
  }

  if (work.id === "satou-ni-yadoru-katachi") {
    return satouDetailPage(work);
  }

  if (work.id === "typography") {
    return typographyDetailPage(work);
  }

  return `
    ${nav(work.id, work.title)}
    <main class="detail-page">
      <figure class="detail-hero">
        <img src="${work.cover}" alt="${work.alt}" loading="eager" decoding="async" />
      </figure>
      <section class="detail-text">
        <p class="detail-kicker">${work.category} / ${work.date}</p>
        <h1>${work.title}</h1>
        <p>${work.description}</p>
      </section>
      <div class="detail-grid">
        ${work.images
          .map(
            (image) => `
              <figure>
                <img src="${image.src}" alt="${image.alt}" loading="lazy" decoding="async" />
              </figure>
            `,
          )
          .join("")}
      </div>
      <section class="detail-text">
        <p>${work.summary}</p>
        <p>
          展示空間での見え方、画面上の余白、鑑賞者の距離を意識しながら、静かに長く見られる構成を目指しました。
          画像と文章はすべてデータファイルから差し替えできます。
        </p>
      </section>
      ${
        work.video
          ? `<video class="detail-video" src="${work.video}" controls muted playsinline preload="metadata" aria-label="${work.title} の映像"></video>`
          : ""
      }
      <a class="back-link" href="#/" data-cursor="link">Back to Works</a>
    </main>
  `;
}

function aiDetailPage(work) {
  const processImages = [
    { src: "./ai-section-01.png", alt: "AIは、花の匂いを知らない 目的説明" },
    { src: "./ai-section-02.png", alt: "AIは、花の匂いを知らない ターゲット説明" },
    { src: "./ai-section-03.png", alt: "AIは、花の匂いを知らない 作品企画説明" },
  ];

  return `
    ${nav(work.id, work.title)}
    <main class="ai-detail">
      <section class="ai-head">
        <h1>AIは、花の匂いを知らない</h1>
        <div class="ai-meta">
          <p><span>制作時期</span><span>2026.6-</span></p>
          <p><span>授業名</span><span>言葉から発想するクリエイティブ</span></p>
          <p><span>授業課題</span><span>世の中に向けた「メッセージコピー」</span></p>
          <div class="ai-pills"><span>copy</span></div>
        </div>
      </section>

      <section class="ai-poem" aria-label="AIは、花の匂いを知らない 本文">
        <div class="ai-poem-lead ai-reveal" style="--reveal-index: 0">
          <p>AIは、</p>
          <p>花の匂いを知らない、</p>
          <p>風を感じたこともない。</p>
          <p>だから私は、</p>
          <p>人間として存在することに意味があると思う。</p>
        </div>
        <div class="ai-poem-body">
          <p class="ai-reveal" style="--reveal-index: 1">AIはいろんなことを知っている。<br />花の名前も詳しいし、<br />風の仕組みもよくわかっている。</p>
          <p class="ai-reveal" style="--reveal-index: 2">けれど、<br />花の匂いを感じることも、<br />風の気持ちよさを感じたこともない。</p>
          <p class="ai-reveal" style="--reveal-index: 3">そう考えると、<br />人間は、世界を感じるために、<br />遠い彼方から来たんじゃないか。</p>
          <p class="ai-reveal" style="--reveal-index: 4">夕焼けに染まる道を歩きたい。<br />咲き始めた沈丁花の匂いに気づきたい。<br />窓を開けた瞬間に吹き込む風を感じたい。</p>
          <p class="ai-reveal" style="--reveal-index: 5">私たちは、<br />そのような瞬間に心を動かされる。<br />人間が存在する意味なんで、<br />案外そういう瞬間にあるのではないかと思った。</p>
        </div>
      </section>

      <section class="ai-process" aria-label="AIは、花の匂いを知らない 企画説明">
        ${processImages
          .map(
            (image, index) => `
              <figure class="ai-process-image ai-reveal" style="--reveal-index: ${index + 6}">
                <img src="${image.src}" alt="${image.alt}" loading="lazy" decoding="async" />
              </figure>
            `,
          )
          .join("")}
      </section>
    </main>
    <footer class="thanks-section ai-footer">
      <p>OIY.</p>
      <p>Department of Visual Communication Design</p>
      <p>han7191909@gmail.com</p>
    </footer>
  `;
}

function tenohiraDetailPage(work) {
  const slides = [
    { src: "./tenohira-slide-01.png", alt: "手のひら星座工房の体験写真" },
    { src: "./tenohira-slide-02.jpg", alt: "手のひら星座工房のゲーム画面 1" },
    { src: "./tenohira-slide-03.jpg", alt: "手のひら星座工房のゲーム画面 2" },
  ];

  return `
    ${nav(work.id, work.title)}
    <main class="tenohira-detail">
      <section class="tenohira-head">
        <h1>手のひら星座工房</h1>
        <div class="tenohira-meta">
          <p><span>制作時期</span><span>2025.10-12</span></p>
          <p><span>授業制作</span><span>授業名：トイデザイン</span></p>
          <p><span>授業課題</span><span>新しいおもちゃをつくる</span></p>
          <div class="tenohira-pills">
            <span>programming</span>
            <span>game design</span>
          </div>
        </div>
      </section>

      <figure class="tenohira-video-frame">
        <video src="./hero-pv.mp4" muted playsinline preload="metadata" aria-label="手のひら星座工房 ゲームPV"></video>
        <div class="tenohira-video-overlay">
          <button class="tenohira-video-play" type="button" data-cursor="link">ゲームPVを見る</button>
          <p>動画右下の音声をオンにしてご覧ください。</p>
        </div>
      </figure>

      <section class="tenohira-copy-layout">
        <div class="tenohira-game-link">
          <a href="https://han7191909-byte.github.io/toydesign.github.io/" target="_blank" rel="noopener noreferrer" data-cursor="link">ゲームページへ</a>
          <p>ジェスチャー認識にはカメラの使用許可が必要です。</p>
          <p>ブラウザの画面右上に、許可確認が表示されたら許可を選択してお試しください。</p>
        </div>
        <div class="tenohira-copy">
          <section>
            <h2>コンセプト</h2>
            <p>
              ジェスチャー操作によって星座を描く体験型インタラクティブ作品。
              プレイヤーの指先の動きをリアルタイムで解析し、その軌跡を星として可視化することで、点と点がつながり、一つの星座が浮かび上がる。プレイヤーはかたちを手がかりに想像力を広げ、自分だけの物語を描きながら星座を制作していく体験を設計した。
            </p>
          </section>
          <section>
            <h2>発想のきっかけ</h2>
            <p>
              昔話にとって、星たちがゲームは想像力を引き出し、創作の楽しさを感じさせてくれる存在である。
              プログラミングによって身体の動きの軌跡を可視化し、それを星として再構成することで、手の動きそのものが星座の素材になる体験を目指した。
            </p>
          </section>
        </div>
      </section>
    </main>

    <section class="tenohira-night">
      <figure class="tenohira-reveal tenohira-title-image">
        <img src="./tenohira-title.png" alt="手のひら星座工房 タイトルビジュアル" loading="lazy" decoding="async" />
      </figure>

      <section class="tenohira-research" aria-label="手のひら星座工房 作品調査">
        <div class="research-line tenohira-reveal" style="--reveal-index: 0">
          <span class="research-label">課題</span>
          <span class="research-pill research-pill-wide">新しいおもちゃを作る</span>
        </div>
        <div class="research-line tenohira-reveal" style="--reveal-index: 1">
          <span class="research-label">リサーチ</span>
        </div>
        <div class="research-two-column">
          <section class="research-block tenohira-reveal" style="--reveal-index: 2">
            <h3>新しいおもちゃを調査する</h3>
            <div class="research-circles" aria-label="新しさの要素">
              <span>技術・素材の<br />新しさ</span>
              <span>おもちゃの構造<br />ゲームの仕組み</span>
              <span>コンセプト・概念<br />の新しさ</span>
            </div>
            <p>新しいと感じる要素を分解する</p>
          </section>
          <section class="research-block tenohira-reveal" style="--reveal-index: 3">
            <h3>ゲームの世界観を作る</h3>
            <div class="research-image-pair">
              <figure>
                <img src="./tenohira-research-world-01.png" alt="我ら宇宙の塵の舞台写真" loading="lazy" decoding="async" />
                <figcaption>「我ら宇宙の塵」という演劇を見て　感動</figcaption>
              </figure>
              <figure>
                <img src="./tenohira-research-world-02.png" alt="星座と神話のリサーチ画像" loading="lazy" decoding="async" />
                <figcaption>星座は人が星を結び、物語を与えることで生まれた。</figcaption>
              </figure>
            </div>
          </section>
        </div>
        <div class="research-game tenohira-reveal" style="--reveal-index: 4">
          <div>
            <span class="research-label">ゲームを作る</span>
            <div class="research-design-map">
              <div class="research-design-circle">体験デザイン</div>
              <span class="research-design-pill research-design-pill-a">ジェスチャーUI</span>
              <span class="research-design-pill research-design-pill-b">ユーザーの納得感</span>
              <span class="research-design-pill research-design-pill-c">世界観への没入感</span>
            </div>
          </div>
          <div class="research-feedback">
            <h3>ユーザーからのフィードバック重視</h3>
            <p>手のジェスチャー操作指示のわかりやすさ</p>
            <p>カメラによるジェスチャー認識のため、手の位置を把握しやすくする仕組み</p>
            <p class="is-group-break">線の生成アルゴリズム：星座らしい形になるよう接続・切断のルールの設計</p>
            <p>世界観を支える3D空間デザイン</p>
          </div>
        </div>
      </section>

      <section class="tenohira-carousel tenohira-reveal" aria-label="手のひら星座工房 作品写真スライダー">
        <div class="tenohira-carousel-window">
          <div class="tenohira-carousel-track">
            ${slides
              .map(
                (slide) => `
                  <figure class="tenohira-slide">
                    <img src="${slide.src}" alt="${slide.alt}" loading="lazy" decoding="async" />
                  </figure>
                `,
              )
              .join("")}
          </div>
          <div class="tenohira-carousel-controls">
            <button class="tenohira-arrow tenohira-arrow-prev" type="button" aria-label="前の画像" data-cursor="link">
              <span class="arrow-line arrow-line-top"></span>
              <span class="arrow-line arrow-line-bottom"></span>
              <span class="arrow-dot arrow-dot-a"></span>
              <span class="arrow-dot arrow-dot-b"></span>
              <span class="arrow-dot arrow-dot-c"></span>
            </button>
            <button class="tenohira-arrow tenohira-arrow-next" type="button" aria-label="次の画像" data-cursor="link">
              <span class="arrow-line arrow-line-top"></span>
              <span class="arrow-line arrow-line-bottom"></span>
              <span class="arrow-dot arrow-dot-a"></span>
              <span class="arrow-dot arrow-dot-b"></span>
              <span class="arrow-dot arrow-dot-c"></span>
            </button>
          </div>
        </div>
        <div class="tenohira-dots" aria-hidden="true">
          ${slides.map((_, index) => `<span class="${index === 0 ? "is-active" : ""}"></span>`).join("")}
        </div>
      </section>

      <section class="tenohira-tools tenohira-reveal">
        <p>基礎的なステージの構築：p5.js</p>
        <p>音声の動きや演出・視覚効果の調整：Visual Studio Code・Cursor</p>
        <p>コード実装で使用したAI：ChatGPT / Gemini / Cursor / Claude</p>
      </section>
    </section>

    <footer class="thanks-section tenohira-footer">
      <p>OIY.</p>
      <p>Department of Visual Communication Design</p>
      <p>han7191909@gmail.com</p>
    </footer>
  `;
}

function satouDetailPage(work) {
  const temperatures = ["120℃", "125℃", "125℃", "130℃", "135℃", "140℃", "145℃"];
  const floatingImages = temperatures.map((temperature, index) => ({
    src: `./satou-square-${String(index + 1).padStart(2, "0")}.png`,
    alt: `砂糖の結晶写真 ${index + 1}`,
    temperature,
  }));

  return `
    ${nav(work.id, work.title)}
    <main class="satou-detail">
      <section class="satou-hero" aria-label="砂糖に宿る光のかたち">
        <div class="satou-title-block">
          <h1>砂糖に宿る光のかたち</h1>
          <p>Light Residing in Sugar</p>
        </div>
        <div class="satou-floating-grid">
          ${floatingImages
            .map(
              (image, index) => `
                <button class="satou-float-card satou-float-${index + 1}" type="button" data-src="${image.src}" data-alt="${image.alt}" data-cursor="work" style="--float-index: ${index}">
                  <img src="${image.src}" alt="${image.alt}" loading="lazy" decoding="async" />
                  <span>${image.temperature}</span>
                </button>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="satou-intro">
        <figure class="satou-book-image">
          <img src="./satou-intro-display.png" alt="砂糖作品の冊子を開いた展示写真" loading="lazy" decoding="async" />
        </figure>
        <div class="satou-text">
          <p>
            砂糖は加熱によって少しずつ姿を変え、やがて琥珀のように透き通った結晶になり、さらに光にかざすと、ふだんは見えない細かな美しい模様がうかび上がります。
          </p>
          <p>
            温度や固まり方のちがいによって、影の色や形は毎回少しずつ変わり、同じものは二度と生まれません。そこから私は、無限に広がる美しさを感じ取りました。その一瞬ごとの影を一冊の本に集めて、展示にまとめました。
          </p>
          <p>
            私たちが最初に目にする姿は、物の全体像ではないかもしれません。光や水などの媒介を通して、多くのものが想像できない現象として立ち現れるのです。身の回りにある最も日常的なものの中にも、美の可能性がたくさん潜んでいます。
          </p>
        </div>
      </section>

      <div class="satou-image-stack">
        <figure>
          <img src="./satou-layout.png" alt="砂糖作品の紙面展開" loading="lazy" decoding="async" />
        </figure>
        <figure>
          <img src="./satou-display.png" alt="砂糖作品の展示写真" loading="lazy" decoding="async" />
        </figure>
      </div>
    </main>
    <div class="satou-lightbox" aria-hidden="true">
      <button class="satou-lightbox-backdrop" type="button" aria-label="画像を閉じる"></button>
      <img src="" alt="" />
    </div>
    <footer class="thanks-section satou-footer">
      <p>OIY.</p>
      <p>Department of Visual Communication Design</p>
      <p>han7191909@gmail.com</p>
    </footer>
  `;
}

function typographyDetailPage(work) {
  return `
    ${nav(work.id, work.title)}
    <main class="typography-detail">
      <section class="typography-head">
        <h1>Typography</h1>
        <div class="typography-meta">
          <p><span>制作時間</span><span>2024.4-9</span></p>
          <p><span>課題制作</span><span>授業名：タイポグラフィ</span></p>
          <div class="typography-pills">
            <span>typography</span>
            <span>type design</span>
          </div>
        </div>
      </section>

      <figure class="typography-main-image">
        <img src="${work.cover}" alt="${work.alt}" loading="eager" decoding="async" />
      </figure>

      <section class="typography-copy-block">
        <p class="typography-caption">
          ゆく川の流れは 絶えずして しかも元の水にあらず　淀みに浮かぶうたかたは かつ消え　かつ結びて
        </p>
        <div class="typography-concept">
          <h2>コンセプト</h2>
          <p>
            『方丈記』冒頭部分を題材に制作した、開ひらがなの書体。
          </p>
          <p>
            水の流れを通して無常を描く『方丈記』の世界観から着想し、素早く流れるような筆運びと、
            軽やかな線の動きを意識した。一部の線を細く長く伸ばすことで、流れ続ける水の感覚と、形
            をとどめず移ろっていく無常感を表現している。全体としては重さを抑え、軽やかでありながら
            も、文字としての静かな存在感が残る書体を目指した。
          </p>
          <p>
            背景には、中国の青城山で撮影した写真を使用した。
          </p>
        </div>
      </section>

      <div class="typography-image-stack">
        ${work.images
          .map(
            (image) => `
              <figure>
                <img src="${image.src}" alt="${image.alt}" loading="lazy" decoding="async" />
              </figure>
            `,
          )
          .join("")}
      </div>
    </main>
    <footer class="thanks-section typography-footer">
      <p>OIY.</p>
      <p>Department of Visual Communication Design</p>
      <p>han7191909@gmail.com</p>
    </footer>
  `;
}

function aboutPage() {
  return `
    ${nav("about")}
    <main class="about-page">
      <figure class="about-image-block about-image-profile about-reveal" style="--about-delay: 80ms">
        <img src="./about-profile.png" alt="WANG RUIYAO profile information" loading="eager" decoding="async" />
      </figure>
      <figure class="about-image-block about-image-statement about-reveal" style="--about-delay: 280ms">
        <img src="./about-statement.png" alt="新しい体験と技術への興味を原動力に、デザインを通して人の心が動く瞬間を届けたい。" loading="eager" decoding="async" />
      </figure>
      <footer class="thanks-section about-footer about-reveal" style="--about-delay: 520ms">
        <p>OIY.</p>
        <p>Department of Visual Communication Design</p>
        <p>han7191909@gmail.com</p>
      </footer>
    </main>
  `;
}

window.PORTFOLIO_COMPONENTS = {
  aboutPage,
  detailPage,
  hero,
  nav,
  workStack,
};
