// Language toggle — Spanish (default) / English
// Reads/writes localStorage key 'lang'. Called by the nav toggle button.
// Visibility is CSS-driven via html[data-lang], set before first paint by an
// inline <head> script on each page, so dynamically created elements
// (e.g. lightbox content) follow the current language automatically.

(function () {
  function getLang() {
    try {
      return localStorage.getItem('lang') || 'es';
    } catch (e) {
      return 'es';
    }
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
    var btn = document.querySelector('.lang-toggle');
    if (btn) btn.textContent = lang === 'es' ? 'EN' : 'ES';
  }

  window.toggleLang = function () {
    var newLang = getLang() === 'es' ? 'en' : 'es';
    try {
      localStorage.setItem('lang', newLang);
    } catch (e) {}
    applyLang(newLang);
  };

  applyLang(getLang());
})();
