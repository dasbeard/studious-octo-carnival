// =========================================================================
// ============================== Require ==================================
// =========================================================================
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

var User = mongoose.model('User');

module.exports = (function(){
  return {

    reg: function(req,res){
      // console.log('In the Reg method  ----> users controler'. cyan);
      // console.log(req.body);

      User.findOne({name: req.body.name}, function(err, oneUser){
        if(err){
          console.log('====== Error ======'.red);
        } else {
          //1. User was found
          if(oneUser){
            console.log('====== user Was Found ======'.yellow);
            res.json({error: "This name is already registered. Please Login"});
          } else {
          // 2. No email found
            console.log('====== User is good to go ======'.yellow);

            // Encrypt password before saving

            //Create the user object and save to database
            var user = new User({name: req.body.name});
            user.save(function(err){
              if(err){
                console.log('====== Error when Registering ======'.red);
              } else {
                console.log('====== Successfuly registered ======');
                res.json(user)
              }
            });
          }
        }
      });
    },


    login: function(req,res){
      console.log('In the login method  ----> users controler'. cyan);
      console.log(req.body);

      // Find user by email
      User.findOne({name: req.body.name}, function(err, oneUser){
        if(err){
          console.log('====== Error ======'.red);
        } else {
          if(!oneUser){
            console.log('====== user NOT Found ======'.yellow);
            res.json({error: "Email not in the system. Please Register"});

          } else {
            res.json(oneUser)
          }
        }
      });
    },


  }
})();
