javascript:(function () {
  'use strict';

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function main() {
    const $ = jQuery.noConflict();
    $('div:contains("管理收藏")').last().click();
    await timeout(100);
    $('div:contains("全选")').last().click();
    await timeout(100);
    $('div[role=button]:contains("设为不公开")').last().click();
    await timeout(100);
    location.reload();
  }

  const jqueryTag = document.createElement('script');
  jqueryTag.src = '//code.jquery.com/jquery-3.6.0.min.js';
  jqueryTag.onload = main;
  document.head.appendChild(jqueryTag);
})();
