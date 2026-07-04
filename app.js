const { works } = window.PORTFOLIO_DATA || {};
const { aboutPage, detailPage, hero, nav, workStack } = window.PORTFOLIO_COMPONENTS || {};

const app = document.querySelector("#app");
let teardown = () => {};
let autoScrollFrame = 0;
let scrollToWorksAfterRender = false;
let scrollToTopAfterRender = false;
let restoreHomeScrollAfterRender = false;

document.addEventListener("click", handleNavClick);

function render() {
  if (!app || !works || !aboutPage || !detailPage || !hero || !nav || !workStack) return;
  if (autoScrollFrame) {
    cancelAnimationFrame(autoScrollFrame);
    autoScrollFrame = 0;
  }
  teardown();
  const route = window.location.hash.replace(/^#\/?/, "");
  const [page, id] = route.split("/");

  if (page === "about") {
    app.innerHTML = aboutPage();
    teardown = setupCursor();
    return;
  }

  if (page === "work") {
    const work = works.find((item) => item.id === id) || works[0];
    app.innerHTML = detailPage(work);
    setupTenSecondVideoLoop(document.querySelector(".detail-video"));
    const destroyCursor = setupCursor();
    const destroySatou = work.id === "satou-ni-yadoru-katachi" ? setupSatouLightbox() : () => {};
    const destroyTenohira = work.id === "tenohira-seiza-kobo" ? setupTenohiraDetail() : () => {};
    const destroyAi = work.id === "ai-niwa-dekinai-koto" ? setupAiDetail() : () => {};
    teardown = () => {
      destroyCursor();
      destroySatou();
      destroyTenohira();
      destroyAi();
    };
    window.scrollTo(0, 0);
    return;
  }

  app.innerHTML = `${nav("home")}${hero()}${workStack()}`;
  setupTenSecondVideoLoop(document.querySelector(".hero-video"));
  const destroyStack = setupWorkStack();
  const destroyCursor = setupCursor();
  teardown = () => {
    destroyStack();
    destroyCursor();
  };

  if (restoreHomeScrollAfterRender) {
    restoreHomeScrollAfterRender = false;
    requestAnimationFrame(restoreHomeScrollPosition);
    return;
  }

  if (scrollToTopAfterRender) {
    scrollToTopAfterRender = false;
    requestAnimationFrame(() => slowScrollTo(0, 900));
    return;
  }

  if (scrollToWorksAfterRender) {
    scrollToWorksAfterRender = false;
    requestAnimationFrame(scrollToWorks);
  }
}

function handleNavClick(event) {
  const workLink = event.target.closest('a[href^="#/work/"]');
  if (workLink) {
    const route = window.location.hash.replace(/^#\/?/, "");
    if (route === "" || route === "works") {
      saveHomeScrollPosition();
    }
    return;
  }

  const worksLink = event.target.closest(".nav-work-main");
  if (worksLink) {
    event.preventDefault();
    scrollToWorksAfterRender = true;
    scrollToTopAfterRender = false;
    restoreHomeScrollAfterRender = false;
    const route = window.location.hash.replace(/^#\/?/, "");
    if (route === "" || route === "works") {
      if (window.location.hash === "#/works") {
        scrollToWorksAfterRender = false;
        requestAnimationFrame(scrollToWorks);
      } else {
        window.location.hash = "#/works";
      }
    } else {
      window.location.hash = "#/works";
    }
    return;
  }

  const homeLink = event.target.closest(".nav-home");
  if (!homeLink) return;

  event.preventDefault();
  scrollToWorksAfterRender = false;
  scrollToTopAfterRender = true;
  restoreHomeScrollAfterRender = false;
  const route = window.location.hash.replace(/^#\/?/, "");
  if (route.startsWith("work")) {
    scrollToTopAfterRender = false;
    restoreHomeScrollAfterRender = true;
    window.location.hash = "#/";
    return;
  }

  if (route === "" || route === "works") {
    if (window.location.hash === "#/" || window.location.hash === "") {
      scrollToTopAfterRender = false;
      slowScrollTo(0, 900);
    } else {
      window.location.hash = "#/";
    }
  } else {
    window.location.hash = "#/";
  }
}

function saveHomeScrollPosition() {
  try {
    sessionStorage.setItem("portfolioHomeScrollY", String(window.scrollY));
  } catch (_) {}
}

function restoreHomeScrollPosition() {
  let targetTop = 0;
  try {
    targetTop = Number(sessionStorage.getItem("portfolioHomeScrollY")) || 0;
  } catch (_) {}
  window.scrollTo(0, targetTop);
}

function scrollToWorks() {
  const section = document.querySelector(".stack-scroll");
  if (!section) return;
  const targetTop = section.getBoundingClientRect().top + window.scrollY + window.innerHeight * 0.18;
  slowScrollTo(targetTop, 1600);
}

function slowScrollTo(targetTop, duration = 1600) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetTop);
    return;
  }

  const startTop = window.scrollY;
  const distance = targetTop - startTop;
  const startTime = performance.now();
  const ease = (progress) => 1 - Math.pow(1 - progress, 3);

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startTop + distance * ease(progress));
    if (progress < 1) {
      autoScrollFrame = requestAnimationFrame(step);
    } else {
      autoScrollFrame = 0;
    }
  }

  autoScrollFrame = requestAnimationFrame(step);
}

