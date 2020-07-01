javascript:(function () {
    'use strict';
    let pid = prompt('Pixiv ID');
    if (pid !== null) {
        pid = pid.trim();
        window.open('https://www.pixiv.net/artworks/' + pid);
    }
})();
