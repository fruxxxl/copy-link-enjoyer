document.addEventListener('copy', (event) => {
  event.preventDefault(); // Отменяем стандартное действие

  chrome.storage.sync.get(['markdownCopyEnabled'], function(result) {
    if (result.markdownCopyEnabled) {
      const selection = document.getSelection().toString();
      if (selection) {
        const currentUrl = window.location.href;
        const formattedMarkdownLink = `[${selection}](${currentUrl})`;
        // Используем Clipboard API для установки форматированной ссылки в буфер обмена
        navigator.clipboard.writeText(formattedMarkdownLink).then(() => {
          showToast(`Скопированно как ссылка в md формате: ${formattedMarkdownLink}`);
        }).catch(err => {
          console.error('Ошибка при копировании: ', err);
        });
      }
    } else {
      // Если функция выключена, копируем текст в буфер обмена как обычно
      navigator.clipboard.writeText(document.getSelection().toString()).then(() => {
        showToast("Текст скопирован");
      }).catch(err => {
        console.error('Ошибка при копировании текста: ', err);
      });
    }
  });
});

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

  // Удаляем toast через 3 секунды
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 3000);
}