function initFadeSliders() {
  // 避免重複綁定，已經初始化過就跳過
  document.querySelectorAll('.fade-slider').forEach(slider => {
    if (slider.classList.contains('sync8')) return;
    if (slider.dataset.inited === '1') return;
    slider.dataset.inited = '1';

    const slides = slider.querySelectorAll('.fade-slide');
    const nextBtn = slider.querySelector('.fade-next');
    const prevBtn = slider.querySelector('.fade-prev');
    let index = 0;
    let autoTimer = null;

    function showSlide(n) {
      slides.forEach(s => s.classList.remove('active'));
      slides[n].classList.add('active');
    }

    function next() {
      index = (index + 1) % slides.length;
      showSlide(index);
    }

    function prev() {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    }

    nextBtn.addEventListener('click', () => { next(); restartAuto(); });
    prevBtn.addEventListener('click', () => { prev(); restartAuto(); });

    function startAuto() {
      autoTimer = setInterval(next, 6000);
    }

    function restartAuto() {
      clearInterval(autoTimer);
      startAuto();
    }
    startAuto();

    // 拖曳 & 觸控
    let startX = 0;
    let isDown = false;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.clientX;
      clearInterval(autoTimer);
    });

    slider.addEventListener('mouseup', (e) => {
      if (!isDown) return;
      const diff = e.clientX - startX;
      if (diff > 50) prev();
      if (diff < -50) next();
      isDown = false;
      restartAuto();
    });

    slider.addEventListener('mouseleave', () => { isDown = false; });

    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      clearInterval(autoTimer);
    });

    slider.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (diff > 50) prev();
      if (diff < -50) next();
      restartAuto();
    });
  });
}

// 針對sec8的兩側輪播圖同步
function initSec8LinkedSlider() {
  const container = document.querySelector('.sec8 .web');
  if (!container) return;

  const leftSlider = container.querySelector('.left_img_box .fade-slider');
  const rightSlider = container.querySelector('.right_box .fade-slider');

  const leftSlides = leftSlider.querySelectorAll('.fade-slide');
  const rightSlides = rightSlider.querySelectorAll('.fade-slide');

  const leftNext = leftSlider.querySelector('.fade-next');
  const leftPrev = leftSlider.querySelector('.fade-prev');

  const rightNext = rightSlider.querySelector('.fade-next');
  const rightPrev = rightSlider.querySelector('.fade-prev');

  let index = 0;
  let autoTimer = null;

  // ===== 顯示左右同一張 =====
  function showSlide(n) {
    leftSlides.forEach(s => s.classList.remove('active'));
    rightSlides.forEach(s => s.classList.remove('active'));

    leftSlides[n].classList.add('active');
    rightSlides[n].classList.add('active');
  }

  // ===== 控制下一張 =====
  function next() {
    index = (index + 1) % leftSlides.length;
    showSlide(index);
  }

  // ===== 控制上一張 =====
  function prev() {
    index = (index - 1 + leftSlides.length) % leftSlides.length;
    showSlide(index);
  }

  // ===== 自動輪播 =====
  function startAuto() {
    autoTimer = setInterval(next, 6000);
  }

  function restartAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  // ===== 左右按鈕同步 =====
  leftNext.addEventListener('click', () => { next(); restartAuto(); });
  leftPrev.addEventListener('click', () => { prev(); restartAuto(); });

  rightNext.addEventListener('click', () => { next(); restartAuto(); });
  rightPrev.addEventListener('click', () => { prev(); restartAuto(); });

  // ===== 滑動控制（左 / 右任意滑都同步） =====
  function addSwipe(slider) {
    let startX = 0;
    slider.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      clearInterval(autoTimer);
    });
    slider.addEventListener('touchend', e => {
      const diff = e.changedTouches[0].clientX - startX;
      if (diff > 50) prev();
      if (diff < -50) next();
      restartAuto();
    });
  }

  addSwipe(leftSlider);
  addSwipe(rightSlider);

  // ===== 初始化 =====
  showSlide(0);
  startAuto();
}



// 第一次 DOM ready 時也跑一次（如果有靜態放輪播）
document.addEventListener('DOMContentLoaded', () => {
  initFadeSliders(); // 全站輪播
  initSec8LinkedSlider(); // sec8 專用同步輪播
});
