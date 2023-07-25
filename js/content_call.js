import { makeAPICall } from "./getAPICall.js";
import keyData from "./APIKey.js";


const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');
console.log('title : '+title);
$('.title').text(title)
$('.text').hide();

let value

const getResult = async (param) =>{
    $('.text').hide();
    $('.spinner').show('100');
    let query
    if (title === 'Meaning and Usage') 
        query = `Define the word "${param}" concisely`
    else if (title === 'Instagram Caption') 
        query = `Create a captivating Instagram caption on : "${param}" concisely`
    else if (title === 'Generate a Tweet') 
        query = `Compose a concise tweet about "${param}"`

    console.log(query)
    let generatedText = await makeAPICall(keyData.apiKey, "https://api.openai.com/v1/completions", query) ;
    console.log(generatedText)
    document.getElementById('meaning').innerHTML = generatedText ;
    if (title === 'Meaning and Usage') {
        query = `concise sentence using the word ${param}`
        generatedText = await makeAPICall(keyData.apiKey, "https://api.openai.com/v1/completions", query) ;
        console.log(generatedText)
        generatedText = `<b>${param}</b> usage : `+ generatedText.replace(/<br>/g, "");
        document.getElementById('usage').innerHTML = generatedText ;
    }
    $('.spinner').hide('100');
    $('.text').show('200');
}


if (localStorage.getItem("selectedValue")) {
    value = localStorage.getItem("selectedValue");
    console.log('selected value :'+value)
    getResult(value)
}
else{
    $('.spinner').hide('100');
    $('.text').show(400);
}

$("#find").click(function() {
    var inputValue = $("#search").val();
    getResult(inputValue)
});

$("#search").keypress(function(event) {
    if (event.which === 13){
        var inputValue = $("#search").val();
        getResult(inputValue)
    }
});