
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
    $("input[type='text']").keydown(function(event){ //CHANGE IT TO BUTTON 
        var keypress = event.which;
        if(keypress===13 || keypress===27){ 	//enter key = 13
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
      if(keypress===27){
        const parsedData = data[0];
        console.log(keypress);
        dictionary(parsedData);

      }else if(keypress===13){
        const thesaurusData = data[1];
        console.log(keypress);
        thesaurus(thesaurusData);
        
      }
   
    
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
//Synonyms
function thesaurus(parsedData){
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
            printThesaurus(parsedData);
            // printResults(thesaurusData);
        }
    }else{
        alert("Oh no, something went wrong: " + httpRequest.status + " " + httpRequest.responseText);
}
    
}
//Thesaurus print
function printThesaurus(parsedData){


    for(var i = 0; i < Object.entries(parsedData).length; i++)
   {
       var element =parsedData[i].meta.syns;
       var x = element.toString();
       var res = element.join(" , ");
       console.log(typeof res); 
    

    // $("ul").append("<li>" + x.split(',').join('</li><li>') + "</li>");  
    // $("ul").append("<li>" + res + "</li>");     
    $("ul").append("<li><strong>"+ parsedData[i].hwi.hw +"  </strong> <br></li>" + "<li>" + x.split(',').join('</li><li>') + "</li>");     
          
    //    console.log("syns: " + parsedData[i].meta.syns + "syns: " + parsedData[i].hwi.hw); 
   }
   
 

//     parsedData.meta.forEach(data=>{
//         //We found the word but there is no first known date
 
        
//          if (data === undefined || data.syns === undefined) {
//                 data.syns = "No synonym found";
//                 $("ul").append("<li><strong>"+ data.hwi.hw +"  </strong>"+ data.shortdef + "<br>"+ data.syns + "</li>");     
//         }else{
//             $("ul").append("<li><strong>"+ data.hwi.hw +"  </strong>"+ data.shortdef + "<br><strong>"+ data.syns+ "</strong></li>");
//         }
// })
}





function checkStatus(httpRequest) {
  if (httpRequest.ok) {
    return Promise.resolve(httpRequest);
  } else {
    return Promise.reject(new Error(httpRequest.statusText));
  }
}

function parseJSON(httpRequest) {
    return httpRequest.json();
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
