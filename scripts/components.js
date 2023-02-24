$(document).ready(function () {
  
  const carousels = [];
  $('.carousel').each(function () {
    carousels.push(new Carousel(this));
  });
});

function Carousel(element) {
  const $carousel = $(element);

  function setWidths() {
    const $carouselElements = $carousel.find('.slide');
    const slidesLength = $carouselElements.length;
    const slideWidth = $($carouselElements[0]).width() + 5;
    $carousel.width(slidesLength * slideWidth);
  }

  function onResize() {
    setWidths();
  }

  function addEventListeners() {
    window.addEventListener('resize', onResize);
  }

  function removeEventListeners() {
    window.removeEventListener('resize', onResize);
  }

  function init() {
    setWidths();
    addEventListeners();
  }

  function destroy() {
    removeEventListeners();
  }

  init();
  
}