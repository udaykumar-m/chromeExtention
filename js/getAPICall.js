export const makeAPICall = async ( apiKey, apiURL, query ) => {
    return new Promise((resolve, reject) => { fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content":query}], 
            "max_tokens": 100,
            "temperature": 1,
        })
        }).then(response => response.json())
        .then(data => {
            console.log(data) 
            data = data.choices[0].message.content.replace(/\n/, "")
            data = data.replace(/A:/g, "\nA:")
            resolve(data.replace(/\n/g, '<br>'));
        })
        .catch(error => {
            reject(error);
        })
    })
}