const express = require('express');
const insurance = require('../models/insurance');
const Insurance = require('../models/insurance');

const router = express.Router();

//save insurance

router.post('/insurance/save',(req,res) => {

    let newInsurance = new Insurance(req.body);

    newInsurance.save((err) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Insurance saved Successfully"
        });
    });

});

// get insurances

router.get('/insurances',(req,res) => {
    Insurance.find().exec((err,insurances) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingInsurances:insurances
        });
    });
});


// get a specific insurance

router.get("/insurances/:id", (req,res) => {

    let insuranceID = req.params.id;

    Insurance.findById(insuranceID,(err,insurances) => {
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            insurances
        });
    });
});

// update insurance

router.put('/insurance/update/:id',(req,res) => {
    Insurance.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,insurance) => {
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Successfully"
            });
        }
    );
});

// delete insurance 

router.delete('/insurance/delete/:id', (req,res) => {
    Insurance.findByIdAndRemove(req.params.id).exec((err,deletedInsurance) => {

        if(err) return res.status(400).json({
            message:"Delete Unsuccessful",err
        });

        return res.json({
            message:"Delete Successfull", deletedInsurance
        });
    });
});

module.exports = router;