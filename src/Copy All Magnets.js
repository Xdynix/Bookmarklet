javascript:(function () {
  'use strict';
  const jqueryTag = document.createElement('script');
  jqueryTag.src = '//code.jquery.com/jquery-latest.min.js';
  jqueryTag.onload = function () {
    const $ = jQuery.noConflict();
    const links = $('[href^="magnet:?"]')
      .map((i, e) => $(e).attr('href'))
      .get()
      .join('\n');
    navigator.clipboard.writeText(links);
  };
  document.head.appendChild(jqueryTag);
})();
