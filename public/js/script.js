var getUser=document.getElementById('signUpForm');//selecting the sign up form/////
var getId=document.getElementById('signInForm');//selecting the sign in form/////
var color=document.getElementById('color');
var cancel=document.getElementById('cancel');

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
																															password: pass.value,
																															status: stat 
																												     };
																											}   
																											else
																											{
																												user={
																															name: name.value,
																															email: mail.value,
																															password: pass.value,
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
																																																  var codeFlag=0;
																																																	if(res.stat=='admin')
																																																	{
																																																		if(res.code==1)
																																																		codeFlag=1;
																																																	}
																																																	 if(res.email==1 || res.name==1 || codeFlag==1)
																																																	 {
																																																			if(res.email==1)
																																																			emailerr.innerHTML="Email address should not be used earlier";
																																																			if(res.name==1)					
																																																			nameerr.innerHTML="Name has already been taken";
																																																			if(codeFlag==1)
																																																			codeerr.innerHTML="Incorrect code";
																																																		}
																																																		else
																																																		{
																																																			var Request = new XMLHttpRequest();
																																																			Request.open('POST', '/save');
																																																			Request.send(user);
																																																			Request.addEventListener("load",function(){
																																																																									alert("Account created please login !!");
																																																																									window.location.replace("/");
																																																			                                          });
																																																		}
																																																	});

																											   }																					
													                       });
												  
///////////////When user signs in page///////////////////////////////////////////////////////////////////////												 
getId.addEventListener("click",function(event){
	                                                  var flag=0;
																										////////////Validate email id/////////////////////
																										var mailerr=document.getElementById('mailerr');
																										var passerr= document.getElementById('passworderr');
																										var mail=document.getElementById('mail');
																										var pass=document.getElementById('password');
																										mail.addEventListener("keydown",function(event){mailerr.innerHTML="";});
																										pass.addEventListener("keydown",function(event){passerr.innerHTML="";});
																										if(mail.value=="")
																										{
																											mailerr.innerHTML="Please fill this field";
																											flag=1;
																										}
																										if(pass.value=="")
																										{
																											passerr.innerHTML="Please fill this field";
																											flag=1;
																										}
																										if(flag==0)
																										{
																											var credentials={
																																				mail:mail.value,
																																				pass:pass.value
																																			};
																											credentials=JSON.stringify(credentials);								
                                                      var Request = new XMLHttpRequest();
																											Request.open('POST', '/login');
																											Request.send(credentials);
																											Request.addEventListener("load",function(){
																																																	var res=Request.responseText;
																																																	res=JSON.parse(res);
																																																	if(res.email==0)
																																																	{
																																																		mailerr.innerHTML="Invalid email address";
																																																	}
																																																	else
																																																	{
																																																		if(res.pass==0)
																																																		passerr.innerHTML="Incorrect password";
																																																		else
																																																		window.location.replace("/main");
																																																	}
																											                                          });
																										}
											  });					

cancel.addEventListener('click',function(){
																						 document.getElementById('user').checked=false;
																						 document.getElementById('admin').checked=false;
                                          });
												 												 