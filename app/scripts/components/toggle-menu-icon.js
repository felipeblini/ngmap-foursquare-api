document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  var link = document.querySelector('[data-toggle-menu]');
  link.addEventListener('click', function() {
    if (link.classList.contains('toggle-menu--clicked')) {
      link.classList.remove('toggle-menu--clicked');
    } else {
      link.classList.add('toggle-menu--clicked');
    }
  }, false);
}, false);