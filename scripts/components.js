$(document).ready(function () {
  
  $('.carousel').each(function () {
    Carousel(this);
  });

  $('.history-item').each(function () {
    Animate(this);
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
    const $buttons = $('<div class="buttons"></div>');
    // add prev button to carousel
    const $prevButton = $('<button class="prev-button">Prev</button>');
    $prevButton.click(onClickPrev);
    $buttons.append($prevButton);
    // add next button to carousel
    const $nextButton = $('<button class="next-button">Next</button>');
    $nextButton.click(onClickNext);
    $buttons.append($nextButton);
    $carousel.append($buttons);
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
  
  function reset() {
    currentOffset = 0;
    $slides.css({ left: currentOffset + 'px' });
  }

  function onResize() {
    setWidths();
    reset();
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

function Animate(element) {
  const $element = $(element);

  function onIntersecting(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }

  const observer = new IntersectionObserver(onIntersecting, {
    rootMargin: '0px',
    threshold: 0.5,
  });

  observer.observe($element[0]);
}