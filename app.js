var express = require('express');

var body-parser = require('body-parser');

var app = express();

//app.use(express.static('public'));

var port = 3000;

app.listen(port,function(err){
                                if(err)
                                return console.log('something went wrong :',err);
                                console.log('server is listening on '+port);	
                             });

 app.get('/',function(req,res){
                                res.send("working");
                              });  

app.get('/About',function(req,res){
                                   res.send("About page");
                                  });  
