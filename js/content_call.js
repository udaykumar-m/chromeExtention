import { makeAPICall } from "./getAPICall.js";
const apiKey = "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";


const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');
console.log('title : '+title);
$('.title').text(title)
$('.text').hide();

let value

const getResult = async (param) =>{
    let query = `simple Meaning of word ${param}`
    console.log(query)
    let generatedText = await makeAPICall(apiKey, "https://api.openai.com/v1/completions", query) ;
    console.log(generatedText)
    document.getElementById('apiResult').innerHTML = generatedText ;
    query = `simple usage of word ${param}`
    generatedText = await makeAPICall(apiKey, "https://api.openai.com/v1/completions", query) ;
    console.log(generatedText)
    generatedText = `${param} usage`+ generatedText.replace(/<br>/g, "");
    document.getElementById('usage').innerHTML = generatedText ;
    $('.spinner').hide('100');
    $('.text').show(400);
}


if (localStorage.getItem("selectedValue")) {
    value = localStorage.getItem("selectedValue");
    console.log('selected value :'+value)
    getResult(value)
}
