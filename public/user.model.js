var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
                                        name:{
                                              type: String
                                             },

                                        email:{
                                                type: String
                                              },
                                        
                                        password:{
                                                  type: String
                                                 },     
                                        
                                        status:{
                                                 type: String
                                               }       
                                      });

mongoose.model('users',userSchema);                                      
