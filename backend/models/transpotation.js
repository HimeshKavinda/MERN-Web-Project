const mongoose = require('mongoose');

const transpotationSchema = new mongoose.Schema({

    driverName:{
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
    maintainAmt:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }

});

module.exports = mongoose.model('Transpotation', transpotationSchema)