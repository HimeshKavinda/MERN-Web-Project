const mongoose = require('mongoose');

const staffPaymentSchema = new mongoose.Schema({

    empName:{
        type:String,
        required:true
    },
    empID:{
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
    salaryPay:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
});

module.exports = mongoose.model('StaffPayment',staffPaymentSchema)