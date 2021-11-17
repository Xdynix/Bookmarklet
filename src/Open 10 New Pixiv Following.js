javascript:(function () {
  'use strict';
  const jqueryTag = document.createElement('script');
  jqueryTag.src = '//code.jquery.com/jquery-latest.min.js';
  jqueryTag.onload = function () {
    const $ = jQuery.noConflict();
    const storage = window.sessionStorage;
    const maxOpen = 10;
    try {
      const ids = $('ul li div[type=illust] a')
        .map((i, e) => $(e).data('gtm-value').toString())
        .toArray();
      let openCount = 0;
      for (const illustId of ids) {
        if (storage.getItem(illustId) === null) {
          if (openCount >= maxOpen) {
            break;
          }
          storage.setItem(illustId, (new Date()).toISOString());
          ++openCount;
          window.open(`https://www.pixiv.net/artworks/${illustId}`, '_blank');
        }
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  document.head.appendChild(jqueryTag);
})();
