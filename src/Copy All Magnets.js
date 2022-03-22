javascript:(function () {
  'use strict';

  function main() {
    const $ = jQuery.noConflict();
    const links = $('[href^="magnet:?"]')
      .map((i, e) => $(e).attr('href'))
      .get()
      .join('\n');
    navigator.clipboard
      .writeText(links)
      .catch(e => {
        alert(`Copy failed. Reason: ${e}`);
        console.error(e);
      });
  }

  const jqueryTag = document.createElement('script');
  jqueryTag.src = '//code.jquery.com/jquery-3.6.0.min.js';
  jqueryTag.onload = main;
  document.head.appendChild(jqueryTag);
})();
