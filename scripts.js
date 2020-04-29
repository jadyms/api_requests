
//Initialize the object
const httpRequest = new XMLHttpRequest(); 
//URL parameters dictionary
const API_URL= 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'
const API_KEY= '9e367c26-13d3-4ef2-9d5a-9ec3906204a4';
// URL parameter thesaurus
const API_URL_SYN= 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/'
const API_KEY_SYN= '28bf78be-74f2-4f03-ad93-0ec25c9ac443';
var word;

var urls;

//Content of the page div
const app = document.getElementById('box');

//Get user input 
function getWord(input) {
     $("ul").empty();       //clean results from last search
    word = $(input).val();  // grab text from input
        $(input).val("");   //clear search bar
    return word;
}

//Dictionary url
function urlBuilder(word){
    return url = `${API_URL}${word}&?key=${API_KEY}`;
     
}

//THESAURUS url
function urlBuilderThesaurus(word){
    return urlThesaurus = `${API_URL_SYN}${word}&?key=${API_KEY_SYN}`;
     
}

   

    //When user hit enter
    $("input[type='text']").keypress(function(event){ //CHANGE IT TO BUTTON 
        var keypress =   event.which;
        if(keypress===13){ 	//enter key = 13
                word = getWord(this); //get user input
                url = urlBuilder(word); //get the url
                urlThesaurus = urlBuilderThesaurus(word);

                urls = [url, urlThesaurus];
                getPromisses(urls, keypress);

           }

           function getPromisses(urls, keypress){


                // use map() to perform a fetch and handle the response for each url
Promise.all(urls.map(url =>
    fetch(url)
      .then(checkStatus)                 
      .then(parseJSON)
      .catch(error => console.log('There was a problem!', error))
  ))
  .then(data => {
      if(keypress===13){
        const parsedData = data[0];
        dictionary(parsedData);

      }
   
    const thesaurusData = data[1];
    // do something with the data
    //Wrap the response under JSON format
    // var parsedData = JSON.parse(httpRequest.response);

   
  })
                // //Request a GET method to DICTIONARY api asynchronously 
                // httpRequest.open('GET', url, true);
                // //Send the Request
                // httpRequest.send();
            }


        // //In case the request could not be made
        // httpRequest.onerror = function() {
        //     alert("The request could not be sent");
        // }

    });


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------


function dictionary(parsedData){
    if(httpRequest.status === 0 || httpRequest.status >= 200 && httpRequest.status < 400){
        
        // Check if the reponse is an empty object
        if(Object.entries(parsedData).length < 0 || Object.entries(parsedData).length == 0){
            alert("ZERO MATCHES - We could not find this word");
            return;
        //Response is not empty, but instead, it is an array of
        //suggested names 
        }else if( parsedData[0].meta === undefined ){
            alert("DID YOU MEAN" + parsedData[0] );
            return;
        }else{
            printResults(parsedData);
            // printResults(thesaurusData);
      
        }
    
    
    }else{
        alert("Oh no, something went wrong: " + httpRequest.status + " " + httpRequest.responseText);
}
    
}
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function parseJSON(response) {
    return response.json();
  }


    
    // When response is received
//     httpRequest.onload = function(){
//         //Wrap the response under JSON format
//         var parsedData = JSON.parse(httpRequest.response);

//         if(httpRequest.status === 0 || httpRequest.status >= 200 && httpRequest.status < 400){
            
//             // Check if the reponse is an empty object
//             if(Object.entries(parsedData).length < 0 || Object.entries(parsedData).length == 0){
//                 alert("ZERO MATCHES - We could not find this word");
//                 return;
//             //Response is not empty, but instead, it is an array of
//             //suggested names 
//             }else if( parsedData[0].meta === undefined ){
//                 alert("DID YOU MEAN" + parsedData[0] );
//                 return;
//             }else{
//                 printResults(parsedData);
//             }
        
        
//         }else{
//             alert("Oh no, something went wrong: " + httpRequest.status + " " + httpRequest.responseText);
//     }
// }
    

        function printResults(parsedData){
            parsedData.forEach(data=>{
                //We found the word but there is no first known date
                 if (data === undefined || data.date === undefined) {
                        data.date = "No date found";
                        $("ul").append("<li><strong>"+ data.hwi.hw +"  </strong>"+ data.shortdef + "<br>"+ data.date + "</li>");     
                }else{
                    $("ul").append("<li><strong>"+ data.hwi.hw +"  </strong>"+ data.shortdef + "<br><strong>"+ data.date + "</strong></li>");
                }
        })
    }
