chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        const selectedText = window.getSelection().toString();
        chrome.runtime.sendMessage({
          action: "getSelectedText",
          data: selectedText,
        });
      },
    });
  });
