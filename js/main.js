/* Shared site JS: client-side search, hero sizing, copyright year. */

(function () {
  'use strict';

  /* ---------------- Copyright year ---------------- */
  function setCopyrightYear() {
    document.querySelectorAll('.copyright-year').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ---------------- Client-side search ---------------- */
  var overlay = document.getElementById('search-overlay');

  function openSearch() {
    if (!overlay) return;
    overlay.hidden = false;
    var input = document.getElementById('search-input');
    if (input) { input.value = ''; renderResults(''); input.focus(); }
    document.body.style.overflow = 'hidden';
  }

  function closeSearch() {
    if (!overlay) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
  }

  function renderResults(query) {
    var list = document.getElementById('search-results');
    if (!list) return;
    var index = window.SEARCH_INDEX || [];
    var q = query.trim().toLowerCase();
    var matches;

    if (!q) {
      matches = index.slice(0, 8);
    } else {
      matches = index.filter(function (item) {
        return (item.t + ' ' + item.c).toLowerCase().indexOf(q) !== -1;
      }).slice(0, 20);
    }

    list.innerHTML = '';
    if (!matches.length) {
      var li = document.createElement('li');
      li.className = 'search-empty';
      li.textContent = 'No results for "' + query + '"';
      list.appendChild(li);
      return;
    }
    matches.forEach(function (item) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = item.u;
      var name = document.createElement('span');
      name.textContent = item.t;
      var cat = document.createElement('span');
      cat.className = 'result-cat';
      cat.textContent = item.c;
      a.appendChild(name);
      a.appendChild(cat);
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function initSearch() {
    if (!overlay) return;

    document.querySelectorAll('[data-search-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (overlay.hidden) openSearch(); else closeSearch();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay && !overlay.hidden) closeSearch();
    });

    var input = document.getElementById('search-input');
    if (input) {
      input.addEventListener('input', function () { renderResults(input.value); });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          var first = document.querySelector('#search-results li a');
          if (first) window.location.href = first.href;
        }
      });
    }
  }

  /* ---------------- Hero sizing (home page) ----------------
     Ported from layouts/partials/site_footer.html: with background-size
     contain, the hero height must follow the image aspect ratio
     (min 50vh, max min(width, 90vh)). */
  function initHero() {
    var section = document.querySelector('section.blox-hero');
    var bg = document.querySelector('section.blox-hero .hero-bg-image');
    if (!section || !bg) return;

    var heroImg = section.getAttribute('data-hero-img');
    if (!heroImg) return;

    var ratio = null, rafId = null, lastWidth = 0, debTimer = null;

    function computeAndApply() {
      rafId = null;
      if (ratio == null) return;
      var width = section.clientWidth;
      if (Math.abs(width - lastWidth) < 1) return;
      lastWidth = width;
      var desired = Math.round(width * ratio);
      var maxHeight = Math.min(width, Math.round(window.innerHeight * 0.9));
      var minHeight = Math.round(window.innerHeight * 0.5);
      var finalHeight = Math.min(Math.max(desired, minHeight), maxHeight);
      section.style.height = finalHeight + 'px';
    }

    function scheduleCompute() {
      if (rafId != null) return;
      rafId = requestAnimationFrame(computeAndApply);
    }

    function debouncedSchedule() {
      clearTimeout(debTimer);
      debTimer = setTimeout(scheduleCompute, 120);
    }

    var img = new Image();
    img.onload = function () {
      ratio = img.height / img.width;
      scheduleCompute();
    };
    img.src = heroImg;

    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(function () { debouncedSchedule(); });
      ro.observe(section);
    }
    window.addEventListener('resize', debouncedSchedule, { passive: true });
    window.addEventListener('orientationchange', debouncedSchedule, { passive: true });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', debouncedSchedule, { passive: true });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    setCopyrightYear();
    initSearch();
    initHero();
  });
})();
