var getUser=document.getElementById('signUpForm');//selecting the sign up form/////
var getId=document.getElementById('signInForm');//selecting the sign in form/////
var color=document.getElementById('color');
var userCount=0;

//////on page loading///////////////////////////////////
/*function load()
{
	request.open("GET","/getUsers");
	request.send();
	request.onload = function(){
								obj=request.responseText;
								obj=JSON.parse(obj);
							   };
	console.log(obj);						   						   					      
}*/


//////////////color picker/////////////////////////////			   
color.addEventListener("change",function(event){
	                                                var i;
																									var col=event.target.value; 
																									var head=document.getElementsByClassName("head");
																									for(i=0;i<head.length;i++)
																									head[i].style.borderBottomColor=col;
																									head=document.getElementsByClassName("form");
																									for(i=0;i<head.length;i++)
																									head[i].style.borderColor=col;
																									head=document.getElementsByClassName("input");
																									for(i=0;i<head.length;i++)
																									head[i].style.borderColor=col;
																									head=document.getElementsByClassName("code");
																									for(i=0;i<head.length;i++)
																									head[i].style.borderColor=col;
																									head=document.getElementsByClassName("inputButton");
																									for(i=0;i<head.length;i++)
																									{
																										head[i].style.borderColor=col;
																									}
																								});								 


///////////////When user creates account/////////////////
getUser.addEventListener("click",function(event){
																										var stat;
																										var flag=0;												   
																										var user=document.getElementById('user');
																										var admin=document.getElementById('admin');
																										var code=document.getElementById('code');
																										var name=document.getElementById('name');
																										var mail=document.getElementById('email');
																										var pass=document.getElementById('pass');
																										var codeerr=document.getElementById('codeerr');
																										var nameerr=document.getElementById('nameerr');
																										var emailerr=document.getElementById('emailerr');
																										var passerr=document.getElementById('passerr');
																										code.addEventListener("keydown",function(event){ codeerr.innerHTML="";});	
																										user.addEventListener("click",function(event){ codeerr.innerHTML="";});
																										admin.addEventListener("click",function(event){ codeerr.innerHTML="";});
																										name.addEventListener("keydown",function(event){ document.getElementById('nameerr').innerHTML="";});
																										mail.addEventListener("keydown",function(event){ document.getElementById('emailerr').innerHTML="";});
																										pass.addEventListener("keydown",function(event){ document.getElementById('passerr').innerHTML="";});
																										///////////check if any field is left empty////////////
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
																											passerr.innerHTML="Please fill this field";
																											flag=1;
																										}
																										if(user.checked==true)
																										stat="user"; 													
																										else if(admin.checked==true)
																										{														
																											if(code.value=="")
																											{
																												codeerr.innerHTML="Please fill the code";
																												flag=1;
																											}
																											else
																											{
																											  stat="admin";
																											}														
																										}
																										else
																										{
																											codeerr.innerHTML="Please choose one option";
																											flag=1;
																										}
																										if(flag==1);
																										/////////Send all fields to server for evaluation///////////////////
																										else
																										{
																											var user=new Object();
																											if(stat=="user")
																											{
																												user={
																															name: name.value,
																															email: mail.value,
																															password: pass,
																															status: stat 
																												     };
																											}   
																											else
																											{
																												user={
																															name: name.value,
																															email: mail.value,
																															password: pass,
																															status: stat,
																															code: code.value 
																												     };
																											}
																											user=JSON.stringify(user);
																											var request = new XMLHttpRequest();
																											request.open('POST', '/check');
																											request.send(user);
																											request.addEventListener("load",function(){
																																																	var res=request.responseText;
																																																	res=JSON.parse(res);
																																																	if(res.stat=="admin")
																																																	{
																																																		if(res.email==1 || res.name==1 || res.code==1)
																																																		{
																																																			if(res.email==1)
																																																			emailerr.innerHTML="Email address should not be used earlier";
																																																			if(res.name==1)					
																																																			nameerr.innerHTML="Name has already been taken";
																																																			if(res.code==1)
																																																			codeerr.innerHTML="Incorrect code";
																																																		}
																																																		else
																																																		{
																																																			alert("Account created please login !!");
																																																			window.location.replace("/main");
																																																		}
																																																	}
																																																	else
																																																	{
																																																		if(res.email==1 || res.name==1)
																																																		{
																																																			if(res.email==1)
																																																			emailerr.innerHTML="Email address should not be used earlier";
																																																			if(res.name==1)					
																																																			nameerr.innerHTML="Name has already been taken";
																																																		}
																																																		else
																																																		{
																																																			alert("Account created please login !!");
																																																			window.location.replace("/main");
																																																		}
																																																	}
																																																});

																										}
													                       });
												  
///////////////When user signs in page///////////////////////////////////////////////////////////////////////												 
/*getId.addEventListener("submit",function(event){
	                                             /*flag=0;
												 var obj;
												 var current;
	                                             ////////////Validate email id/////////////////////
												 var mail=document.getElementById('mail');
												 var pass=document.getElementById('password');
												 mail.addEventListener("keydown",function(event){ document.getElementById('mailerr').innerHTML="";});
												 pass.addEventListener("keydown",function(event){ document.getElementById('passworderr').innerHTML="";});
												 for(var i=0;i<userCount;i++)
												  {
												    obj=JSON.parse(localStorage.getItem("user"+i));
												    if(obj.email==mail.value)
												     {
													  flag=1;
													  current=i;
                                                      break;															
												     }
												  }
												  if(flag==0)
												  {
													document.getElementById('mailerr').innerHTML="<br>Email address not found*<br>";
                                                    event.preventDefault();														
												  }
												  else
												  {
													/////////validating password/////////////////////////////////////////////////// 
													if(pass.value==obj.pass)
													{	
													  sessionStorage.setItem("currentUser",current);	
													  if(obj.selection=="admin")
													  window.location.replace("file:///C:/Users/Karans/Desktop/HTML/UCA/Cart/Using LocalStorage/Seller/index.html");	  
                                                      else
													  window.location.replace("file:///C:/Users/Karans/Desktop/HTML/UCA/Cart/Using LocalStorage/Buyer/index.html");
                                                      event.preventDefault();												  
													}
                                                    else
													{
														document.getElementById('passworderr').innerHTML="<br>Incorrect Password*<br>";
                                                        event.preventDefault();	
													}														
												  }*/
											   //});*/
											   
/*function sendAJAX(req,route,callback)
{
	request.open('POST', route);
	request.send(req);
	request.addEventListener("load",function(){
															                var res=request.responseText;
															                res=JSON.parse(res);
															                callback(res);
							                              };
}*/											   
												 												 