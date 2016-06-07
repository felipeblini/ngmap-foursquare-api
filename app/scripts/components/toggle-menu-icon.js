(function(window, document) {
  'use strict';
  
  var link = document.querySelector('[data-toggle-menu]');
  var body = document.querySelector('html');

  document.addEventListener('DOMContentLoaded', function() {
    link.addEventListener('click', function() {
      
      if (body.classList.contains('toggled')) {
        console.log(body.classList);
        body.classList.remove('toggled');
        console.log(body.classList);
      } else {
        body.classList.add('toggled');
      }
    }, false);
  }, false);
})(window, document);