function setupTenSecondVideoLoop(video) {
  if (!video) return;
  const restartAt = 10;
  video.addEventListener("timeupdate", () => {
    if (video.currentTime >= restartAt) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  });
  if (video.play) {
    video.play().catch(() => {});
  }
}

function setupWorkStack() {
  const section = document.querySelector(".stack-scroll");
  const panels = [...document.querySelectorAll(".work-panel")];
  if (!section || panels.length === 0) return () => {};

  let ticking = false;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function update() {
    ticking = false;
    const rect = section.getBoundingClientRect();
    const viewport = window.innerHeight;
    const rootStyle = getComputedStyle(document.documentElement);
    const navHeight = parseFloat(rootStyle.getPropertyValue("--nav-h")) || 58;
    const collapsedRow = parseFloat(rootStyle.getPropertyValue("--work-row-h")) || 64;
    const scrollStep = 1.75;
    const raw = clamp(-rect.top / (viewport * scrollStep), 0, panels.length - 1);
    const stageHeight = Math.max(1, viewport - navHeight);
    const expandedInfo = Math.max(360, stageHeight - 8);
    document.documentElement.classList.toggle("is-work-mode", raw > 0.08);

    panels.forEach((panel, index) => {
      const local = raw - index;
      const incoming = clamp(local + 1, 0, 1);
      const covered = clamp(raw - index, 0, 1);
      const isFirst = index === 0;
      const visualCovered = isFirst ? clamp((covered - 0.18) / 0.82, 0, 1) : covered;

      const stackedOffset = index * collapsedRow;
      const y = isFirst ? 0 : stackedOffset + (1 - incoming) * (stageHeight - stackedOffset);
      const infoSize = expandedInfo - covered * (expandedInfo - collapsedRow);
      const titleScale = 1 - covered * 0.5;
      const titleCol = 64 - covered * 32;
      const titleGap = 18 - covered * 9;
      const padY = 20 - covered * 14;
      const padX = 48 - covered * 24;
      const padBottom = 22 - covered * 16;
      const workBlur = visualCovered * 22;
      const bodyVisibility = Math.max(0.12, 1 - visualCovered * 0.88);

      panel.style.setProperty("--panel-y", `${y}px`);
      panel.style.setProperty("--info-size", `${infoSize}px`);
      panel.style.setProperty("--title-scale", titleScale.toFixed(3));
      panel.style.setProperty("--title-col", `${titleCol}px`);
      panel.style.setProperty("--title-gap", `${titleGap}px`);
      panel.style.setProperty("--info-pad-y", `${padY}px`);
      panel.style.setProperty("--info-pad-x", `${padX}px`);
      panel.style.setProperty("--info-pad-bottom", `${padBottom}px`);
      panel.style.setProperty("--work-blur", `${workBlur.toFixed(2)}px`);
      panel.style.setProperty("--body-visibility", bodyVisibility);
      panel.classList.toggle("is-covered", covered > 0.04);
      panel.classList.toggle("is-current", local >= -0.02 && local < 0.98);
    });
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  return () => {
    window.removeEventListener("scroll", requestUpdate);
    window.removeEventListener("resize", requestUpdate);
    document.documentElement.classList.remove("is-work-mode");
  };
}

function setupAiDetail() {
  return setupScrollProgressReveal(".ai-reveal");
}

function setupScrollProgressReveal(selector) {
  const revealItems = [...document.querySelectorAll(selector)];
  if (revealItems.length === 0) return () => {};
  let raf = 0;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function update() {
    const viewport = window.innerHeight || 1;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    revealItems.forEach((item, index) => {
      if (reduceMotion) {
        item.style.setProperty("--reveal-progress", "1");
        return;
      }
      const rect = item.getBoundingClientRect();
      const stagger = (Number.parseFloat(item.style.getPropertyValue("--reveal-index")) || index) * 0.025;
      const raw = (viewport * 0.92 - rect.top) / (viewport * 0.52);
      const progress = clamp(raw - stagger, 0, 1);
      item.style.setProperty("--reveal-progress", progress.toFixed(3));
    });
    raf = requestAnimationFrame(update);
  }

  update();
  return () => {
    cancelAnimationFrame(raf);
  };
}

function setupTenohiraDetail() {
  const revealItems = [...document.querySelectorAll(".tenohira-reveal")];
  const video = document.querySelector(".tenohira-video-frame video");
  const playButton = document.querySelector(".tenohira-video-play");
  const carousel = document.querySelector(".tenohira-carousel");
  const track = carousel && carousel.querySelector(".tenohira-carousel-track");
  const slides = carousel ? [...carousel.querySelectorAll(".tenohira-slide")] : [];
  const prev = carousel && carousel.querySelector(".tenohira-arrow-prev");
  const next = carousel && carousel.querySelector(".tenohira-arrow-next");
  const dots = carousel ? [...carousel.querySelectorAll(".tenohira-dots span")] : [];
  let active = 0;
  let revealRaf = 0;

  if (video && playButton) {
    playButton.addEventListener("click", () => {
      video.controls = true;
      video.play().catch(() => {});
      playButton.classList.add("is-hidden");
      playButton.closest(".tenohira-video-overlay")?.classList.add("is-hidden");
    });
  }

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function updateRevealProgress() {
    const viewport = window.innerHeight || 1;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    revealItems.forEach((item, index) => {
      if (reduceMotion) {
        item.style.setProperty("--reveal-progress", "1");
        return;
      }
      const rect = item.getBoundingClientRect();
      const stagger = (Number.parseFloat(item.style.getPropertyValue("--reveal-index")) || index) * 0.045;
      const raw = (viewport * 0.96 - rect.top) / (viewport * 0.48);
      const progress = clamp(raw - stagger, 0, 1);
      item.style.setProperty("--reveal-progress", progress.toFixed(3));
    });
    revealRaf = requestAnimationFrame(updateRevealProgress);
  }

  revealItems.forEach((item) => {
    if (!item.style.getPropertyValue("--reveal-progress")) {
      item.style.setProperty("--reveal-progress", "0");
    }
  });
  updateRevealProgress();

  function updateCarousel() {
    if (!track || slides.length === 0) return;
    track.style.transform = `translate3d(${-active * 100}%, 0, 0)`;
    dots.forEach((dot, index) => dot.classList.toggle("is-active", index === active));
  }

  function go(direction) {
    if (slides.length === 0) return;
    active = (active + direction + slides.length) % slides.length;
    updateCarousel();
  }

  if (prev && next) {
    prev.addEventListener("click", () => go(-1));
    next.addEventListener("click", () => go(1));
  }
  updateCarousel();

  return () => {
    cancelAnimationFrame(revealRaf);
  };
}

function setupSatouLightbox() {
  const lightbox = document.querySelector(".satou-lightbox");
  const lightboxImage = lightbox && lightbox.querySelector("img");
  const backdrop = lightbox && lightbox.querySelector(".satou-lightbox-backdrop");
  const cards = [...document.querySelectorAll(".satou-float-card")];
  if (!lightbox || !lightboxImage || !backdrop || cards.length === 0) return () => {};

  function open(card) {
    lightboxImage.src = card.dataset.src || "";
    lightboxImage.alt = card.dataset.alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("has-satou-lightbox");
    document.documentElement.dataset.cursor = "";
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("has-satou-lightbox");
    document.documentElement.dataset.cursor = "";
  }

  function handleKeydown(event) {
    if (event.key === "Escape") close();
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => open(card));
  });
  backdrop.addEventListener("click", close);
  lightboxImage.addEventListener("click", close);
  window.addEventListener("keydown", handleKeydown);

  return () => {
    close();
    window.removeEventListener("keydown", handleKeydown);
  };
}

