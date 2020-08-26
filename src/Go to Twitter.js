javascript:(function () {
  'use strict';
  let user = prompt('Twitter User');
  if (user && (user = user.trim())) {
    window.open(`https://twitter.com/${user}`);
  }
})();
