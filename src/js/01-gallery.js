// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line
const galleryMarkup = createGalleryMarkup(galleryItems);
const galleryRef = document.querySelector('.gallery');
galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          alt="${description}"
        />
      </a>
    </li>
    `;
    })
    .join('');
}

let gallery = new SimpleLightbox('.gallery a');

gallery.options.captionDelay = 250;
gallery.options.captionsData = 'alt';
