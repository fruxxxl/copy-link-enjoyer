
# Copy Link Enjoyer

## Description
A browser extension for collecting sources while reading. Select text on a page and copy it as `[selected text](current page URL)` for a Markdown note, issue, or document.

The extension also keeps a list of copied links in its popup. The implementation is in [`contentScript.js`](contentScript.js) and [`options.js`](options.js).

**По-русски:** выделите текст на странице и скопируйте его вместе со ссылкой на источник. Получится готовая Markdown-ссылка для заметки или задачи.

## Installation
1. Download and unzip the extension archive.
2. Open the `chrome://extensions/` page in the Chrome browser.
3. Enable developer mode.
4. Click "Load unpacked extension" and select the extension folder.

## Usage
Enable Markdown copying in the extension popup, then select text on a webpage and copy it. The link points to the current page URL. Markdown copying is disabled by default.

## Configuration
You can enable or disable the Markdown link copying feature in the extension settings.

## Demo
[![Copy link enjoyer demo](https://img.youtube.com/vi/BBqqy8nU02o/0.jpg)](http://www.youtube.com/watch?v=BBqqy8nU02o)