const mongoose = require('mongoose');
const reviewSchema = require('./review');
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new Schema({
    title : {
        type : String,
        required : true
    } , 
    description : String, 
    image : {
        default : "https://images.unsplash.com/photo-1738571574302-3312deda0aa3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
        type : String,
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1738571574302-3312deda0aa3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D"
        : v ,
    }, 
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId ,
            ref : "Review"
        },
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
});


listingSchema.post("findOneAndDelete" , async(listing) => {
    if(listing) {
        await Review.deleteMany({_id : {$in : listing.reviews}})
    }
})

const Listing = mongoose.model("Listing" , listingSchema);

module.exports = Listing ;