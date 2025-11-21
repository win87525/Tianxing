function showSuccessPop() {
  const pop = document.querySelector('.sec12 .pop');
  if (!pop) return;

  // 顯示彈窗
  pop.classList.add('show');

  // 禁止整個網頁滾動
  document.body.style.overflow = 'hidden';

  // 3 秒後自動關閉
  setTimeout(() => {
    pop.classList.remove('show');
    document.body.style.overflow = ''; // 恢復滾動
  }, 3000);
}


document.addEventListener("submit", function(e){
  if (e.target.id === "webForm" || e.target.id === "mobForm"){
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector("button[type='submit']");

    // ❗ 防止多次點擊 — 如果按鈕已經 disabled，就直接 return
    if (submitBtn.disabled) return;

    // ❗ 第一次點擊後立即鎖住按鈕
    submitBtn.disabled = true;
    submitBtn.innerText = "送出中…";

    let name = form.querySelector("input[name='name']").value.trim();
    let phone = form.querySelector("input[name='phone']").value.trim();
    let email = form.querySelector("input[name='email']").value.trim();
    let area = form.querySelector("input[name='area']:checked");

    // === 驗證 ===
    if (!name){
      alert("請填寫姓名");
      resetButton(submitBtn);
      return;
    }
    if (!phone){
      alert("請填寫手機");
      resetButton(submitBtn);
      return;
    }

    let phoneRegex = /^09\d{8}$/;
    if (!phoneRegex.test(phone)){
      alert("手機格式錯誤，請輸入正確的手機號碼（09 開頭 10 碼）");
      resetButton(submitBtn);
      return;
    }

    if (!email){
      alert("請填寫 Email");
      resetButton(submitBtn);
      return;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)){
      alert("Email 格式不正確");
      resetButton(submitBtn);
      return;
    }

    if (!area){
      alert("請選擇需求坪數");
      resetButton(submitBtn);
      return;
    }

    const formData = new FormData(form);

    fetch("https://script.google.com/macros/s/AKfycbxy64_No9sf5YFU2RqCPylWrHwYoMNGwC9QUCgUJTwqBCxd1cDoIj2CFnvZPBvjIbOQ4g/exec", {
      method: "POST",
      body: formData
    })
    .then(r => r.text())
    .then(t => {
     showSuccessPop();
  form.reset();
      resetButton(submitBtn);
    })
    .catch(err => {
      alert("送出失敗，請稍後再試！");
      resetButton(submitBtn);
    });
  }
});

// ⭐ 恢復按鈕
function resetButton(btn){
  btn.disabled = false;
  btn.innerText = "送出";
}
