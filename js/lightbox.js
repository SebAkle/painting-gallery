// Lightbox modal — opens a full-screen overlay with painting image + title,
// optional details (medium/size/year), and an "inquire" link to the contact form.
// Supports: arrow key navigation, swipe on touch devices, Escape to close,
// click-outside to close. Focus moves into the dialog on open and back on close.

(function () {
  // Create lightbox DOM
  var overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML = [
    '<button class="lightbox-close" aria-label="Close">&times;</button>',
    '<button class="lightbox-prev" aria-label="Previous">&lsaquo;</button>',
    '<button class="lightbox-next" aria-label="Next">&rsaquo;</button>',
    '<img class="lightbox-image" src="" alt="">',
    '<div class="lightbox-title"></div>',
    '<div class="lightbox-meta"></div>',
    '<a class="lightbox-inquire" href="contact.html"><span class="lang-es">Preguntar por esta obra</span><span class="lang-en">Inquire about this piece</span></a>',
  ].join("");
  document.body.appendChild(overlay);

  var imgEl = overlay.querySelector(".lightbox-image");
  var titleEl = overlay.querySelector(".lightbox-title");
  var metaEl = overlay.querySelector(".lightbox-meta");
  var inquireEl = overlay.querySelector(".lightbox-inquire");
  var closeBtn = overlay.querySelector(".lightbox-close");
  var prevBtn = overlay.querySelector(".lightbox-prev");
  var nextBtn = overlay.querySelector(".lightbox-next");

  var currentItems = [];
  var currentIndex = 0;
  var lastFocused = null;

  function show(items, index, trigger) {
    currentItems = items;
    currentIndex = index;
    lastFocused = trigger || document.activeElement;
    update();
    overlay.classList.add("active");
    document.body.classList.add("lightbox-open");
    closeBtn.focus();

    // Preload adjacent images
    preload(index - 1);
    preload(index + 1);
  }

  function update() {
    var painting = currentItems[currentIndex];
    imgEl.src = "images/paintings/" + painting.file;
    imgEl.alt = painting.title;
    titleEl.textContent = painting.title;

    // Optional details — only shown for entries that have them
    var bits = [];
    if (painting.medium) {
      bits.push(
        '<span class="lang-es">' + painting.medium.es + '</span>' +
        '<span class="lang-en">' + painting.medium.en + '</span>'
      );
    }
    if (painting.size) bits.push(painting.size);
    if (painting.year) bits.push(painting.year);
    metaEl.innerHTML = bits.join(" &middot; ");
    metaEl.style.display = bits.length ? "" : "none";

    inquireEl.href = "contact.html?painting=" + encodeURIComponent(painting.title);

    prevBtn.style.display = currentIndex > 0 ? "" : "none";
    nextBtn.style.display =
      currentIndex < currentItems.length - 1 ? "" : "none";
  }

  function preload(index) {
    if (index >= 0 && index < currentItems.length) {
      var img = new Image();
      img.src = "images/paintings/" + currentItems[index].file;
    }
  }

  function close() {
    overlay.classList.remove("active");
    document.body.classList.remove("lightbox-open");
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  function prev() {
    if (currentIndex > 0) {
      currentIndex--;
      update();
      preload(currentIndex - 1);
    }
  }

  function next() {
    if (currentIndex < currentItems.length - 1) {
      currentIndex++;
      update();
      preload(currentIndex + 1);
    }
  }

  // Event listeners
  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    prev();
  });
  nextBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    next();
  });

  // Click outside image to close
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      close();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (!overlay.classList.contains("active")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") prev();
    else if (e.key === "ArrowRight") next();
  });

  // Swipe navigation on touch devices
  var touchStartX = null;
  overlay.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  overlay.addEventListener("touchend", function (e) {
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) next();
    else prev();
  }, { passive: true });

  // Expose globally so gallery.js can call it
  window.openLightbox = show;
})();
