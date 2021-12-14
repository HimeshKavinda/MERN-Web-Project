const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({

    company:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    insuranceType:{
        type:String,
        required:true
    },
    paymentAmt:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
});

module.exports = mongoose.model('Insurance',insuranceSchema)