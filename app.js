var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');

var handlebars = require('express-handlebars');

var session = require('express-session');

///////////////Database Working//////////////////////////////
var mongoose = require('mongoose');

require('./public/js/user.model');

mongoose.connect('mongodb://localhost:27017/project',{useNewUrlParser:true},function(err){
                                                                                         if(err)
                                                                                         console.log('Error connecting to Database: '+err);
                                                                                         else
                                                                                         console.log('Successfully connected to Database!!!');
                                                                                         }); 

var user = mongoose.model('users');                                                                                        
/////////////////////////////////////////////////////////////                                                                                       
                                                                                       

var app = express();

app.engine('handlebars',handlebars({extname: 'handlebars', defaultLayout: 'layout',layoutsDir: path.join(__dirname,'views/layouts')}));

app.set('view engine','handlebars');

app.use(express.static('public'));

app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(session({secret: 'canputanythinghere', resave: false, saveUninitialized: true}));

var port = process.env.PORT || 3000;
                                       
app.listen(port,function(err){
                                if(err)
                                return console.log('Something went wrong :',err);
                                console.log('Server is listening on port:'+port+'...');	
                             });

app.get('/',function(req,res){
                                if(!req.session.username)
                                {
                                  res.render('index',{title:'Player1 | Login',
                                                      style: 'style.css',
                                                      script: 'script.js',
                                                      jquery: 'index.js'      
                                                     });  
                                }
                                else                   
                                res.redirect('/main');
                             });
                            
app.get('/main',function(req,res){
                                    if(!req.session.username)
                                    res.redirect('/');
                                    else
                                    res.render('main',{title:'Player1 | main',
                                                       style: 'main.css',
                                                       script: 'main.js',
                                                       jquery: 'mainjquery.js',
                                                       username: req.session.username,
                                                       email: req.session.email     
                                                      });          
                                 }); 
                                  
app.post('/check',function(req,res){
                                          readJSONBody(req, function(task) {
                                                                             getUsers(function(userList){
                                                                                                           var status={
                                                                                                                        email:0,
                                                                                                                        name:0,
                                                                                                                        code:0,
                                                                                                                        stat:task.status
                                                                                                                      };
                                                                                                           var flag=0;
                                                                                                           if(userList.length==0);
                                                                                                           else
                                                                                                           {
                                                                                                            //////Check for name duplicacy////
                                                                                                              for(var i=0;i<userList.length;i++)
                                                                                                              {
                                                                                                                if(userList[i].name==task.name)
                                                                                                                {
                                                                                                                  flag=1;
                                                                                                                  break;
                                                                                                                }
                                                                                                              }
                                                                                                              if(flag==1)
                                                                                                              {
                                                                                                                status.name=1;
                                                                                                              }
                                                                                                              flag=0;
                                                                                                              //////Check for email duplicacy////
                                                                                                              for(var i=0;i<userList.length;i++)
                                                                                                              {
                                                                                                                if(userList[i].email==task.email)
                                                                                                                {
                                                                                                                  flag=1;
                                                                                                                  break;
                                                                                                                }
                                                                                                              }
                                                                                                              if(flag==1)
                                                                                                              status.email=1;
                                                                                                           }
                                                                                                           flag=0;
                                                                                                           if(task.status=="admin")
                                                                                                           {
                                                                                                            if(task.code!="1234")
                                                                                                            status.code=1;
                                                                                                           }
                                                                                                            res.send(status);            
                                                                                                        });
                                                                           });   
                                       }); 

app.post('/save',function(req,res){
                                    readJSONBody(req, function(task) {
                                                                      var newUser = new user();
                                                                      newUser.name = task.name;
                                                                      newUser.email = task.email;
                                                                      newUser.password = task.password;
                                                                      newUser.status = task.status;
                                                                      newUser.save(function(err,doc){
                                                                                                      if(err)
                                                                                                      res.send('Error during insertion of records.');
                                                                                                      else
                                                                                                      res.send("Success");
                                                                                                    });     
                                                                     });                                
                                  });                                                                              

app.post('/login',function(req,res){
                                    readJSONBody(req, function(task) {
                                                                       getUsers(function(userList){ 
                                                                                                    var status={
                                                                                                                email:0,
                                                                                                                pass:0,
                                                                                                               };
                                                                                                    if(userList.length==0);
                                                                                                    else
                                                                                                    {
                                                                                                      /////finding email in database//////
                                                                                                      var i;
                                                                                                      for(i=0;i<userList.length;i++)
                                                                                                      {
                                                                                                        if(userList[i].email==task.mail)
                                                                                                        {
                                                                                                          status.email=1;
                                                                                                          if(userList[i].password==task.pass)
                                                                                                          status.pass=1;
                                                                                                          break;
                                                                                                        }
                                                                                                      }
                                                                                                      if(status.email==1 && status.pass==1)
                                                                                                      {
                                                                                                        req.session.username = userList[i].name;
                                                                                                        req.session.email = userList[i].email;
                                                                                                      } 
                                                                                                    }
                                                                                                    res.send(status); 
                                                                                                  });
                                                                     });                                
                                  });       

function readJSONBody(req, callback) 
										   {
                        var body = '';
                        req.on('data', function(chunk) {
                                                          body += chunk;
                                                        });
                        
                        req.on('end', function() {
                                                    var data = JSON.parse(body);
                                                    callback(data);
                                                  });
                       }
                       
function getUsers(callback)
{
  user.find(function(err,docs){
                                if(err)
                                console.log('Error while retrieving data :'+err);
                                else
                                {
                                  callback(docs);
                                }
                              });                                                       
}                       


                                            
                                            


