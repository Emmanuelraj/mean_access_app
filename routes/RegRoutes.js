module.exports = function (app)
{

    const User = require('../models/user');
    const bcrypt = require('bcryptjs');
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const jwt = require('jsonwebtoken');






    app.post('/api/register',function (request,response)
     {

         console.log('reg post method');

        const name            =   request.body.name;
        const email           =   request.body.email;
        const username        =   request.body.username;
        const password        =  request.body.password;
        const confirmPassword = request.body.confirmPassword;
        const user            = request.body.user;



        console.log(request.body);

        console.log(confirmPassword);

        console.log(user);




        request.checkBody('name', 'Name is required').notEmpty();
        request.checkBody('email','Email is required').notEmpty();
        request.checkBody('password', 'password is required').notEmpty();
        request.checkBody('confirmPassword','password is not match').equals(request.body.password);


        const errors = request.validationErrors();

        if(errors)
          {
            console.log('err'+errors);
            response.send(errors)
          }
          else {



            var userModel = new User ({
                  name : name,
                  email : email,
                  username : username,
                  password : password,
                  user:user            })





           //save the password into hash
           //referred bcryptjs npm async
            bcrypt.genSalt(10, function (err,salt)
            {
                bcrypt.hash(userModel.password,salt, function (err,hash) {
                      userModel.password  = hash;
                      userModel.save(function (err)
                      {
                        if(err)
                         {
                           console.log('err'+err);
                         }
                         else {

                           //response.status(200);
                           let payload ={subject: userModel._id}
                           let token =jwt.sign(payload,'secretkey')
                           response.status(200).send({token})             }

                      })
                })
            })

          }

    })




    app.post('/api/login', function (request,response,next)
     {


       console.log('passport');
      // Local Strategy
      passport.use(new LocalStrategy(function(username, password, done){
       console.log('uname'+username);
        // Match Username
        let query = {username:username};

        //find the username in mlab registers collections
        User.findOne(query, function(err, user){
          if(err) throw err;
          if(!user){


        console.log('user method')
            //return done(null, false, {message: 'No user found'});

          //return response.json({success: false, msg:'Failed to register'})

        return  response.status(401).send('Invalid crediatianls');
          }
          // Match Password
          bcrypt.compare(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch)
            {
              console.log('isMatch'+isMatch);
              //return done(null, user);
              let payload ={subject: user._id}
              let token =jwt.sign(payload,'secretkey')
              response.status(200).send({token})
            }

            else
             {
                console.log('Wrong password');
              //return done(null, false, {message: 'Wrong password'});

              //return response.json({success, msg; 'Wrong password'});
              response.status(401).send('Wrong password')

            }
          });
        });
      }));

      passport.serializeUser(function(user, done) {
        done(null, user.id);
      });

      passport.deserializeUser(function(id, done)
      {
        User.findById(id, function(err, user)
        {
          done(err, user);
        });
      });



        console.log('login post method');
          let userData = request.body

         passport.authenticate('local')(request,response,next)


    });


//fetch one Data
  app.get('/api/access/:username',function (request,response)
  {
    console.log('get login method');

    console.log("username"+request.params.username);

    User.findOne({username:request.params.username},function (err,user)
    {

      if(err)
       {
         console.log('err on db'+err);
       }
       else {
         console.log(user);
         response.json(user);
       }

    })

  });



  //deleteByusername
  app.delete('/api/access/:username',function (request,response)
  {
    console.log('delete'+request.params.username);

    User.remove({username: request.params.username},function (err,removeUser)
    {
      if(err)
       {
         console.log('err'+err)
       }
       else {
            response.send('deleteTask');
            response.status(200);
       }

    })

  })








  }
