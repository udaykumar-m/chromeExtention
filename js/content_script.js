const apiKey = "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";
const jokeApiUrl = "https://api.openai.com/v1/completions"

const getSearchParams = (url) =>{
    const { searchParams } = new URL(url);
    const q = searchParams.get('q');
    console.log('hihi')
    console.log(q);
    return q != null ? q : ''
}

const injectContentScript = (tab) => {
    const {id, url} = tab;
    let params = getSearchParams(url)
    
    const query = "give a joke on "+ params
    console.log('query : '+ query)
    fetch(jokeApiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            "model": "text-davinci-003",
            "prompt": query, 
            "max_tokens": 100,
            "temperature": 1,
        })
        }).then(response => response.json())
        .then(data => {
            console.log(data) 
            const generatedText = data.choices[0].text.replace(/\n/g, '<br>');
            console.log(generatedText)
            document.getElementById('joke').innerHTML = generatedText ;
            $('.spinner').hide('100');
            $('.joke').show(400);
        })
        .catch(error => {
            console.log("Error:", error);
    });
}

getCurrentTab = async () => {
    let queryOptions = { active: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
  
getCurrentTab().then((tab)=>{
    injectContentScript(tab)
})
