const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")
const app = express();

app.post("/failure" , function(req,res) {
    res.redirect("/");
    
})
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req , res){
    res.sendFile(`${__dirname}/signup.html`)
})

app.post("/", function(req, res){
    const FirstName = req.body.FirstName
    const LastName = req.body.SecondName
    const Email = req.body.Email
    const data = {
        members :[
            {
                email_address: Email,
                status: "subscribed",
                merge_fields:{
                    FNAME: FirstName,
                    LNAME: LastName
                }

            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https:/us17.api.mailchimp.com/3.0/lists/6ac1239b41"

    const options = {
        
        method: "POST",
        
        auth: "Divya1:7eca6684cf84c69fef1033dd5d8422eb-us17"
        
    }
const request = https.request(url, options , function(response){
    if(response.statusCode===200){
        res.sendFile(`${__dirname}/success.html`);
        response.on("data" , function(data){
            console.log(JSON.parse(data));
        })
    }else{
        res.sendFile(`${__dirname}/failure.html`);
    }
     

   })
    
    request.write(jsonData);
    request.end();
});



app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running");
})

//API Keys 7eca6684cf84c69fef1033dd5d8422eb-us17
//List ID 6ac1239b41}