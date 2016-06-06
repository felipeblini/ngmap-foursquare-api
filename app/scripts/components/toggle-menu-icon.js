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

  // window.addEventListener('resize', function() {
  //   if(window.innerWidth < 768) {
  //     console.log(window.innerWidth);
  //     if (body.classList.contains('toggled')) {
  //       body.classList.remove('toggled');
  //     } else {
  //       body.classList.add('toggled');
  //     }
  //   }
  // }, false);
})(window, document);