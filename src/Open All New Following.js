javascript:(function () {
  'use strict';
  const element = document.getElementById('js-mount-point-latest-following');
  if (!element) {
    alert('Mount point not found.');
    return;
  }
  try {
    const data = JSON.parse(element.getAttribute('data-items'));
    for (const illust of data) {
      window.open(`https://www.pixiv.net/artworks/${illust['illustId']}`, '_blank');
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
})();
