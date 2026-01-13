/**
 * UNO JERSEY Section 2 - Products Interactive Logic
 * Handles product switching with smooth animations
 * Based on the reference Samples section pattern
 */

(function() {
  'use strict';

  // DOM Elements
  const tabs = document.querySelectorAll('.sport-icon-tab');
  const modelItems = document.querySelectorAll('.product-model-item');
  const infoItems = document.querySelectorAll('.product-info-item');
  const mobileCarousel = document.querySelector('.products-mobile-carousel');

  let currentProduct = 'baseball';
  const products = ['baseball', 'basic', 'basket', 'polo', 'set'];
  const totalProducts = products.length;

  // Mobile carousel auto-swipe
  let autoSwipeInterval = null;
  let currentSlideIndex = 0;
  const AUTO_SWIPE_DELAY = 5000; // 5 seconds

  /**
   * Initialize the products section
   */
  function init() {
    // Initialize desktop layout if elements exist
    if (tabs.length && modelItems.length && infoItems.length) {
      // Initialize first info item with proper styles
      if (infoItems[0]) {
        infoItems[0].style.opacity = '1';
        infoItems[0].style.transform = 'translateY(0)';
      }

      // Attach event listeners for desktop
      attachEventListeners();

      console.log('Products section initialized - 3-column layout with icon tabs');
    }

    // Initialize mobile carousel auto-swipe
    if (mobileCarousel) {
      initMobileCarousel();
      console.log('Mobile carousel initialized with auto-swipe');
    }
  }

  /**
   * Initialize mobile carousel with auto-swipe
   */
  function initMobileCarousel() {
    const slides = mobileCarousel.querySelectorAll('.product-slide');
    if (!slides.length) return;

    // Only track scroll position, no pause on interaction
    mobileCarousel.addEventListener('scroll', handleScroll);

    // Start auto-swipe
    startAutoSwipe();
  }

  /**
   * Start auto-swipe interval
   */
  function startAutoSwipe() {
    if (autoSwipeInterval) return;

    autoSwipeInterval = setInterval(() => {
      const slides = mobileCarousel.querySelectorAll('.product-slide');
      if (!slides.length) return;

      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      scrollToSlide(currentSlideIndex);
    }, AUTO_SWIPE_DELAY);
  }

  /**
   * Pause auto-swipe
   */
  function pauseAutoSwipe() {
    if (autoSwipeInterval) {
      clearInterval(autoSwipeInterval);
      autoSwipeInterval = null;
    }
  }

  /**
   * Resume auto-swipe
   */
  function resumeAutoSwipe() {
    // Delay resuming to allow user to finish interacting
    setTimeout(() => {
      startAutoSwipe();
    }, 3000);
  }

  /**
   * Handle scroll to update current slide index
   */
  function handleScroll() {
    const slides = mobileCarousel.querySelectorAll('.product-slide');
    if (!slides.length) return;

    const scrollLeft = mobileCarousel.scrollLeft;
    const slideWidth = slides[0].offsetWidth;
    currentSlideIndex = Math.round(scrollLeft / slideWidth);
  }

  /**
   * Scroll to specific slide
   */
  function scrollToSlide(index) {
    const slides = mobileCarousel.querySelectorAll('.product-slide');
    if (!slides[index]) return;

    const scrollPosition = index * slides[0].offsetWidth;
    mobileCarousel.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }

  /**
   * Attach event listeners to sport icon tabs
   */
  function attachEventListeners() {
    tabs.forEach((tab) => {
      // Click handler
      tab.addEventListener('click', () => {
        const sportId = tab.dataset.sport;
        switchProduct(sportId);
      });

      // Keyboard navigation
      tab.addEventListener('keydown', (e) => {
        let newProduct = currentProduct;
        const currentIndex = products.indexOf(currentProduct);

        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault();
            newProduct = currentIndex > 0 ? products[currentIndex - 1] : products[totalProducts - 1];
            break;
          case 'ArrowDown':
            e.preventDefault();
            newProduct = currentIndex < totalProducts - 1 ? products[currentIndex + 1] : products[0];
            break;
          case 'Home':
            e.preventDefault();
            newProduct = products[0];
            break;
          case 'End':
            e.preventDefault();
            newProduct = products[totalProducts - 1];
            break;
          default:
            return;
        }

        const newIndex = products.indexOf(newProduct);
        tabs[newIndex].focus();
        switchProduct(newProduct);
      });
    });
  }

  /**
   * Switch to a different product
   * @param {string} sportId - The ID of the sport to switch to
   */
  function switchProduct(sportId) {
    if (sportId === currentProduct) return;

    const newIndex = products.indexOf(sportId);
    const currentIndex = products.indexOf(currentProduct);

    // Update tabs
    tabs[currentIndex].classList.remove('active');
    tabs[currentIndex].setAttribute('aria-selected', 'false');

    tabs[newIndex].classList.add('active');
    tabs[newIndex].setAttribute('aria-selected', 'true');

    // Update model display with fade effect
    modelItems[currentIndex].classList.remove('active');

    // Small delay for smoother transition
    setTimeout(() => {
      modelItems[newIndex].classList.add('active');
    }, 50);

    // Update info panel with fade effect
    infoItems[currentIndex].style.display = 'none';
    infoItems[newIndex].style.display = 'block';

    // Animate info panel
    infoItems[newIndex].style.opacity = '0';
    infoItems[newIndex].style.transform = 'translateY(10px)';

    requestAnimationFrame(() => {
      infoItems[newIndex].style.transition = 'all 0.4s ease';
      infoItems[newIndex].style.opacity = '1';
      infoItems[newIndex].style.transform = 'translateY(0)';
    });

    currentProduct = sportId;
  }

  // Public API
  window.ProductsSection = {
    init,
    switchProduct,
    getCurrentProduct: () => currentProduct
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
