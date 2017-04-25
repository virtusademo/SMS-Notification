var express = require('express');
var bodyParser = require('body-parser');

//var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
//var appEnv = cfenv.getAppEnv();

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var client = require('twilio')('ACee28aeaa812de98942d4911af4caf00a', '14fc10dc8bc81e1653be6480fb2e5baa');

// start server on the specified port and binding host


app.get('/', function(req, res){
	res.sendFile(__dirname+'/public/index.html');
});

app.post('/myaction',urlencodedParser, function(req, res) {
	//console.log("Data : ", req.query.data);
	//var data = req.query.data;
    client.sendMessage({
        to: req.body.mobile, // Any number Twilio can deliver to
        from: '+16692315652', // A number you bought from Twilio and can use for outbound communication
        body: req.body.data // body of the SMS message
	},  
    function(err, responseData) { //this function is executed when a response is received from Twilio
        console.log(err);
        if (!err) { // "err" is an error received during the request, if any          
            console.log(responseData.from); // outputs "+14506667788"
            console.log(responseData.body); // outputs "word to your mother."
            console.log(responseData); // outputs "word to your mother."
            res.send("Message sent successfully to " +req.body.mobile);
            //var newdata = "Message sent successfully to " +req.body.mobile;
            //var temp = "<script type = 'text/javascript'> ;jsonData = " + JSON.stringify(newdata) + "</script>";
            //console.log(newdata);
            //res.send( temp + );
            
            //res.sendFile(__dirname+'/public/index.html?jsonData='+newdata);
  
            
        }
    });
});

app.listen(8080, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + "https://localhost:8080");
});
