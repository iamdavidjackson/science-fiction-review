// we can use jQuery to wait for the page to be ready before running scripts
$(document).ready(function () {
  
  // initialize any carousels that are on the page
  $('.carousel').each(function () {
    Carousel(this);
  });

  // initialize and animated objects that are on the page
  $('.history-item').each(function () {
    Animate(this);
  }); 

});

// This function can be used to initialize a carousel on the passed in element
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

  // This function will add previous and next buttons to the slides container
  function addButtons() {
    const $buttons = $('<div class="buttons"></div>');
    
    // add prev button to buttons container
    const $prevButton = $('<button class="prev-button">Prev</button>');
    // attach event listener
    $prevButton.click(onClickPrev);
    $buttons.append($prevButton);

    // add next button to buttons container
    const $nextButton = $('<button class="next-button">Next</button>');
    // attach event listener
    $nextButton.click(onClickNext);
    $buttons.append($nextButton);

    // add the buttons to the page
    $carousel.append($buttons);
  }

  // when the previous button is clicked we need to move to the previous slides
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

  // when the next button is clicked we need to move to the next set of slides
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
  

  // resets the slider back to its initial position after a screen size change
  function reset() {
    currentOffset = 0;
    $slides.css({ left: currentOffset + 'px' });
  }

  // callback function for window resize events
  function onResize() {
    setWidths();
    reset();
  }

  // add event listeners
  function addEventListeners() {
    window.addEventListener('resize', onResize);
  }

  // remove event listeners
  function removeEventListeners() {
    window.removeEventListener('resize', onResize);
  }

  // this function isnt used but it would be useful if we were using the slider in a modal window
  // or if the slider stopped being a slider in a certain breakpoint.
  function destroy() {
    removeEventListeners();
  }

  // Initialize the slider
  init();
  
}

// Animations for the History Page
function Animate(element) {
  const $element = $(element);

  // this function will run every time an the intersection observer detects an update
  function onIntersecting(entries) {
    // the observer can track multiple objects but we are only interested in the first one anyways
    entries.forEach(function(entry) {
      // if the element is on the screen then we want to add the active class otherwise we remove it.
      // we will use the active class to apply a CSS animation
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }

  // intersection observers allow us to detect when an element is on the screen
  // we set up the observer and then observe how an element interacts with the viewport
  const observer = new IntersectionObserver(onIntersecting, {
    rootMargin: '0px',
    threshold: 0.5,
  });

  // track when an element comes on screen
  observer.observe($element[0]);
}