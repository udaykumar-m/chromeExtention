import { makeAPICall } from "./getAPICall.js";
import { apiKey } from "./APIKey.js";

const getSearchParams = (url) =>{
    const { searchParams } = new URL(url);
    const q = searchParams.get('q');
    console.log(q);
    return q != null ? q : ''
}

const getSelectedText = () => {
    return new Promise((resolve) => {
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            if (message.action === "selectedText") {
                const selectedText = message.data;
                console.log("Selected text:", selectedText);
                resolve(selectedText);
            }
        });
    });
};

const injectContentScript = async (tab) => {
    const {id, url} = tab;
    let params = getSearchParams(url)
    const query = "I need a unique joke on "+ params
    
    const generatedText = await makeAPICall(apiKey, "https://api.openai.com/v1/completions", query) ;
    console.log(generatedText)
    document.getElementById('apiResult').innerHTML = generatedText ;
    $('.spinner').hide('100');
    $('.text').show(400);

    let selectText = await getSelectedText()
    localStorage.setItem("selectedValue", selectText);
    
    console.log('return :'+ selectText)
    if (selectText){
        if (selectText.length > 12)
            selectText = selectText.substring(0, 12) + "...";
        document.getElementById('selected').innerHTML = `<br>The selected text is <b>"${selectText}"</b>. You can either select below actions for that text (or) Enter new in next page` ;
    }
}

const getCurrentTab = async () => {
    let queryOptions = { active: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
  
getCurrentTab().then((tab)=>{
    injectContentScript(tab)
})
