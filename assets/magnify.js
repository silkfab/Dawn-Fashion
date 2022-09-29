// create a container and set the full-size image as its background
const createOverlay = (image, zoomRatio) => {
  overlay = document.createElement('div');
  overlay.setAttribute('class', 'image--full-size');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.backgroundImage = `url('${image.src}')`;
  overlay.style.backgroundSize = `${image.width * zoomRatio}px`;
  return overlay;
};

const goToMousePosition = (image, event) => {
  const ratio = image.height / image.width;
  const container = event.target.getBoundingClientRect();
  const xPosition = event.clientX - container.left;
  const yPosition = event.clientY - container.top;
  const xPercent = `${xPosition / (overlay.clientWidth / 100)}%`;
  const yPercent = `${yPosition / ((overlay.clientWidth * ratio) / 100)}%`;

  // determine what to show in the frame
  overlay.style.backgroundPosition = `${xPercent} ${yPercent}`;
};

const magnify = (image, zoomRatio) => {
  // add full-size image on top of original
  const overlay = createOverlay(image, zoomRatio);
  image.parentElement.insertBefore(overlay, image);

  overlay.onclick = () => overlay.remove();
  overlay.onmouseleave = () => overlay.remove();
  overlay.onmousemove = (event) => goToMousePosition(image, event);
}

const enableZoomOnHover = () => {
  const images = document.querySelectorAll('.image--hover');
  images && images.forEach(image => {
    image.onclick = (event) => {
      magnify(image, 2);
      goToMousePosition(image, event);
    }
  });
}

enableZoomOnHover();

// also enable in theme editor
document.addEventListener('shopify:section:load', () => enableZoomOnHover());
