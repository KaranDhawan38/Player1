var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');

var handlebars = require('express-handlebars');

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

var port = process.env.PORT || 3000;
                                       
app.listen(port,function(err){
                                if(err)
                                return console.log('Something went wrong :',err);
                                console.log('Server is listening on '+port+'...');	
                             });

app.get('/',function(req,res){
                                res.render('index',{title:'Player1 | Login',
                                                    style: 'style.css',
                                                    script: 'script.js'      
                                                   });          
                             });                                                  

app.post('/save',function(req,res){
                                      var newUser = new user();
                                      newUser.name = req.body.name;
                                      newUser.email = req.body.email;
                                      newUser.password = req.body.password;
                                      newUser.status = req.body.status;
                                      newUser.save(function(err,doc){
                                                                      if(err)
                                                                      res.send('Error during insertion of records.');
                                                                      else
                                                                      res.redirect('/');
                                                                    });
                                  }); 
                                  
app.post('/nameCheck',function(req,res){
                                          readJSONBody(req, function(task) {
                                                                             getUsers(function(userList){
                                                                                                           var flag=0;
                                                                                                           for(var i=0;i<userList.length;i++)
                                                                                                           {
                                                                                                             if(userList[i].name==task.name)
                                                                                                             {
                                                                                                               flag=1;
                                                                                                               break;
                                                                                                             }
                                                                                                           }
                                                                                                           if(flag==0)
                                                                                                           res.send({flag:0});
                                                                                                           else
                                                                                                           res.send({flag:1});
                                                                                                        });
                                                                           });   
                                       });     
                                       
app.post('/emailCheck',function(req,res){
                                         readJSONBody(req, function(task) {
                                                                           getUsers(function(userList){
                                                                                                         var flag=0;
                                                                                                         for(var i=0;i<userList.length;i++)
                                                                                                         {
                                                                                                           if(userList[i].email==task.email)
                                                                                                           {
                                                                                                             flag=1;
                                                                                                             break;
                                                                                                           }
                                                                                                         }
                                                                                                         if(flag==0)
                                                                                                         res.send({flag:0});
                                                                                                         else
                                                                                                         res.send({flag:1});
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

/*var courses=[
                {id:1, name:"course1"},
                {id:2, name:"course2"},
                {id:3, name:"course3"},
              ];

app.get('/',function(req,res){
                                res.send("working");
                              });  

app.get('/api/courses',function(req,res){
                                         res.send(courses);
                                        });  

/*app.get('/api/courses/:id',function(req,res){
                                             const course = courses.find(c => c.id === parseInt(req.params.id));
                                             if(!course)
                                             res.status(404).send("Course was not found");
                                             else
                                             res.send(course);
                                            }); 

/*app.post('/api/courses',function(req,res){
                                            const course = {
                                                             id: courses.length+1,
                                                             name: req.body.name
                                                           };
                                            courses.push(course);
                                            res.send(course);               
                                         });    
                                         
app.put('/api/courses/:id',function(req,res){
                                              const course = courses.find(c => c.id === parseInt(req.params.id));
                                              if(!course)
                                              res.status(404).send("Course was not found");
                                              course.name = req.body.name;
                                              res.send(course);
                                            });*/ 


                                            
                                            


