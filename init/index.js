const mongoose = require("mongoose");
const initData = require("../init/data.js");
const Listing = require("../models/listings.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/nestify";

main().then(() => {
    console.log("Connection is successful");
}).catch((err) =>{
    console.log(err)
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDb = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj , 
        owner : "67c5575e5dada1698356e98f" ,
    }));
    await Listing.insertMany(initData.data);
    console.log("Data inserted");
}

initDb();