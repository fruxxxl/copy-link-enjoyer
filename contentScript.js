document.addEventListener('copy', (event) => {
  event.preventDefault();

  chrome.storage.sync.get(['markdownCopyEnabled'], function(result) {
    if (result.markdownCopyEnabled) {
      const selection = document.getSelection().toString();
      if (selection) {
        const currentUrl = window.location.href;
        const formattedMarkdownLink = `[${selection}](${currentUrl})`;
        navigator.clipboard.writeText(formattedMarkdownLink).then(() => {
          showToast(`Copied as a markdown link: ${formattedMarkdownLink}`);
          saveLink(formattedMarkdownLink);
        }).catch(err => {
          console.error('Copy error: ', err);
        });
      }
    } else {
      navigator.clipboard.writeText(document.getSelection().toString()).then(() => {
        showToast("Текст скопирован");
      }).catch(err => {
        console.error('Copy error текста: ', err);
      });
    }
  });
});

function saveLink(link) {
  chrome.storage.sync.get('copiedLinks', (data) => {
      const links = data.copiedLinks || [];
      links.push(link);
      chrome.storage.sync.set({copiedLinks: links});
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = 'black';
  toast.style.color = 'white';
  toast.style.padding = '10px';
  toast.style.zIndex = '1000';
  toast.style.borderRadius = '5px';
  toast.style.fontSize = '14px';
  document.body.appendChild(toast);


  setTimeout(() => {
    document.body.removeChild(toast);
  }, 3000);
}