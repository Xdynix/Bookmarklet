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
    } catch (error) {
      if (log) {
        console.error(error);
      }
    }
    document.body.removeChild(textArea);
  }

  let title = document.title;
  let url = new URL(window.location.href);

  if (url.host.endsWith('bilibili.com')) {
    if (url.pathname.startsWith('/medialist/play')) {
      const titleLocation = document.getElementsByClassName('play-title-location');
      if (!titleLocation.length) {
        alert('Title location not found.');
        return;
      }
      url = new URL(titleLocation[0].getAttribute('href'));
    }

    const urlParams = new URLSearchParams(url.search);
    const searchKeyWhitelist = ['p', 't'];
    for(const key of Array.from(urlParams.keys())) {
      if (!searchKeyWhitelist.includes(key)) urlParams.delete(key);
    }
    if (urlParams.get('p') === '1') urlParams.delete('p');

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
    title = title.replace(/^\(\d+\s*(条消息|封私信)(\s*\/\s*\d+\s*(条消息|封私信))?\)\s*/i, '');
  }

  copyTextToClipboard(title + '\n' + url.toString());
})();
