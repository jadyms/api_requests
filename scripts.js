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

    //Request connection using promisses - adapted from https://w.trhou.se/bhriv87fql    
    function getPromisses(urls, keypress){
         // map() to handle each url response
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

 
        // Dictionary data validation
    function dictionary(parsedData){
        if(httpRequest.status === 0 || httpRequest.status >= 200 && httpRequest.status < 400){
            
            // Check if the reponse is an empty object
            if(Object.entries(parsedData).length < 0 || Object.entries(parsedData).length == 0){
                // Inform that no word was found
                printArraySuggestion(1,"#date",parsedData);
                return;
            //Response is not empty, but instead, it is an array of
            //suggested words 
            }else if( parsedData[0].meta === undefined ){
                // display array of suggested words
                printArraySuggestion(0,"#date",parsedData);
                return;
            }else{
                //Display the response
                printResults(parsedData);
            }
        }else{
            alert("Oh no, something went wrong: " + httpRequest.status + " " + httpRequest.responseText);
        }
        
    }
     //Display Dictionary Results
    function printResults(parsedData){
        parsedData.forEach(data=>{
            //We found the word but there is no first known date
             if (data === undefined || data.date === undefined) {
                data.date = "Date not found";
                $("#date").append("<li><strong>"+ data.hwi.hw +"  </strong>"+ data.shortdef + "<br>"+ data.date + "</li>");     
            }else{ //Print short definition and date
                $("#date").append("<li><strong>"+ data.hwi.hw +"  </strong>"+ data.shortdef + "<br><strong><span>"+ data.date + "</span></strong></li>");
            }
    })
}
    
    
    //Synonyms data validation
    function thesaurus(parsedData){
        if(httpRequest.status === 0 || httpRequest.status >= 200 && httpRequest.status < 400){
            
            // Check if the reponse is an empty object
            if(Object.entries(parsedData).length < 0 || Object.entries(parsedData).length == 0){
                printArraySuggestion(1,"#syn",parsedData);
                return;
            //Response is not empty, but instead, it is an array of suggested words 
            }else if( parsedData[0].meta === undefined ){
                printArraySuggestion(0,"#syn",parsedData);
                return;
            }else{
                printThesaurus(parsedData);
            }
        }else{
            alert("Oh no, something went wrong: " + httpRequest.status + " " + httpRequest.responseText);
    }
        
    }
    //Display synonyms results
    function printThesaurus(parsedData){
        for(var i = 0; i < Object.entries(parsedData).length; i++){
            var element =parsedData[i].meta.syns;
            var x = element.toString(); //Parse it into string and print
             $("#syn").append("<li><strong>"+ parsedData[i].hwi.hw +"  </strong> <br></li>" + "<li>" + x.split(',').join('</li><li>') + "</li>");     
        }
    
    }

    //Print error messages
function printArraySuggestion(type,elementId,parsedData){
    if(type === 1){ //If there is no array of suggestions 
        $(elementId).append( "<li> Word not found</li>");   //Print message
    }else{ //Loop through the array
    for(var i = 0; i < Object.entries(parsedData).length; i++){
       var element = parsedData[i];// print the suggestions
       $(elementId).append( "<li> Word not found. Suggestion: " + element.split(',').join('</li><li>') + "</li>");  
}
    }
}

    //In case the request could not be made
    httpRequest.onerror = function() {
        alert("The request could not be sent");
    }

    //Check responnse status
    function checkStatus(httpRequest) {
        if (httpRequest.ok) {//If 200
            return Promise.resolve(httpRequest); //success
        } else {
            return Promise.reject(new Error(httpRequest.statusText)); //operation failed
        }
    }
  
    //Parse response into JSON format
    function parseJSON(httpRequest) {
        return httpRequest.json();
    }

    //Load the html tab functions 
    function openPage(pageName,elmnt,color) {
        var i, tabcontent, tablinks;
        //Get the tab content
        tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none"; //Hide default
        }
        //Get the tab name
        tablinks = document.getElementsByClassName("tablink");
            for (i = 0; i < tablinks.length; i++) {
            tablinks[i].style.backgroundColor = "";//grey color by default
        }
    
        document.getElementById(pageName).style.display = "block";
        elmnt.style.backgroundColor = color;
  }
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();

     

