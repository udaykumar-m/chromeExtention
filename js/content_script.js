import { makeAPICall } from "./getAPICall.js";
const apiKey = "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";

const getSearchParams = (url) =>{
    const { searchParams } = new URL(url);
    const q = searchParams.get('q');
    console.log('hihi')
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
    let selectText = await getSelectedText()
    
    console.log('return :'+ selectText)
    const query = "I need a unique joke on "+ params
    console.log('query : '+ query)
    
    const generatedText = await makeAPICall(apiKey, "https://api.openai.com/v1/completions", query) ;
    console.log(generatedText)
    document.getElementById('joke').innerHTML = generatedText ;
    $('.spinner').hide('100');
    $('.joke').show(400);

    if (selectText) 
    document.getElementById('selected').innerHTML = "The selected text is : \""+ selectText ;

}

const getCurrentTab = async () => {
    let queryOptions = { active: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
  
getCurrentTab().then((tab)=>{
    injectContentScript(tab)
})
