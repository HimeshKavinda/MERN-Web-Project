const express = require('express');
const staffPayment = require('../models/staffPayment');
const StaffPayment = require('../models/staffPayment');

const staffPaymentrouter = express.Router();

//save staffPayment

staffPaymentrouter.post('/staffpayment/save',(req,res) => {

    let newStaffPayment = new StaffPayment(req.body);

    newStaffPayment.save((err) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Staff Payment saved Successfully"
        });
    });

});

// get staffPayment

staffPaymentrouter.get('/staffpayments',(req,res) => {
    StaffPayment.find().exec((err,staffpayments) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingStaffPayments:staffpayments
        });
    });
});


// get a specific staffPayment

staffPaymentrouter.get("/staffpayments/:id", (req,res) => {

    let staffpaymentID = req.params.id;

    StaffPayment.findById(staffpaymentID,(err,staffpayments) => {
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            staffpayments
        });
    });
});

// update staffPayment

staffPaymentrouter.put('/staffpayment/update/:id',(req,res) => {
    StaffPayment.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,staffPayment) => {
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Successfully"
            });
        }
    );
});

// delete staffPayemnt 

staffPaymentrouter.delete('/staffpayment/delete/:id', (req,res) => {
    StaffPayment.findByIdAndRemove(req.params.id).exec((err,deletedStaffPayment) => {

        if(err) return res.status(400).json({
            message:"Delete Unsuccessful",err
        });

        return res.json({
            message:"Delete Successfull", deletedStaffPayment
        });
    });
});

module.exports = staffPaymentrouter;