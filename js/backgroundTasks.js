chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "getSelectedText") {
        const selectedText = message.data;
        console.log("Selected text:", selectedText);
        
        chrome.runtime.sendMessage({
            action: "selectedText",
            data: selectedText,
        });
    }
});