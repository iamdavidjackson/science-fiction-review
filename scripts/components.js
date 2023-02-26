$(document).ready(function () {
  
  const carousels = [];
  $('.carousel').each(function () {
    carousels.push(new Carousel(this));
  });
});

function Carousel(element) {
  // cache elements and widths
  const $carousel = $(element);
  const $slidesWrapper = $($carousel.find('.slides-wrapper')[0]);
  const $slides = $($carousel.find('.slides')[0]);
  const $slideElements = $slides.find('.slide');
  const numberOfSlides = $slideElements.length;
  const slideWidth = $($slideElements[0]).width() + 4;
  let currentOffset = 0;
  let numberOfSlidesToShow = 0;

  function init() {
    // set the initial width of the slides container
    $slides.width(numberOfSlides * slideWidth);
    // set the widths of the slides elements
    setWidths();
    addButtons();
    addEventListeners();
  }

  function setWidths() {
    const carouselWidth = $carousel.width();
    numberOfSlidesToShow = Math.floor(carouselWidth / slideWidth);
    $slidesWrapper.width(numberOfSlidesToShow * slideWidth);
  }

  function addButtons() {
    // add prev button to carousel
    const $prevButton = $('<button class="prev-button">Prev</button>');
    $prevButton.click(onClickPrev);
    $carousel.append($prevButton);
    // add next button to carousel
    const $nextButton = $('<button class="next-button">Next</button>');
    $nextButton.click(onClickNext);
    $carousel.append($nextButton);
  }

  function onClickPrev() {
    // calculate the offset
    const newOffset = currentOffset + $slidesWrapper.width();
    // if the new offset is greater than the width of the slides, go to the last slide
    const slidesWidth = $slides.width();
    
    if (newOffset > 0) {
      currentOffset = 0 - slidesWidth + $slidesWrapper.width();
    } else {
      currentOffset = newOffset;
    }

    $slides.css({ left: currentOffset + 'px' });
  }

  function onClickNext() {
    // calculate the offset
    const newOffset = currentOffset - $slidesWrapper.width();
    // if the new offset is greater than the width of the slides, go to the first slide
    const slidesWidth = $slides.width();
    
    if (slidesWidth + newOffset <= 0) {
      currentOffset = 0;
    } else {
      currentOffset = newOffset;
    }

    $slides.css({ left: currentOffset + 'px' });
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

  function destroy() {
    removeEventListeners();
  }

  init();
  
}