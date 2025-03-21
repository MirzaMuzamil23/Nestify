const Listing = require("../models/listings.js");


module.exports.index = async(req , res) => {
    const allListing = await Listing.find({})
    res.render("listings/index.ejs" , {allListing});
};

module.exports.renderNewForm = async (req , res) => {
    res.render("listings/new.ejs")
};

module.exports.showListing = async(req , res) => {
    let {id} = req.params; 
    const listing = await Listing.findById(id).populate({
        path : "reviews" , 
        populate : {
            path : "author"
        },
    }).populate("owner");
    if(!listing){
        req.flash("error" , "listing does not exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs" , {listing});
};

module.exports.createListing = async (req ,res , next) => {
    let url = req.file.path ;
    let file = req.file.filename;
    const newListing = new Listing (req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url , file}
    await newListing.save();
    req.flash("success" , "New Listing Created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req , res) => {
    let {id} = req.params; 
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error" , "listing does not exist");
        res.redirect("/listings");
    }
    let orginalImageUrl = listing.image.url ;
    orginalImageUrl = orginalImageUrl.replace("/upload" , "/upload/h_200");
    res.render("listings/edit.ejs" , {listing , orginalImageUrl});
}; 

module.exports.updatelisting = async (req , res ) => {
    let {id} = req.params; 
    let listing = await Listing.findByIdAndUpdate(id , {...req.body.listing})
    
    if(typeof req.file !== "undefined"){
        let url = req.file.path ;
        let file = req.file.filename;
        listing.image = {url , file}
        await listing.save();
    }
    req.flash("success" , "Listing Updated!");  
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req , res) => {
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id)
    console.log(deleteListing);
    req.flash("success" , "Listing Deleted!");
    res.redirect("/listings");
};
