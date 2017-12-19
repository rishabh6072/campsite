var express =require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Root Route

router.get("/", function(req, res){
   res.render("landing");
});

//============
//Auth Routes
//============

//Show register form
router.get("/register",function(req, res) {
    res.render("register");
});


//Handling SignUp Logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){     // user is newly created user
        if(err){
            console.log(err);
            req.flash("error", err.message );
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to CampSite " + user.username);
            res.redirect("/campgrounds");
        });
    });        
});


// Show Login Form
router.get("/login", function(req, res) {
    res.render("login");
});


//Handling Login Logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        successFlash: "Welcome!",
        failureRedirect: "/login",
        failureFlash: "Invalid username or password."
    }), function(req, res) {
    res.send("POST ROUTE LOGIN");
});


//Logout Route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out")
    res.redirect("/campgrounds");
});


router.get('/auth/facebook', passport.authenticate('facebook', { 
      scope : ['public_profile', 'email']
    }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', 
	{
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : "Permission Denied" // allow flash messages
    }), 
    function(req,res) {
        req.flash("success", "Welcome " + req.user.facebook.name + "!");
        res.redirect(`/campgrounds`);
    });

// handle the callback after facebook has authenticated the user
//router.get(
//    '/auth/facebook/callback',
//     passport.authenticate('facebook', {
//        failureRedirect : '/login', // redirect back to the signup page if there is an error
//        failureFlash : "Permission Denied" // allow flash messages
//    }), 
//    function(req,res) {
//        req.flash("success", "Welcome to YelpCamp " + req.user.facebook.username + "!");
//        res.redirect(`/campgrounds`);
//    }
//);


module.exports = router;