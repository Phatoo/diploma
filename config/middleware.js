var bcrypt = require('bcrypt'),
  crypto = require('crypto'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy, //local strategy
  RememberMeStrategy = require('passport-remember-me').Strategy; //remember me strategy

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne(id)
    .done(function(error, user) {
      done(error, user);
    });
});

module.exports = {
  express: {
    customMiddleware: function(app) {
      //configurate local strategy
      passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },
      function(email, password, done) {
        User
        .findOne({email: email})
        .done(function(error, user) {
          //done-callback signature:
          //done(error, user, info);

          if (error) {
            done(error);
          } else if (!user) {
            done(false, false, 'This user not exists');
          } else if (!bcrypt.compareSync(password, user.password)) {
            done(false, false, 'Wrong password');
          } else {
            done(false, user);
          }
        });
      }
      ));
      //configure RememberMe strategy
      passport.use(new RememberMeStrategy({
        key: 'token' //define key where is coockie stores
      },
      function(token, done) {
        //find user by token
        User
            .findOne()
            .where({
              autoLoginHash: token
            })
            .done(function(error, user) {
                if (error) {
                  done(error);
                } else if (!user) {
                  done(null, false);
                } else {
                  //validate token
                  delete user.autoLoginHash;
                  user.save(function() {});
                  done(null, user);
                }
            });
      }, function(user, done) {
        //generate new token
        var token = crypto.randomBytes(32).toString('hex');
        user.autoLoginHash = token;
        user.save(function() {});
        done(null, token);
      }));

      app.use(passport.initialize());
      app.use(passport.session());
      app.use(passport.authenticate('remember-me'));
    }
  }
};