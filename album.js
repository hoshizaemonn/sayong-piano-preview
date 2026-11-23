const viewer = document.querySelector('#viewer');
const photos = Array.from(document.querySelectorAll('.enlarge'));
if (viewer && typeof viewer.showModal === 'function') {
  const image = viewer.querySelector('.viewer-image');
  let current = 0;
  function display(index) {
    current = (index + photos.length) % photos.length;
    const photo = photos[current];
    image.src = photo.href;
    image.alt = photo.querySelector('img').alt;
    viewer.querySelector('#viewer-title').textContent = photo.closest('section').querySelector('h2').textContent;
    viewer.querySelector('.count').textContent = (current + 1) + ' / ' + photos.length;
  }
  photos.forEach((photo, index) => photo.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    display(index);
    viewer.showModal();
  }));
  viewer.querySelector('.close-view').addEventListener('click', () => viewer.close());
  viewer.querySelector('.prev').addEventListener('click', () => display(current - 1));
  viewer.querySelector('.next').addEventListener('click', () => display(current + 1));
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      display(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  viewer.addEventListener('click', event => {
    if (event.target === viewer) {
      const rect = viewer.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right ||
          event.clientY < rect.top || event.clientY > rect.bottom) viewer.close();
    }
  });
}
