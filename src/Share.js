javascript:(function () {
  'use strict';

  function onCopy(e) {
    e.preventDefault();
    e.stopPropagation();
    const clipboardData = e.clipboardData || window.clipboardData;
    clipboardData.setData('text/plain', window.getSelection().toString());
  }

  let title = document.title;
  let url = new URL(window.location.href);

  if (url.host.endsWith('bilibili.com')) {
    if (url.pathname.startsWith('/medialist/play')) {
      const titleLocation = document.getElementsByClassName('tit');
      if (!titleLocation.length) {
        alert('Title location not found.');
        return;
      }
      url = new URL(titleLocation[0].getAttribute('href'));
    }

    const urlParams = new URLSearchParams(url.search);
    const searchKeyAllowList = ['p', 't'];
    for (const key of Array.from(urlParams.keys())) {
      if (!searchKeyAllowList.includes(key)) urlParams.delete(key);
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

  if ((url.host === 'item.taobao.com' || url.host === 'detail.tmall.com') && url.pathname === '/item.htm') {
    url.hash = '';

    const urlParams = new URLSearchParams(url.search);
    const searchKeyAllowList = ['id'];
    for (const key of Array.from(urlParams.keys())) {
      if (!searchKeyAllowList.includes(key)) urlParams.delete(key);
    }
    url.search = urlParams.toString();
    title = title.replace(/tmall\.com/i, '');
  }

  if (url.host === 'www.1point3acres.com') {
    document.addEventListener('copy', onCopy);
  }

  navigator.clipboard
    .writeText(title + '\n' + url.toString())
    .catch(e => {
      alert(`Copy failed. Reason: ${e}`);
      console.error(e);
    });
})();
