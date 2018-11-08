const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      http = require('http'),
      cors = require('cors'),
      moment = require('moment'),
      Auth0Strategy = require('passport-auth0'),
      passport = require('passport'),
      config = require('./config.js'),
      request = require('request');
      elephant = "postgres://egfawyvj:FgyMFj5vkAOv2IHCogUfelkzfxErVoae@tantor.db.elephantsql.com:5432/egfawyvj";
      pgadmin = "postgres://postgres:1234a@localhost/testDB"

      const app = express();

      app.use(cors());
      app.use(bodyParser.json())

      app.use(session({
        resave: true, //Without this you get a constant warning about default values
        saveUninitialized: true, //Without this you get a constant warning about default values
        secret: 'pizzaisgood'
      }))
      app.use(passport.initialize());
      app.use(passport.session());
      app.use(express.static('./public'))


      var db = app
      // const db = massive.connectSync({connectionString: 'postgres://postgres:1234a@localhost/testDB'})
      massive(elephant).then((db) => {
          app.set('db', db);
          // db.users_create_seed().then(
          //   function() {
          //     console.log("user table created")
          //   }
          // )
          // .catch(
          //   function(err){
          //     console.log("user table err", err)
          //   })

          // db.createtable().then(
          //   function() {
          //     console.log("data table created")
          //   }
          // )
          // .catch(
          //   function(err){
          //     console.log("data table err", err)
          //   })
          app.get('/getData', function( req, res, next) {
            // console.log("data", req.user)
            db.getsql([req.user[0].user_id]).then( data => {
              console.log(data)

              res.status(200).json(data)
              // console.log(data)
            })
          })
          app.post('/send', function(req, res) {
            var date = moment().calendar();
            db.postdata([req.body.text, date, req.user[0].user_id], function(err, data) {
              console.log( "data", req.body.text ,"date",moment().calendar(), req.user[0])
              if (err){
                res.status(500).json(err)
              }else {
                res.status(200).json(data)
              }
            })
          })
          app.put('/change/:id', function(req, res, params) {
            // console.log(req.body)
            db.changedata([req.body.id, req.body.newtask], function (err, results) {
              res.send("hello")
            })
          })
          app.delete('/delete/:id', function(req, params) {
            db.removedata([req.params.id], function(err) {
              console.log("id err", err)
            })
          })
          passport.use(new Auth0Strategy({
             domain:       config.auth0.domain,
             clientID:     config.auth0.clientID,
             clientSecret: config.auth0.clientSecret,
             callbackURL:  '/callback'
            },
            function(accessToken, refreshToken, extraParams, profile, done) {
              db.getUserByAuthId([profile.id]).then(function(user) {
                if (!user[0]) {
                   //if there isn't one, we'll create one!
                  // console.log("creating user", profile)
                  db.createUserByAuth([profile.displayName, profile.id]).then(function(user2) {
                    // console.log('USER CREATED', user2);
                    return done(null, profile);
                  })
                } else {
                  // console.log("found User", profile)
                  // user = user[0]
                  return done(null , user);
                }
              })
            }
          ));
      })
      passport.serializeUser(function(userA, done) {
      var userB = userA;
      done(null, userB); //PUTS 'USER' ON THE SESSION
      });

      //USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
      passport.deserializeUser(function(userB, done) {
      var userC = userB;
      //Things you might do here :
      // Query the database with the user id, get other information to put on req.user
      done(null, userC); //PUTS 'USER' ON REQ.USER
      });

      app.get('/auth', passport.authenticate('auth0'));

      app.get('/callback',
        passport.authenticate('auth0', { failureRedirect: '/login' }),
        function(req, res) {
          if (!req.user) {
            throw new Error('user null');
          }
          res.redirect("/");
        }
      );
      app.get('/login',
        passport.authenticate('auth0', {connection: 'google-oauth2'}), function (req, res) {
        res.redirect("/");
      });

      app.get('/auth/me', function(req, res) {
        if (!req.user) return res.sendStatus(404);
        // console.log("me", req.user)
        res.status(200).send(req.user);
      })

      app.get('/auth/logout', function(req, res) {
        req.logout();
        res.redirect('/');
      })



      var port = 8084


  app.listen(port, function() {

    console.log("listining on port " + port)

  })
