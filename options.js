document.addEventListener('DOMContentLoaded', () => {
  const markdownCopyCheckbox = document.getElementById('markdownCopyCheckbox');

  // Чтение начального состояния checkbox из chrome.storage.sync
  chrome.storage.sync.get(['markdownCopyEnabled'], function(result) {
    markdownCopyCheckbox.checked = result.markdownCopyEnabled || false; // По умолчанию false, если значение не найдено
  });

  // Обработчик изменения состояния checkbox
  markdownCopyCheckbox.addEventListener('change', () => {
    // Сохранение нового состояния checkbox в chrome.storage.sync
    chrome.storage.sync.set({'markdownCopyEnabled': markdownCopyCheckbox.checked}, function() {
      console.log('The markdownCopyEnabled is set to ' + markdownCopyCheckbox.checked);
    });
  });
});