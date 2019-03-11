var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');

var handlebars = require('express-handlebars');

var session = require('express-session');

var nodemailer = require('nodemailer');

var xoauth2 = require('xoauth2');

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
                               res.redirect('/login');
                             });

app.get('/login',function(req,res){
                                    if(!req.session.ID)
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
                                    if(!req.session.ID)
                                    res.redirect('/');
                                    else
                                    res.render('main',{title:'Player1 | Main',
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

app.post('/mail',function(req,res){
                                    readJSONBody(req,function(task){
                                                                      var transporter = nodemailer.createTransport({
                                                                                                                    host: "smtp.gmail.com",
                                                                                                                    port: 465,
                                                                                                                    secure: true, // true for 465, false for other ports
                                                                                                                    auth: {
                                                                                                                            type: 'OAuth2',
                                                                                                                            user: 'karandhawan2014@gmail.com',
                                                                                                                            clientId: '199457004281-kkvk6c2349fvt9qsnjf4vre30mo7piuq.apps.googleusercontent.com',
                                                                                                                            clientSecret: '35CUE-Dtb_0yUuT8qbAgC0CC',
                                                                                                                            refreshTocken: '1/-K1sn1xc8oCQFs90ntjhfY-qhXQTTeTeDSpeClYwT34',
                                                                                                                            accessToken: 'ya29.GlvJBjJYnx3LrdpgtXGTFzXzdTr_Dm9re25wLhdh7zbUOLaLztP4SlsQSQ38a_AYUbU7VXaDPcqoTyY9TAsWp3Bi5-RwBCaiTBiOxDS_aroi3Fhw8-lMmnhoxesg'                                       
                                                                                                                          } 
                                                                                                                  });

                                                                      var mailOptions = {
                                                                                          from: '"PLAYER 1" <karandhawan2014@gmail.com>', // sender address
                                                                                          to: task.email, // list of receivers
                                                                                          subject: "Auto Generated code for Authentication", // Subject line
                                                                                          text: "Greatings Player, please put bellow code on PLAYER 1 login page.", // plain text body
                                                                                          html: "<h1>CODE : 1234</h1>" // html body
                                                                                        };  

                                                                      transporter.sendMail(mailOptions,function(err,info){
                                                                                                                          var status={sent:1};              
                                                                                                                          if(err)
                                                                                                                          {
                                                                                                                            console.log("Mail Could not be sent :"+err);
                                                                                                                            status.sent=0;
                                                                                                                          }
                                                                                                                          else
                                                                                                                           console.log("Mail sent");  
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
                                  
app.put('/updateSave',function(req,res){
                                          readJSONBody(req, function(task) {
                                                                                user.updateOne({_id: req.session.ID},{name: task.name ,email: task.email},function(err){
                                                                                                                                                                          if(err)
                                                                                                                                                                          return res.status(404).end();
                                                                                                                                                                          else
                                                                                                                                                                          {
                                                                                                                                                                            req.session.username=task.name;
                                                                                                                                                                            req.session.email=task.email;
                                                                                                                                                                            return res.status(202).json(err);
                                                                                                                                                                          }
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
                                                                                                        req.session.ID = userList[i]._id;
                                                                                                      } 
                                                                                                    }
                                                                                                    res.send(status); 
                                                                                                  });
                                                                     });                                
                                  }); 
                                  
app.get('/logout',function(req,res){
                                      req.session.destroy(function(){});
                                      res.redirect('/');
                                   });   
                                   
app.get('/settings',function(req,res){
                                        if(!req.session.ID)
                                        res.redirect('/');
                                        else
                                        res.render('settings',{
                                                                title:'Player1 | Settings',
                                                                style: 'settings.css',
                                                                script: 'settings.js',
                                                                jquery: 'settingsjquery.js',
                                                                username: req.session.username,
                                                                email: req.session.email     
                                                              });     
                                     });    
                                     
app.post('/update',function(req,res){
                                        readJSONBody(req, function(task) {
                                                                          getUsers(function(userList){ 
                                                                                                      var status={
                                                                                                                   name:0,
                                                                                                                   email:0,
                                                                                                                   pass:0,
                                                                                                                  };      
                                                                                                        /////finding name and email duplicasy//////
                                                                                                          var i;
                                                                                                          for(i=0;i<userList.length;i++)
                                                                                                          {
                                                                                                            if(userList[i].name!=req.session.username && userList[i].name==task.name)
                                                                                                            {
                                                                                                              status.name=1;
                                                                                                              break;
                                                                                                            }
                                                                                                          }
                                                                                                          for(i=0;i<userList.length;i++)
                                                                                                          {
                                                                                                            if(userList[i].email!=req.session.email && userList[i].email==task.email)
                                                                                                            {
                                                                                                              status.email=1;
                                                                                                              break;
                                                                                                            }
                                                                                                          }
                                                                                                      if(status.name==0 && status.email==0)
                                                                                                      {
                                                                                                        //////Checking if password is correct//////
                                                                                                        for(i=0;i<userList.length;i++)
                                                                                                        {
                                                                                                            if(userList[i]._id==req.session.ID)
                                                                                                            {
                                                                                                              if(userList[i].password!=task.pass)
                                                                                                              status.pass=1;
                                                                                                              break;
                                                                                                            }
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


                                            
                                            


