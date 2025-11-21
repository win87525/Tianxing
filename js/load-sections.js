const sections = [
  "sec1",
  "sec2",
  "sec3",
  "sec4",
  "sec5",
  "sec6",
  "sec7",
  "sec8",
  "sec9",
  "sec10",
  "sec11",
  "sec12",
];

sections.forEach((section) => {
  fetch(`sections/${section}.html`)
    .then((res) => res.text())
    .then((html) => {
      const el = document.getElementById(section);
      if (!el) return; // 防呆
      el.innerHTML = html;

      // 每次載入結束後重新初始化輪播
      initFadeSliders();
      // sec8的特殊輪播function
      initSec8LinkedSlider();
      // sec3的地標置中js
      if (section === "sec3") {
        setTimeout(adjustSec3Scroll, 100);
      }
    });
});
