var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose"),
	bcrypt   = require('bcrypt-nodejs');
var UserSchema = new mongoose.Schema({
    local            : {
        email        : String,
        password     : String,
    },
	    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
		}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);