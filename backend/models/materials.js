const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({

    supplierName:{
        type:String,
        required:true
    },
    supplierID:{
        type:String,
        required:true
    },
    materialName:{
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
    quantity:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
});

module.exports = mongoose.model('Material',materialSchema)