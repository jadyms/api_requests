//Initialize the object
const httpRequest = new XMLHttpRequest(); 
//URL parameters
const API_URL= 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'
const API_KEY= '9e367c26-13d3-4ef2-9d5a-9ec3906204a4';
var word;

//Content of the page div
const app = document.getElementById('box');

//Get user input 
function getWord(input) {
     $("ul").empty();       //clean results from last search
    word = $(input).val();  // grab text from input
        $(input).val("");   //clear search bar
    return word;
}

function urlBuilder(word){
    return url = `${API_URL}${word}&?key=${API_KEY}`;
     
}

    //When user hit enter
    $("input[type='text']").keypress(function(event){ //CHANGE IT TO BUTTON 
           if(event.which===13){ 	//enter key = 13
                word = getWord(this); //get user input
                url = urlBuilder(word); //get the url
                
                //Request a GET method to DICTIONARY api asynchronously 
                httpRequest.open('GET', url, true);
                //Send the Request
                httpRequest.send();
            }


        //In case the request could not be made
        httpRequest.onerror = function() {
            alert("The request could not be sent");
        }

    });

    // When response is received
    httpRequest.onload = function(){
        //Wrap the response under JSON format
        var parsedData = JSON.parse(httpRequest.response);

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
            }
        
        
        }else{
            alert("Oh no, something went wrong: " + httpRequest.status + " " + httpRequest.responseText);
    }
}
    

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
