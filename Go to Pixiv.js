javascript:(function() {
  'use strict';
  var pid = prompt("Pixiv ID");
  if (pid !== null) {
    pid = pid.trim();
    window.open("https://www.pixiv.net/artworks/" + pid);
  }
})();
