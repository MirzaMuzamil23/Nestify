const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utilities/wrapAsync.js");
const Review = require('../models/review.js');
const Listing = require('../models/listings.js');
const {validateReview, isLoggedIn, isAuthorReview} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");


// Review Route (Post)
router.post("/" , isLoggedIn ,validateReview , wrapAsync (reviewController.createReview));

// Delete Review Route
router.delete("/:reviewId" , isLoggedIn , isAuthorReview , wrapAsync(reviewController.deleteReview));


module.exports = router;