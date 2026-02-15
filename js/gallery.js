// Renders painting thumbnails from the paintings array (defined in paintings.js).
// On the home page, renders into .gallery-preview (first 6 only).
// On the gallery page, renders into .gallery-grid (all paintings).

(function () {
  function renderPaintings(container, items) {
    items.forEach(function (painting, index) {
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.setAttribute("data-index", index);

      const img = document.createElement("img");
      img.src = "images/paintings/" + painting.file;
      img.alt = painting.title;
      img.loading = "lazy";

      div.appendChild(img);
      container.appendChild(div);

      // Open lightbox on click
      div.addEventListener("click", function () {
        if (typeof openLightbox === "function") {
          openLightbox(items, index);
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
