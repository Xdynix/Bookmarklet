javascript:(function () {
  'use strict';

  const pattern = /javascript:viewEditorPDFs\((\d+),\s*['"](.*?)['"],\s*0,\s*['"]\{([a-z0-9-]+)}['"],\s*['"]true['"]\);/g;

  const contentIFrame = document.getElementById('content');
  if (contentIFrame === null) {
    alert('[EMBatchDownload] Cannot locate content iframe.');
    return;
  }
  const contentDocument = contentIFrame.contentDocument || contentIFrame.contentWindow.document || null;
  if (contentDocument === null) {
    alert('[EMBatchDownload] Cannot read content iframe document.');
    return;
  }

  Array.from(
    contentDocument.querySelectorAll('#FGSubmissions tr a[href^="javascript:viewEditorPDFs"]')
  )
    .map(a => a.href)
    .map(href => {
      pattern.lastIndex = 0;
      return pattern.exec(href);
    })
    .map(match => 'https://www.editorialmanager.com/jmlc/fileDownload.asp'
      + `?msid=${match[3]}&docID=${match[1]}&rev=0&file=${match[2]}.pdf&isEditSub=false&pdfType=1`
    ).forEach(link => window.open(link, '_blank'));
})();
