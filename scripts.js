//Initialize the object
const httpRequest = new XMLHttpRequest(); 
//URL parameters dictionary
const API_URL= 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'
const API_KEY= '9e367c26-13d3-4ef2-9d5a-9ec3906204a4';
// URL parameter thesaurus
const API_URL_SYN= 'https://www.dictionaryapi.com/api/v3/references/thesaurus/json/'
const API_KEY_SYN= '28bf78be-74f2-4f03-ad93-0ec25c9ac443';
var word;//To hold user input
var urls; //Array of urls

//Content of the page div
// const app = document.getElementById('box');

    //Get user input 
    function getWord(input) {
        $("ul").empty();       //clean results from last search
        word = $(input).val();  // grab text from input
            $(input).val("");   //clear search bar
        return word;
    }

    //Concatenate url and key value
    function urlBuilder(word){
        var urlDictionary = `${API_URL}${word}&?key=${API_KEY}`;
        var urlThesaurus = `${API_URL_SYN}${word}&?key=${API_KEY_SYN}`;
        return [urlDictionary, urlThesaurus];
    }

    //When user hit enter on the search bar, get the word to be searched
    //and request connection
    $("input[type='text']").keydown(function(event){ 
        var keypress = event.which;
        if(keypress===13){ 	//enter key = 13
                word = getWord(this); //get user input
                urls = urlBuilder(word);
                getPromisses(urls, keypress);
           }
        })

    //Request connection using promisses    
    function getPromisses(urls, keypress){
         // use map() to perform a fetch and handle the response for each url
         
         Promise.all(urls.map(url =>
            fetch(url)
            .then(checkStatus) 
            .then(parseJSON)
            .catch(error => alert('There was a problem!', error))))
            .then(data => {
                if(keypress===13){
                    //Dictionary tab
                    const parsedData = data[0];
                    dictionary(parsedData);
                    //Thesaurus tab
                    const thesaurusData = data[1];
                    thesaurus(thesaurusData);
                }  
            })
                
        }

    //In case the request could not be made
    httpRequest.onerror = function() {
        alert("The request could not be sent");
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

    function dictionary(parsedData){
        if(httpRequest.status === 0 || httpRequest.status >= 200 && httpRequest.status < 400){
            
            // Check if the reponse is an empty object
            if(Object.entries(parsedData).length < 0 || Object.entries(parsedData).length == 0){
                alert("ZERO MATCHES - We could not find this word");
                return;
            //Response is not empty, but instead, it is an array of
            //suggested names 
            }else if( parsedData[0].meta === undefined ){
                // alert("DID YOU MEAN" + parsedData[0] );
                
                printArraySuggestion("#date",parsedData);
                return;
            }else{
                printResults(parsedData);
                // printResults(thesaurusData);
        
            }
        
        }else{
            alert("Oh no, something went wrong: " + httpRequest.status + " " + httpRequest.responseText);
    }
        
    }

function printArraySuggestion(elementId,parsedData){

    for(var i = 0; i < Object.entries(parsedData).length; i++)
   {
       var element = parsedData[i];
           $(elementId).append( "<li> Word not found. Suggestion: " + element.split(',').join('</li><li>') + "</li>");  
        //    $("#date").append( "<li> Word not found. Suggestion: " + element.split(',').join('</li><li>') + "</li>");    
        //    elementId
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
            // alert("DID YOU MEAN" + parsedData[0] );
            printArraySuggestion("#syn",parsedData);
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
    $("#syn").append("<li><strong>"+ parsedData[i].hwi.hw +"  </strong> <br></li>" + "<li>" + x.split(',').join('</li><li>') + "</li>");     
          
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
                    $("#date").append("<li><strong>"+ data.hwi.hw +"  </strong>"+ data.shortdef + "<br>"+ data.date + "</li>");     
                }else{
                    
                    $("#date").append("<li><strong>"+ data.hwi.hw +"  </strong>"+ data.shortdef + "<br><strong>"+ data.date + "</strong></li>");
                }
        })
    }



  function openPage(pageName,elmnt,color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
  }
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();

