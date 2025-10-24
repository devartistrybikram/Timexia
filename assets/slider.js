$(document).ready(function () {
  $('.owl-home').each(function () {
    const $carousel = $(this);
    const breakpoints = {
      sm: { min: 0, max: 767 },
      md: { min: 768, max: 991 },
      lg: { min: 992, max: 1199 },
      xl: { min: 1200, max: 1439 },
      xxl: { min: 1440, max: Infinity }
    };
    const destroyBps = ($carousel.data('destroy') || '').replace(/\s/g, '').split(',');

    // Initialize or destroy based on breakpoints
    function initCarousel() {
      const windowWidth = $(window).width();
      const shouldDestroy = destroyBps.some(bp => {
        const range = breakpoints[bp];
        return range && windowWidth >= range.min && windowWidth <= range.max;
      });

      if (shouldDestroy) {
        if ($carousel.hasClass('owl-loaded')) {
          $carousel.trigger('destroy.owl.carousel').removeClass('owl-loaded owl-carousel owl-theme');
          $carousel.find('.owl-stage-outer').children().unwrap();
        }
      } else {
        if (!$carousel.hasClass('owl-loaded')) {
          $carousel.owlCarousel({
            items: $carousel.data('items') || 1,
            loop: $carousel.data('loop') || false,
            margin: $carousel.data('margin') || 0,
            autoplay: $carousel.data('autoplay') || false,
            autoplayTimeout: $carousel.data('autoplay-timeout') || 5000,
            nav: $carousel.data('nav') || false,
            dots: $carousel.data('dots') || false,
            center: $carousel.data('center') || true,
            slideBy: $carousel.data('slideby') || 1,
            responsive: $carousel.data('responsive') 
              ? JSON.parse($carousel.attr('data-responsive').replace(/'/g, '"')) 
              : {}
          });
        }
      }
    }

    // Initialize on page load
    initCarousel();

    // Shopify events for Theme Editor
    const shopifyEvents = [
      'shopify:section:select',
      'shopify:section:deselect',
      'shopify:block:select',
      'shopify:block:deselect'
    ];

    shopifyEvents.forEach(eventName => {
      document.addEventListener(eventName, function (event) {
        const $targetCarousel = $(event.target).find('.owl-home');
        if ($targetCarousel.length) {
          initCarousel.call($targetCarousel);
        }
      });
    });

    // Theme settings changed
    document.addEventListener('theme:settings:changed', function (event) {
      if (event.detail.id === 'carousel_items') {
        initCarousel();
      }
    });

    // Optional: keep resize logic if you want breakpoint switching live
    $(window).resize(initCarousel);
  });
});

