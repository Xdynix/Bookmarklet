javascript:(function () {
  'use strict';

  const contentIFrame = document.getElementById('content');
  if (contentIFrame === null) {
    alert('Cannot locate content iframe.');
    return;
  }
  const contentDocument = contentIFrame.contentDocument || contentIFrame.contentWindow.document || null;
  if (contentDocument === null) {
    alert('Cannot read content iframe document.');
    return;
  }
  const pattern = /javascript:viewEditorPDFs\((\d+),\s*['"](.*?)['"],\s*(\d+),\s*['"]\{([a-z0-9-]+)}['"],\s*['"]true['"]\);/g;

  function loadScripts(scripts, onload, documentElement) {
    if (scripts.length === 0) {
      if (onload instanceof Function) onload();
      return;
    }
    documentElement ||= document;
    const head = documentElement.head;
    scripts.forEach((src, idx) => {
      if (src.endsWith('.css')) {
        const el = document.createElement('link');
        el.rel = 'stylesheet';
        el.href = src;
        head.appendChild(el);
      } else {
        const el = document.createElement('script');
        head.appendChild(el);
        if (onload instanceof Function && idx === scripts.length - 1) {
          el.onload = onload;
        }
        el.src = src;
      }
    });
  }

  function main() {
    const $ = jQuery;
    const textarea = $('<textarea/>')
      .attr('rows', 15)
      .width('100%')
      .attr('placeholder', [
        '(Optional) Enter the IDs of the papers to be downloaded, one per line, leave empty to download all.',
        'Example:',
        'JMLC-D-23-00760',
        'JMLC-D-23-00762',
        'JMLC-D-23-00767',
      ].join('\n'));
    const progressbar = $('<div/>');
    const button = $('<button />')
      .on('click', function () {
        const paperIds = new Set(textarea.val()
          .split(/\r?\n/)
          .map(s => s.trim())
          .filter(s => s.length));
        const matches = Array.from(
          contentDocument.querySelectorAll('#FGSubmissions tr a[href^="javascript:viewEditorPDFs"]')
        )
          .map(a => a.href)
          .map(href => {
            pattern.lastIndex = 0;
            return pattern.exec(href);
          })
          .filter(match => paperIds.size === 0 || paperIds.has(match[2]));
        progressbar.progressbar({
          max: matches.length,
        });

        const button = $(this);
        const zip = new JSZip();
        let completedCount = 0;
        button.button({
          disabled: true,
          label: 'Downloading...',
        });
        Promise.all(
          matches
            .map(match =>
              'https://www.editorialmanager.com/jmlc/fileDownload.asp'
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
                  progressbar.progressbar({
                    value: ++completedCount,
                  });
                })
            })
        )
          .then(() => {
            button.button({
              label: 'Dumping...',
            });
            return zip.generateAsync({type: 'blob'});
          })
          .then(blob => saveAs(blob, 'download.zip'))
          .catch(error => {
            alert(`Error while downloading: ${error}`);
            console.error(error);
          })
          .finally(() => {
            button.button({
              disabled: false,
              label: 'Start',
            });
          });
      })
      .button({
        disabled: false,
        label: 'Start',
      });
    $('<div/>')
      .append(textarea)
      .append(progressbar)
      .append(button)
      .dialog({
        title: 'Batch Download',
        width: 800,
        closeOnEscape: false,
        beforeClose: function () {
          return button.button('option', 'label') === 'Start';
        },
        create: function () {
          $(this).dialog('widget').on('click', (e) => {
            e.stopPropagation();
          });
        },
        close: function () {
          $(this).dialog('destroy').remove();
        }
      });
  }

  loadScripts([
    'https://cdn.staticfile.org/jszip/3.10.1/jszip.min.js',
    'https://cdn.staticfile.org/FileSaver.js/2.0.5/FileSaver.min.js',
  ]);
  loadScripts([
    'https://cdn.staticfile.org/jqueryui/1.13.2/themes/base/jquery-ui.min.css',
    'https://cdn.staticfile.org/jquery/3.7.0/jquery.min.js',
    'https://cdn.staticfile.org/jqueryui/1.13.2/jquery-ui.min.js',
  ], main, contentDocument);
})();
