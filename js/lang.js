// Language toggle — Spanish (default) / English
// Reads/writes localStorage key 'lang'. Called by the nav toggle button.

(function () {
  function getLang() {
    return localStorage.getItem('lang') || 'es';
  }

  function applyLang(lang) {
    document.querySelectorAll('.lang-es').forEach(function (el) {
      el.style.display = lang === 'es' ? '' : 'none';
    });
    document.querySelectorAll('.lang-en').forEach(function (el) {
      el.style.display = lang === 'en' ? '' : 'none';
    });
    var btn = document.querySelector('.lang-toggle');
    if (btn) btn.textContent = lang === 'es' ? 'EN' : 'ES';
  }

  window.toggleLang = function () {
    var newLang = getLang() === 'es' ? 'en' : 'es';
    localStorage.setItem('lang', newLang);
    applyLang(newLang);
  };

  applyLang(getLang());
})();
