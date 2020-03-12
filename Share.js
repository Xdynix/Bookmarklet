javascript:(function () {
    'use strict';

    function copyTextToClipboard(text, log = false) {
        const textArea = document.createElement('textarea');
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (log) {
                const msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
            }
        } catch (err) {
            if (log) {
                console.error(err);
            }
        }
        document.body.removeChild(textArea);
    }

    let title = document.title;
    const url = new URL(window.location.href);

    if (url.host.endsWith('bilibili.com')) {
        if (url.pathname === '/watchlater/') {
            const watcherLaterPattern = url.hash.match(/#\/(av\d+)\/p(\d+)/i);
            if (watcherLaterPattern !== null) {
                url.hash = '';
                const avId = watcherLaterPattern[1];
                const page = watcherLaterPattern[2];
                url.pathname = '/video/' + avId + '/';
                if (page !== '1') {
                    url.search = '?p=' + page;
                }
            }
        }

        const urlParams = new URLSearchParams(url.search);
        [
            'spm_id_from',
            'from',
            'seid',
            'share_medium',
            'share_source',
            'bbid',
            'ts'
        ].forEach(param => urlParams.delete(param));

        url.search = urlParams.toString();
    }

    if (url.host === 'www.vgtime.com') {
        title = title.replace(/ - vgtime\.com$/i, '');
    }

    if (url.host === 'www.youtube.com') {
        const urlParams = new URLSearchParams(url.search);
        if (urlParams.get('list') === 'WL') {
            urlParams.delete('list');
            urlParams.delete('index');
        }
        if (urlParams.get('t') === '0s') {
            urlParams.delete('t');
        }
        url.search = urlParams.toString();
    }

    if (url.host === 'www.zhihu.com') {
        title = title.replace(/^\(\d+\s*条消息\)\s*/i, '');
    }

    copyTextToClipboard(title + '\n' + url.toString());
})();
