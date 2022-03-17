javascript:(function () {
  'use strict';

  navigator.clipboard
    .writeText(document.cookie)
    .catch(e => {
      alert(`Copy failed. Reason: ${e}`);
      console.error(e);
    });
})();
