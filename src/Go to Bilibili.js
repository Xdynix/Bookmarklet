javascript:(function () {
    'use strict';
    let bid = prompt('Bilibili ID');
    if (bid !== null) {
        bid = bid.trim();
        if (!bid.startsWith('av')) {
            bid = 'av' + bid;
        }
        window.open('https://www.bilibili.com/video/' + bid);
    }
})();
