//Initialize the object
const httpRequest = new XMLHttpRequest(); 
// httpRequest.responseType = "json";
//URL parameters
const API_URL= 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'
const API_KEY= '9e367c26-13d3-4ef2-9d5a-9ec3906204a4';

//const word = 'apple';


    

// httpRequest.onreadystatechange = processRequest;

// function processRequest(error){
//     if (httpRequest.readyState == 4 && httpRequest.status == 200){

//         console.log(httpRequest.response)
//     }
// }

const app = document.getElementById('box');
// const container = document.createElement('div');
// container.setAttribute('class', 'container');
// app.appendChild(container);



$("input[type='text']").keypress(function(e){
    	//enter key = 13
    	if(e.which===13){
            $("ul").empty();
    		// grab text from input
    	const word = $(this).val();
            $(this).val("");
           
            const url = `${API_URL}${word}&?key=${API_KEY}`;

            //Request a GET method to DICTIONARY api asynchronously 
httpRequest.open('GET', url, true);

//Send the Request
httpRequest.send();

    
httpRequest.onload = function(){
    var parsedData = JSON.parse(httpRequest.response);
   console.log(httpRequest.status)
   console.log("parsedData" + parsedData);
    console.log("type of" + typeof parsedData);
   console.log(Object.entries(parsedData).length > 0);
    // console.log("MEta" + parsedData[0].meta);

    if(Object.entries(parsedData).length < 0 ){
        alert("We could not find this word");
        return;
    }else
    if( parsedData[0].meta === undefined ){
        alert("We could not find this word");
        return;
    } else{



//     if(parsedData[0].meta === undefined || parsedData === undefined ){
//         alert("We could not find this word");
//         // $("ul").append("<li><strong>We could not find this word  </strong> </li>")
// return;
//     }

   

    // if(httpRequest.status >= 200 && httpRequest.status < 400){
       
        // console.log(typeof parsedData);
        parsedData.forEach(data=>{
           
        // console.log(parsedData[0].meta);
         
           
       
        if (data === undefined || data.date === undefined) {
 data.date = "No date found";
 $("ul").append("<li><strong>"+ data.hwi.hw +"  </strong>"
                                          + data.shortdef + 
                                         "<br>"+ data.date + 
                                       
                                         "</li>")
      
                                        //  console.log(typeof data.date + data.date);
       
}else if    (Object.keys(parsedData).length == 0){
 console.log("Empty object");

}else {
  

            // const card = document.createElement('div');
            // card.setAttribute('  class', 'card');

            // const h1 = document.createElement('h1');
            //h1.textContent = data.date;
           // container.appendChild(h1);
            // $("ul").append("<li><span><i class='fas fa-trash-alt'></i></span> "+ data.hwi.hw +"<br>"+ data.date + "</li")
        $("ul").append("<li><strong>"+ data.hwi.hw +"  </strong>"
                                          + data.shortdef + 
                                         "<br><strong>"+ data.date + 
                                       
                                         "</strong></li>")
      
                                         console.log(typeof data.date + data.date);
        }
      
    
    })
       
    // }else{
      
        console.log('Error');
    }
   

};
    	}
    });


    
    

    




 


// $("input[type='text']").keypress(function(e){
// 	//enter key = 13
// 	if(e.which===13){
// 		// grab text from input
// 		var todoText = $(this).val();
// 		$(this).val("");

// 		$("ul").append("<li><span><i class='fas fa-trash-alt'></i></span> "+ todoText + "</li")

// 	}
// });


