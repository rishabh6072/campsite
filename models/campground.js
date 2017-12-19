var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
        name: String,
        price:String,
        image: String,
        description: String,
		location:      String,
		latlng:        String, 
		country:       String, 
		countryCode:   String, 
		googlePlaceID: String,
		createdAt: { type: Date, default: Date.now },
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        },
        comments: [                          // we're not embedding the whole comment here. we're just embedding the Ids.
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Comment"
                }
            ]
});

//var Campground = mongoose.model("Campground", campgroundSchema);
module.exports = mongoose.model("Campground", campgroundSchema);