var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"), 
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),   // we dont't need .js 
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

//Requiring Routes
var commentRoutes   = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
app.locals.moment = require('moment');
//Passport config.
app.use(require("express-session")({
    secret: "When I get older I will be stronger, they call me freedom",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware that will run for every single route
app.use(function(req, res, next){
    res.locals.currentUser =req.user; // whatever we put in res.locals is what is available in our template. this is empty if no one is logged in
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//mongoose.connect("mongodb://localhost/camp");

var url = process.env.DATABASEURL || "mongodb://localhost/camp_site"
mongoose.connect(url);  
//export DATABASEURL=mongodb://localhost/camp_site
 mongoose.connect("mongodb://<user>:<dbpassword>@ds153392.mlab.com:53392/campsite");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//seedDB();  //Seed the database

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000 || process.env.PORT, process.env.IP, function(){
   console.log("The Campsite Server Has Started!!"); 
});
