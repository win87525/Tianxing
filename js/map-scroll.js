// 在視窗小於1200px時的縮放地圖，讓地標置中

function adjustSec3Scroll() {
  const sec3 = document.querySelector(".sec3");
  if (!sec3) return;

  // 只在手機版 / 小螢幕時啟動
  if (window.innerWidth <= 1200) {

    // 內容最大可滾動範圍
    const maxScroll = sec3.scrollWidth - sec3.clientWidth;

    // 移動至可滾動距離的 20%（可調整）
    const scrollAmount = maxScroll * 0.55;

    sec3.scrollTo({
      left: scrollAmount,
      behavior: "smooth"
    });

  } else {
    // 回到最左
    sec3.scrollTo({
      left: 0,
      behavior: "smooth"
    });
  }
}
