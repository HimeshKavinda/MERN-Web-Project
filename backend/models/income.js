const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({

    customerName:{
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
    country:{
        type:String,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    orderID:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
});

module.exports = mongoose.model('Income',incomeSchema)