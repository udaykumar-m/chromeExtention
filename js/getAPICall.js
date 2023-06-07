export const makeAPICall = async ( apiKey, apiURL, query ) => {
    return new Promise((resolve, reject) => { fetch(apiURL, {
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
            resolve(data.choices[0].text.replace(/\n/g, '<br>'));
        })
        .catch(error => {
            reject(error);
        })
    })
}