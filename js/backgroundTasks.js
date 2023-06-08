chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "getSelectedText") {
        const selectedText = message.data;
        console.log("Selected text:", selectedText);
        
        setTimeout(function() {
            // Code to send or receive messages after the delay
            chrome.runtime.sendMessage({
                action: "selectedText",
            data: selectedText,
            });
        }, 2000);
    }
});