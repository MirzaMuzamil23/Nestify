const Listing = require("./models/listings");
const Review = require("./models/review");
const ExpressError = require("./utilities/ExpressError.js");
const {listingSchema} = require("../Nestify/schema.js");
const {reviewSchema} = require("../Nestify/schema.js");



module.exports.isLoggedIn = (req , res , next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "you must be login to create a new listing");
        return res.redirect("/login");
    }
    next();
};


module.exports.saveRedirectUrl = (req , res , next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = res.locals.redirectUrl ;
    } 
    next();
}

module.exports.isOwner = async(req , res , next) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error" , "You do not owner of this listing");
        return res.redirect(`/listings/${id}`);
    };
    next();
}

// validate Listing Schema 
module.exports.validateListing = (req , res , next) => {
    let {error} = listingSchema.validate(req.body);
    if(error) {
        let errorMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400 , errorMsg);
    } else {
        next();
    }
}

// Review Schema
module.exports.validateReview = (req , res , next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        let errorMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400 , errorMsg);
    } else {
        next();
    }
}

module.exports.isAuthorReview = async(req , res , next) => {
    let {id , reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error" , "You do not author of this review");
        return res.redirect(`/listings/${id}`);
    };
    next();
}