javascript:(function () {
    'use strict';
    const e = document.getElementById('js-mount-point-latest-following');
    if (!e) {
        alert('Mount point not found.');
        return;
    }
    try {
        const data = JSON.parse(e.getAttribute('data-items'));
        for (const illust of data) {
            window.open(`https://www.pixiv.net/artworks/${illust['illustId']}`, '_blank');
        }
    } catch (e) {
        alert(String(e));
    }
})();