function setupCursor() {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (!canHover || reduceMotion || !dot || !ring) {
    document.documentElement.classList.remove("has-custom-cursor");
    return () => {};
  }

  document.documentElement.classList.add("has-custom-cursor");

  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let ringX = pointerX;
  let ringY = pointerY;
  let raf = 0;

  function setCursorMode(target) {
    const modeTarget = target && target.closest ? target.closest("[data-cursor], a, button") : null;
    const mode = (modeTarget && modeTarget.dataset.cursor) || (modeTarget ? "link" : "");
    document.documentElement.dataset.cursor = mode;
  }

  function move(event) {
    pointerX = event.clientX;
    pointerY = event.clientY;
    dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
    setCursorMode(event.target);
  }

  function leaveTarget(event) {
    if (!event.relatedTarget || !event.relatedTarget.closest || !event.relatedTarget.closest("[data-cursor], a, button")) {
      document.documentElement.dataset.cursor = "";
    }
  }

  function animate() {
    ringX += (pointerX - ringX) * 0.16;
    ringY += (pointerY - ringY) * 0.16;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    raf = requestAnimationFrame(animate);
  }

  document.addEventListener("pointermove", move);
  document.addEventListener("pointerout", leaveTarget);
  document.addEventListener("pointerleave", () => {
    document.documentElement.dataset.cursor = "";
  });
  raf = requestAnimationFrame(animate);

  return () => {
    document.removeEventListener("pointermove", move);
    document.removeEventListener("pointerout", leaveTarget);
    cancelAnimationFrame(raf);
    document.documentElement.dataset.cursor = "";
  };
}

window.addEventListener("hashchange", render);
render();
