const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    message:{
        type: String,
        required: true
    }
},{
    timeseries: true
});

module.exports = mongoose.model("contact", ContactSchema)