javascript:(function () {
  'use strict';

  function onCopy(e) {
    e.preventDefault();
    e.stopPropagation();
    const clipboardData = e.clipboardData || window.clipboardData;
    clipboardData.setData('text/plain', window.getSelection().toString());
  }

  function filterURLSearchParam(search, allowList) {
    const urlParams = new URLSearchParams(search);
    for (const key of Array.from(urlParams.keys())) {
      if (!allowList.includes(key)) urlParams.delete(key);
    }
    return urlParams.toString();
  }

  let title = document.title;
  let url = new URL(window.location.href);

  if (url.host.endsWith('bilibili.com')) {
    if (url.pathname.startsWith('/list/watchlater')) {
      const titleLocation = document.getElementsByClassName('video-title-href');
      if (!titleLocation.length) {
        alert('Title location not found.');
        return;
      }

      title = titleLocation[0].textContent;

      let href = titleLocation[0].getAttribute('href');
      if (href.startsWith('//')) {
        href = 'https:' + href;
      }
      url = new URL(href);
    }

    url.search = filterURLSearchParam(url.search, ['p', 't']);
    const urlParams = new URLSearchParams(url.search);
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

    url.search = filterURLSearchParam(url.search, ['id']);
    title = title.replace(/tmall\.com/i, '');
  }

  if (url.host === 'www.1point3acres.com') {
    document.addEventListener('copy', onCopy);
  }

  if (url.host === 'mp.weixin.qq.com') {
    url.search = filterURLSearchParam(url.search, ['__biz', 'mid', 'idx', 'sn']);
    url.hash = '';
  }

  navigator.clipboard
    .writeText(title + '\n' + url.toString())
    .catch(e => {
      alert(`Copy failed. Reason: ${e}`);
      console.error(e);
    });
})();
