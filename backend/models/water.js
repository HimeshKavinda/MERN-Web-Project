const mongoose = require('mongoose');

const waterSchema = new mongoose.Schema({

    billAmt:{
        type:Number,
        required:true
    },
    consumption:{
        type:Number,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
});

module.exports = mongoose.model('Water',waterSchema)