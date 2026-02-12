// Lightbox modal — opens a full-screen overlay with painting image + title.
// Supports: arrow key navigation, Escape to close, click-outside to close.

(function () {
  // Create lightbox DOM
  var overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.innerHTML = [
    '<button class="lightbox-close" aria-label="Close">&times;</button>',
    '<button class="lightbox-prev" aria-label="Previous">&lsaquo;</button>',
    '<button class="lightbox-next" aria-label="Next">&rsaquo;</button>',
    '<img class="lightbox-image" src="" alt="">',
    '<div class="lightbox-title"></div>',
  ].join("");
  document.body.appendChild(overlay);

  var imgEl = overlay.querySelector(".lightbox-image");
  var titleEl = overlay.querySelector(".lightbox-title");
  var closeBtn = overlay.querySelector(".lightbox-close");
  var prevBtn = overlay.querySelector(".lightbox-prev");
  var nextBtn = overlay.querySelector(".lightbox-next");

  var currentItems = [];
  var currentIndex = 0;

  function show(items, index) {
    currentItems = items;
    currentIndex = index;
    update();
    overlay.classList.add("active");
    document.body.classList.add("lightbox-open");

    // Preload adjacent images
    preload(index - 1);
    preload(index + 1);
  }

  function update() {
    var painting = currentItems[currentIndex];
    imgEl.src = "images/paintings/" + painting.file;
    imgEl.alt = painting.title;
    titleEl.textContent = painting.title;

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

  // Expose globally so gallery.js can call it
  window.openLightbox = show;
})();
