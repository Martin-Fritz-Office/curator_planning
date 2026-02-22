(function () {
  function escapeHtml(value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function buildFootnoteList() {
    const section = document.getElementById('globalFootnotes');
    const list = document.getElementById('globalFootnoteList');
    if (!section || !list) return;

    const markers = Array.from(document.querySelectorAll('[data-footnote]'));
    if (!markers.length) {
      section.hidden = true;
      return;
    }

    list.innerHTML = '';

    markers.forEach((marker, index) => {
      const number = index + 1;
      const refId = `fnref-${number}`;
      const noteId = `fn-${number}`;
      const raw = marker.getAttribute('data-footnote') || '';
      const allowHtml = marker.getAttribute('data-footnote-html') === 'true';
      const noteHtml = allowHtml ? raw : escapeHtml(raw);

      const ref = document.createElement('sup');
      ref.className = 'fn-ref';
      ref.innerHTML = `<a href="#${noteId}" id="${refId}">${number}</a>`;
      marker.after(ref);

      const item = document.createElement('li');
      item.id = noteId;
      item.innerHTML = `${noteHtml} <a class="fn-back" href="#${refId}" aria-label="Back to footnote ${number}">↩</a>`;
      list.appendChild(item);
    });

    section.hidden = false;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildFootnoteList);
  } else {
    buildFootnoteList();
  }
})();
