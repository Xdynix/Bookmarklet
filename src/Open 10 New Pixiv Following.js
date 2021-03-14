javascript:(function () {
  'use strict';
  const element = document.getElementById('js-mount-point-latest-following');
  const storage = window.sessionStorage;
  const maxOpen = 10;
  if (!element) {
    alert('Mount point not found.');
    return;
  }
  try {
    const data = JSON.parse(element.getAttribute('data-items'));
    let openCount = 0;
    for (const illust of data) {
      const illustId = illust['illustId'];
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
})();
