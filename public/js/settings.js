var update = document.getElementById('update');
var cancel = document.getElementById('cancel');

update.addEventListener('click',function(event){
                                                  var flag=0;												   
                                                  var name=document.getElementById('name');
                                                  var mail=document.getElementById('email');
                                                  var pass=document.getElementById('pass');
                                                  var nameerr=document.getElementById('nameerr');
                                                  var emailerr=document.getElementById('emailerr');
                                                  var passerr=document.getElementById('passerr');
                                                  name.addEventListener("keydown",function(event){ nameerr.innerHTML="";});
                                                  mail.addEventListener("keydown",function(event){ emailerr.innerHTML="";});
                                                  pass.addEventListener("keydown",function(event){ passerr.innerHTML="";});
                                                  if(name.value=="")
                                                  {
                                                    nameerr.innerHTML="Please fill this field";  
                                                    flag=1;
                                                  }
                                                  if(mail.value=="")
                                                  {
                                                    emailerr.innerHTML="Please fill this field";  
                                                    flag=1;  
                                                  }
                                                  if(pass.value=="")
                                                  {
                                                    passerr.innerHTML="Password is required";  
                                                    flag=1;
                                                  }
                                                  if(flag==0)
                                                  {
                                                      var user={
                                                                 name:name.value,
                                                                 email:mail.value,
                                                                 pass:pass.value
                                                               }
                                                      user = JSON.stringify(user);
                                                      var request = new XMLHttpRequest();
													                            request.open('POST', '/update');
                                                      request.send(user);
                                                      request.addEventListener('load',function(){
                                                                                                  var res=request.responseText;
                                                                                                  res=JSON.parse(res); 
                                                                                                  if(res.name==1)
                                                                                                  {
                                                                                                    nameerr.innerHTML="Name has already been taken";
                                                                                                    flag=1;
                                                                                                  }
                                                                                                  if(res.email==1)
                                                                                                  {
                                                                                                    emailerr.innerHTML="Email address is already taken";
                                                                                                    flag=1;
                                                                                                  }
                                                                                                  if(res.pass==1)
                                                                                                  {
                                                                                                    passerr.innerHTML="Incorrect password";  
                                                                                                    flag=1;
                                                                                                  }
                                                                                                  if(flag==0)
                                                                                                  {
                                                                                                    var req = new XMLHttpRequest();
                                                                                                    req.open('POST', '/updateSave');
                                                                                                    req.send(user);
                                                                                                    req.addEventListener('load',function(){
                                                                                                                                            alert("Player data updated!!!");
                                                                                                                                            window.location.replace("/main");
                                                                                                                                          });
                                                                                                  }
                                                                                                });         
                                                  }
                                               });

cancel.addEventListener('click',function(){
                                                window.location.replace("/main");
                                          });                                               