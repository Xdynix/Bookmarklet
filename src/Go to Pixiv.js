javascript:(function () {
  'use strict';
  let pid = prompt('Pixiv ID');
  if (pid && (pid = pid.trim())) {
    window.open(`https://www.pixiv.net/artworks/${pid}`);
  }
})();
