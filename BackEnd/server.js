var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');



var mongoDB = 'mongodb://raja_pk_pk:2525154Abcde@ds239873.mlab.com:39873/rajamangodb'; // api key
mongoose.connect(mongoDB);  // connection to mangoDB with express

//
var Schema = mongoose.Schema; // for every model

var postSchema = new Schema({ // schema related to database
    title: String,
    content: String
});

var PostData = mongoose.model('post',postSchema);  // PostModel to be used//


//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });
    
app.post('/name', function(req, res){
    res.send("Hello you sent " +
    req.body.firstname + " " +
    req.body.lastname);
})

app.get('/', function (req, res) {
   res.send('Hello from Express');
})

app.post('/api/posts', function(req, res){
    console.log("post successful"); /////////////console window//////////////
    console.log(req.body.title);
    console.log(req.body.content);

    PostData.create({ // PostModel in Martins Lab//
        title:   req.body.title,
        content: req.body.content
    });

    console.log("Item added to DB"); ////////////Console Window//////////////
})

app.get('/api/posts', function(req, res){ // posting on website//

    PostData.find(function(err,data){    

        res.json(data);
    })
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})