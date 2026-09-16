/* ==========================================================================
   Cancer Grand Challenges — news hub
   Challenge carousel + background cell parallax. No dependencies.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

  /* ------------------------------------------------------------------------
     Challenge carousel
     Slides cross-fade in place. The cell graphics behind them travel: the
     active shape rests in the slot, later shapes wait to the right, earlier
     ones exit to the left.
     ---------------------------------------------------------------------- */
  function initCarousel() {
    var root = document.querySelector('[data-carousel]');
    if (!root) return;

    var slides = Array.prototype.slice.call(root.querySelectorAll('[data-slide]'));
    var pips = Array.prototype.slice.call(root.querySelectorAll('[data-pip]'));
    var cells = Array.prototype.slice.call(
      document.querySelectorAll('[data-cell-slot]')
    );
    if (!slides.length) return;

    var index = 0;

    function render() {
      slides.forEach(function (slide, i) {
        if (i === index) slide.setAttribute('data-active', '');
        else slide.removeAttribute('data-active');
        slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
      });

      pips.forEach(function (pip, i) {
        pip.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });

      cells.forEach(function (cell, i) {
        var active = i === index;
        cell.style.setProperty('--cx', active ? '0%' : (i < index ? '-40%' : '40%'));
        cell.style.setProperty('--cs', active ? '1' : '0.82');
        cell.style.setProperty('--co', active ? '1' : '0');
      });
    }

    function go(next) {
      index = (next + slides.length) % slides.length;
      render();
    }

    root.addEventListener('click', function (event) {
      var target = event.target.closest('[data-carousel-prev],[data-carousel-next],[data-pip]');
      if (!target) return;

      if (target.hasAttribute('data-carousel-prev')) go(index - 1);
      else if (target.hasAttribute('data-carousel-next')) go(index + 1);
      else go(pips.indexOf(target));
    });

    render();
  }

  /* ------------------------------------------------------------------------
     Background cell parallax
     Drift is driven by how far a cell sits from the centre of the viewport,
     and capped, so a long page can never translate a cell off its section.
     Depth speeds match the live site: 1.1 far, 1.2 mid, 1.3 near, 0.8 hero.
     ---------------------------------------------------------------------- */
  function initParallax() {
    if (reduceMotion.matches) return;

    var layer = document.querySelector('[data-cell-layer]');
    if (!layer) return;

    var cells = [];

    function measure() {
      cells = Array.prototype.slice.call(layer.querySelectorAll('svg')).map(
        function (el, i) {
          var width = parseFloat(el.style.width) || 20;
          var speed = i === 0 ? 0.8 : (width > 30 ? 1.3 : (width >= 20 ? 1.2 : 1.1));

          el.style.translate = '0 0px';
          var box = el.getBoundingClientRect();

          return {
            el: el,
            speed: speed,
            anchor: box.top + window.scrollY + box.height / 2
          };
        }
      );
    }

    var ticking = false;

    function run() {
      ticking = false;
      var mid = window.scrollY + window.innerHeight / 2;

      cells.forEach(function (cell) {
        var distance = mid - cell.anchor;
        var offset = (cell.speed - 1) * distance * -1;
        offset = Math.max(-260, Math.min(260, offset));
        cell.el.style.translate = '0 ' + Math.round(offset * 100) / 100 + 'px';
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(run);
    }

    measure();
    run();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { measure(); run(); });

    /* Anchors depend on the final layout: re-measure once fonts and images
       have settled. */
    window.addEventListener('load', function () { measure(); run(); });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { measure(); run(); }).catch(function () {});
    }
  }

  /* ------------------------------------------------------------------------
     Newsletter form — no endpoint wired up in this static build.
     ---------------------------------------------------------------------- */
  function initSignup() {
    var form = document.querySelector('[data-signup]');
    if (!form) return;
    form.addEventListener('submit', function (event) { event.preventDefault(); });
  }

  function init() {
    initCarousel();
    initParallax();
    initSignup();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
