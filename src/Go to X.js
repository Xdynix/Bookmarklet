javascript:(function () {
  'use strict';
  let user = prompt('X User');
  if (user && (user = user.trim())) {
    window.open(`https://x.com/${user}`);
  }
})();
