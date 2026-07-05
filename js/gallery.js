// Renders painting thumbnails from the paintings array (defined in paintings.js).
// On the home page, renders into .gallery-preview (first 6 only).
// On the gallery page, renders into .gallery-grid (all paintings).

(function () {
  function renderPaintings(container, items) {
    items.forEach(function (painting, index) {
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.setAttribute("data-index", index);
      div.setAttribute("role", "button");
      div.setAttribute("tabindex", "0");
      div.setAttribute("aria-label", painting.title);

      const img = document.createElement("img");
      img.src = "images/paintings/" + painting.file;
      img.alt = painting.title;
      img.loading = "lazy";
      // Dimensions encoded in most filenames (e.g. "_683x1024") prevent layout shift
      const dims = painting.file.match(/(\d+)x(\d+)/);
      if (dims) {
        img.width = Number(dims[1]);
        img.height = Number(dims[2]);
      }

      div.appendChild(img);
      container.appendChild(div);

      function open() {
        if (typeof openLightbox === "function") {
          openLightbox(items, index, div);
        }
      }

      div.addEventListener("click", open);
      div.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
  }

  // Full gallery page
  const galleryGrid = document.querySelector(".gallery-grid");
  if (galleryGrid && typeof paintings !== "undefined") {
    renderPaintings(galleryGrid, paintings);
  }

  // Home page preview (first 6)
  const galleryPreview = document.querySelector(".gallery-preview");
  if (galleryPreview && typeof paintings !== "undefined") {
    const previewItems = paintings.slice(0, 6);
    renderPaintings(galleryPreview, previewItems);
  }
})();
