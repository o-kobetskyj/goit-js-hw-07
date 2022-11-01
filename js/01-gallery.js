import { galleryItems } from './gallery-items.js';

console.log(galleryItems);
const galleryList = document.querySelector('.gallery');
const galleryMarkup = createMarkupGallery(galleryItems);
galleryList.insertAdjacentHTML('beforeend', galleryMarkup);
galleryList.addEventListener('click', onGalleryItemClick);

function createMarkupGallery(array) {
  return array
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join('');
}

function onGalleryItemClick(event) {
  event.preventDefault();

  const isGalleryItemEl = event.target.classList.contains('gallery__image');
  if (!isGalleryItemEl) {
    return;
  }

  const galleryImage = event.target;
  const galleryImageUrlBig = galleryImage.dataset.source;

  onBasicLightbox(galleryImageUrlBig);
}

let instance = {};

function onBasicLightbox(imgUrl) {
  instance = basicLightbox.create(`<img src="${imgUrl}" width="800" height="600">`, {
    onShow: () => {
      window.addEventListener('keydown', onEscKeyPress);
    },
    onClose: () => {
      window.removeEventListener('keydown', onEscKeyPress);
    },
  });

  instance.show();
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';

  if (event.code === ESC_KEY_CODE) {
    instance.close();
  }
}
