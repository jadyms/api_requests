var request = require('request');
const API_URL= 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'
const API_KEY= '9e367c26-13d3-4ef2-9d5a-9ec3906204a4';
const word = 'apple';
const url = `${API_URL}${word}&?key=${API_KEY}`;
   
// app.set("view engine", "ejs");


request(url, function(error, response, body){
if(!error && response.statusCode == 200){
  
        const data = JSON.parse(body);
        console.log(data)
        // res.render("index", {data: data});


    }

});
