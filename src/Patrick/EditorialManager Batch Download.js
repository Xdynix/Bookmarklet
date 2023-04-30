javascript:(function () {
  'use strict';

  function main() {
    const pattern = /javascript:viewEditorPDFs\((\d+),\s*['"](.*?)['"],\s*(\d+),\s*['"]\{([a-z0-9-]+)}['"],\s*['"]true['"]\);/g;

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

    alert('[EMBatchDownload] The download has started. Please do not close the webpage until the download is complete.');
    const zip = new JSZip();
    Promise.all(Array.from(
        contentDocument.querySelectorAll('#FGSubmissions tr a[href^="javascript:viewEditorPDFs"]')
      )
        .map(a => a.href)
        .map(href => {
          pattern.lastIndex = 0;
          return pattern.exec(href);
        })
        .map(match => 'https://www.editorialmanager.com/jmlc/fileDownload.asp'
          + `?msid=${match[4]}&docID=${match[1]}&rev=${match[3]}&file=${match[2]}.pdf&isEditSub=false&pdfType=1`
        )
        .map(url => {
          return fetch(url)
            .then(response => {
              const disposition = response.headers.get('Content-Disposition');
              const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
              const matches = filenameRegex.exec(disposition);
              const filename = matches[1].replace(/['"]/g, '');
              zip.file(filename, response.blob());
            })
        })
    )
      .then(() => zip.generateAsync({type: 'blob'}))
      .then(blob => saveAs(blob, 'download.zip'))
      .catch(error => {
        alert(`[EMBatchDownload] Error while downloading: ${error}`);
        console.error(error);
      });
  }

  const fileSaverTag = document.createElement('script');
  fileSaverTag.src = 'https://cdn.staticfile.org/FileSaver.js/2.0.5/FileSaver.min.js';
  document.head.appendChild(fileSaverTag);
  const jsZipTag = document.createElement('script');
  jsZipTag.src = 'https://cdn.staticfile.org/jszip/3.10.1/jszip.min.js';
  jsZipTag.onload = main;
  document.head.appendChild(jsZipTag);
})();
