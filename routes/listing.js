const express = require("express");
const router = express.Router();
const Listing = require('../models/listings.js');
const wrapAsync = require("../utilities/wrapAsync.js");
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");



// Index Route
router.get("/" , wrapAsync (listingController.index));

// New Route (GET)
router.get("/new" , isLoggedIn , wrapAsync (listingController.renderNewForm));

// Show Route 
router.get("/:id" , isLoggedIn , wrapAsync (listingController.showListing));

// Create Route (Post)
router.post("/" , isLoggedIn ,validateListing,  wrapAsync (listingController.createListing));

// Edit Route (Get)
router.get("/:id/edit" , isLoggedIn , isOwner , wrapAsync (listingController.renderEditForm));

// Update Route 
router.put("/:id" , isLoggedIn , isOwner , validateListing , wrapAsync (listingController.updateListing));

//Delete Route 
router.delete("/:id" , isLoggedIn , isOwner ,wrapAsync (listingController.deleteListing));


module.exports = router ;