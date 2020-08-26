javascript:(function () {
  'use strict';
  let id = prompt('DLsite ID');
  if (id && (id = id.trim())) {
    window.open(`https://www.dlsite.com/maniax/work/=/product_id/${id}.html`);
  }
})();
