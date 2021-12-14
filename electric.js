const mongoose = require('mongoose');

const electricSchema = new mongoose.Schema({

    billAmt:{
        type:Number,
        required:true // backend validations
    },
    unitsConsumed:{
        type:Number,
        required:true // backend validations
    },
    company:{
        type:String,
        required:true // backend validations
    },
    email:{
        type:String,
        required:true // backend validations
    },
    mobile:{
        type:Number,
        required:true // backend validations
    },
    address:{
        type:String,
        required:true // backend validations
    },
    date:{
        type:Date,
        required:true // backend validations
    }
});

module.exports = mongoose.model('Electric',electricSchema)