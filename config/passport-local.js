
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email',
    },
    function(email, password, done) {
        // find the user and stablish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error while finding user in passport');
                return done(err); 
            }
            if (!user || user.password != password) { 
                console.log('Invalid user ame or password');
                return done(null, false); 
            }
            
            return done(null, user);
        });
    }
));
  

// serializing user to decide what is in the cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key into the cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log("Error while finding user in deseralizing");
            return done(err);
        }
        return done(null, user);
    });
});


// check if user authenticated then pass the request to next
passport.checkAuthentication = function(req, res, next){
    // if user is sign in then pass on the req to next(controller action)
    if(req.isAuthenticated()){
        return next();
    }
    // if user is not sign in
    
    return res.redirect('/users/login');
}


passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // user is authenticated then req.user is contains the curr login user from the session cookie
        // and we are just sending this to locals for views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;
