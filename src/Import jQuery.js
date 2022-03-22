javascript: (function (e, s) {
  e.src = s;
  e.onload = function () {
    jQuery.noConflict();
    console.log('jQuery injected');
  };
  document.head.appendChild(e);
})(document.createElement('script'), '//code.jquery.com/jquery-3.6.0.min.js')
