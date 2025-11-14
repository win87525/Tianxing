const sections = ['sec1', 'sec2', 'sec3','sec4','sec5','sec6','sec7'];

sections.forEach(section => {
  fetch(`sections/${section}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById(section).innerHTML = html;
    });
});
