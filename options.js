document.addEventListener('DOMContentLoaded', () => {
  restoreOptions()
  const markdownCopyCheckbox = document.getElementById('markdownCopyCheckbox');
  
  chrome.storage.sync.get(['markdownCopyEnabled'], function(result) {
    markdownCopyCheckbox.checked = result.markdownCopyEnabled || false; // По умолчанию false, если значение не найдено
  });

  markdownCopyCheckbox.addEventListener('change', () => {
    chrome.storage.sync.set({'markdownCopyEnabled': markdownCopyCheckbox.checked}, function() {
      console.log('The markdownCopyEnabled is set to ' + markdownCopyCheckbox.checked);
    });
  });
});


document.getElementById('clearLinks').addEventListener('click', clearCopiedLinks);

function restoreOptions() {
    chrome.storage.sync.get('copiedLinks', (data) => {
        if (data.copiedLinks) {
            displayCopiedLinks(data.copiedLinks);
        }
    });
}

function displayCopiedLinks(links) {
    const listElement = document.getElementById('linksList');
    listElement.innerHTML = ''; // Очистить текущий список
    links.forEach((link) => {
        const linkElement = document.createElement('div');
        linkElement.textContent = link;
        listElement.appendChild(linkElement);
    });
}

function clearCopiedLinks() {
    chrome.storage.sync.set({copiedLinks: []}, () => {
        displayCopiedLinks([]); // Очистить отображаемый список
    });
}

