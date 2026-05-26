document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navCategorias = document.getElementById('nav-categorias');
  if (!hamburger || !navCategorias) return;

  hamburger.addEventListener('click', () => {
    navCategorias.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  document.querySelectorAll('#nav-categorias a').forEach(link => {
    link.addEventListener('click', () => {
      navCategorias.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
});

// Dark mode
(function() {
  var html = document.documentElement;
  var logo = document.querySelector('.logo');
  var saved = localStorage.getItem('eco-theme') || 'light';
  html.setAttribute('data-theme', saved);

  function updateLogo(theme) {
    if (!logo) return;
    logo.src = theme === 'dark' ? '/imagens/logo-darkmode.svg' : '/imagens/GENERATIONN.svg';
  }

  updateLogo(saved);

  var btn = document.getElementById('darkToggle');
  if (btn) {
    btn.addEventListener('click', function() {
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('eco-theme', next);
      updateLogo(next);
    });
  }
})();
