(function () {
  'use strict';

  // Sticky Navigation
  var nav = document.getElementById('stickyNav');
  var hero = document.getElementById('hero');

  if (nav && hero) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          nav.classList.remove('visible');
        } else {
          nav.classList.add('visible');
        }
      });
    }, { threshold: 0 });

    observer.observe(hero);
  }

  // Smooth scroll for nav links (offset for sticky nav height)
  var navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          var navHeight = nav ? nav.offsetHeight : 0;
          var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  // Recipe Carousel
  var cards = document.querySelectorAll('.carousel-card');
  var panels = document.querySelectorAll('.carousel-detail-panel');
  var activeIndex = 1; // Salmon starts active (middle card)

  function setActiveCard(index) {
    if (index === activeIndex) return;
    activeIndex = index;

    // Update card classes and stagger offsets
    cards.forEach(function (card, i) {
      card.classList.remove('carousel-prev', 'carousel-active', 'carousel-next');
      card.removeAttribute('data-offset');
      if (i === activeIndex) {
        card.classList.add('carousel-active');
      } else {
        var distance = Math.abs(i - activeIndex);
        card.classList.add(i < activeIndex ? 'carousel-prev' : 'carousel-next');
        if (distance > 1) {
          card.setAttribute('data-offset', String(distance));
        }
      }
    });

    // Update detail panels
    panels.forEach(function (panel, i) {
      if (i === activeIndex) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // Scroll the carousel into view after the card transition finishes
    var stage = document.querySelector('.carousel-stage');
    if (stage) {
      setTimeout(function () {
        var navHeight = nav ? nav.offsetHeight : 0;
        var top = stage.getBoundingClientRect().top + window.pageYOffset - navHeight - 24;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }, 500);
    }
  }

  cards.forEach(function (card, i) {
    card.addEventListener('click', function () {
      setActiveCard(i);
    });

    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveCard(i);
      }
    });
  });
})();
