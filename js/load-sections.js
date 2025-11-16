const sections = ['sec1', 'sec2', 'sec3', 'sec4', 'sec5', 'sec6', 'sec7', 'sec8', 'sec9', 'sec11'];

sections.forEach(section => {
  fetch(`sections/${section}.html`)
    .then(res => res.text())
    .then(html => {
      const el = document.getElementById(section);
      if (!el) return;  // 防呆
      el.innerHTML = html;

      // ⭐⭐ 每次載入結束後重新初始化輪播
      initFadeSliders(); 
    });
});
