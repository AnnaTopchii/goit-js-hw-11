import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import ApiPixabay from './js/ApiPixabay';
import loadMoreBtn from './js/LoadMoreBtn';
import renderGallery from './js/renderGallery';


const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
  
// const loadMoreBtn = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });
const apiPixabay = new ApiPixabay();

searchForm.addEventListener('submit', onSearch);
// loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
   e.preventDefault();

   const input = e.currentTarget.elements.searchQuery.value.trim();

  if (input === '') {
      return Notify.info(`Please, enter what you want to search`);
      };

  apiPixabay.searchQuery = input;
  
//   loadMoreBtn.show();
   apiPixabay.resetPage();
   clearGalleryContainer();
   fetchImages();
 }


function fetchImages() {
  // loadMoreBtn.disable();
  
  return apiPixabay.fetchImages().then((response) => {
    
    const totalHits = response.data.totalHits;

    //appendImagesMarkup(response.data.hits);
    renderGallery(response.data.hits);

   if (totalHits === 0) {
      return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    
    if (galleryContainer.children.length === totalHits) {
          Notify.info(`We're sorry, but you've reached the end of search results.`);
    //        loadMoreBtn.hide();
        } else {
    //        loadMoreBtn.enable();
          Notify.success(`Hooray! We found ${totalHits} images.`);
        }

  });

  } 

// function appendImagesMarkup(hits) {
//   //console.log(hits);
//   galleryContainer.insertAdjacentHTML('beforeend', renderGallery(hits));
// }

function clearGalleryContainer() {
  galleryContainer.innerHTML = '';
}

