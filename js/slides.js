function initFadeSliders() {
  // 避免重複綁定，已經初始化過就跳過
  document.querySelectorAll('.fade-slider').forEach(slider => {
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

// 第一次 DOM ready 時也跑一次（如果有靜態放輪播）
document.addEventListener('DOMContentLoaded', initFadeSliders);
