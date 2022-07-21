
const User = require('../models/users');
const Review = require('../models/review');

// creating a new user and user is created as an employee not an admin
module.exports.createUser = async function(req, res){

    try {

        if(req.body.password != req.body.password2){
            console.log("password did not match");
            return res.redirect('/users/register');
        }

        let user = await User.findOne({ email : req.body.emai });

        if(user){
            console.log("user already exist");
            return res.redirect('/users/register');
        }else{
            await User.create({
                name : req.body.name,
                email : req.body.email,
                isAdmin : false,
                password : req.body.password
            });
            console.log('User created successfully');
            if(req.user.isAdmin){
                return res.redirect('/');
            }
            return res.redirect('/users/login');
        }
    
    } catch (error) {
        console.log('error while creating user', error);
        return res.redirect('/users/register');
    }
    
}



// creating session
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

// destroying session
module.exports.destroySession = function(req, res){
    req.logout();
    console.log('Logeed Out');
    return res.redirect('/users/login');
}



// go to login page
module.exports.login = function(req, res){
    // if user is authenticated then not able to open login panel
    if(req.isAuthenticated()){
        return res.render('home', {
            title : "ERS | Home"
        });
    }
    return res.render('login', {
        title : "ERS | Login"
    });
}


// go to register page
module.exports.register = function(req, res){
    // if user is authenticate then not able to register self;
    if(req.isAuthenticated() && req.user.isAdmin){
        return res.render('register', {
            title : "ERS | Register"
        });
    }

    if(req.isAuthenticated()){
        return res.render('home', {
            title : "ERS | Home"
        });
    }
    
    return res.render('register', {
        title : "ERS | Register"
    });
    
}

// home
module.exports.home = async function(req, res){

    try {
        // if user is not looged in then send back yo login
        if(!req.isAuthenticated()){
            console.log("not logged in");
            return res.redirect('/users/login');
        }

        let user = await User.findById(req.user.id);
        let review = await Review.find({to : req.user.id});
        // findOne({  });

        let recipients = [];

        for(let i = 0; i < user.to.length; i++){
            let x = await User.findById(user.to[i]);
            recipients.push(x);
        }

        // find reviews
        let reviews = [];

        for(let i = 0; i < review.length; i++){
            let x = await User.findById(review[i].from);
            

            let curr_review = {
                name : x.name,
                review : review[i].review,
                updated : review[i].updatedAt,
            };
            reviews.push(curr_review);
        }

        return res.render('home', {
            title : "ERS | Home",
            recipients: recipients,
            reviews: reviews,
            user : user,
        });

    }catch(error) {
        console.log(error);
        return;
    }
    
}
