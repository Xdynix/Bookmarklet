javascript: (function (e, s) {
  if (window.trustedTypes && window.trustedTypes.createPolicy) {
    if (window.trustedTypes.defaultPolicy === null) {
      window.trustedTypes.createPolicy('default', {
        createHTML: string => string,
        createScriptURL: string => string,
        createScript: string => string,
      });
    }
  }
  e.src = s;
  e.onload = function () {
    jQuery.noConflict();
    console.log('jQuery injected');
  };
  document.head.appendChild(e);
})(document.createElement('script'), '//code.jquery.com/jquery-4.0.0-beta.min.js')
