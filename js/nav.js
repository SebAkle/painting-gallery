// Injects shared header and footer into all pages.
// Each page needs: <div id="site-header"></div> and <div id="site-footer"></div>

(function () {
  const currentPage = location.pathname.split("/").pop() || "index.html";

  function navLink(href, label) {
    const file = href === "/" ? "index.html" : href.replace("/", "") + ".html";
    const isActive =
      currentPage === file ||
      (currentPage === "" && file === "index.html");
    return `<li><a href="${file}"${isActive ? ' class="active"' : ""}>${label}</a></li>`;
  }

  const headerHTML = `
    <header class="site-header">
      <div class="container">
        <div class="site-title"><a href="index.html">Luis Akle Estudio</a></div>
        <nav>
          <ul class="nav-links">
            ${navLink("/", "Home")}
            ${navLink("/gallery", "Gallery")}
            ${navLink("/about", "About")}
            ${navLink("/contact", "Contact")}
          </ul>
        </nav>
        <button class="hamburger" aria-label="Menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  `;

  const year = new Date().getFullYear();
  const footerHTML = `
    <footer class="site-footer">
      <div class="container">
        <p>&copy; ${year} Luis Akle Estudio. Todos los derechos reservados.</p>
      </div>
    </footer>
  `;

  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");

  if (headerEl) headerEl.outerHTML = headerHTML;
  if (footerEl) footerEl.outerHTML = footerHTML;

  // Hamburger toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      hamburger.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen);
    });
  }
})();
