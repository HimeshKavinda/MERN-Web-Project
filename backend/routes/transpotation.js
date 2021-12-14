const express = require('express');
const transpotation = require('../models/transpotation');
const Transpotation = require('../models/transpotation');

const transpotationrouter = express.Router();

//save transpotation

transpotationrouter.post('/transpotation/save',(req,res) => {

    let newTranspotation = new Transpotation(req.body);

    newTranspotation.save((err) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Transpotation Bill saved Successfully"
        });
    });

});

// get transpotation

transpotationrouter.get('/transpotations',(req,res) => {
    Transpotation.find().exec((err,transpotations) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingTranspotation:transpotations
        });
    });
});


// get a specific transpotation

transpotationrouter.get("/transpotations/:id", (req,res) => {

    let transpotationID = req.params.id;

    Transpotation.findById(transpotationID,(err,transpotations) => {
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            transpotations
        });
    });
});

// update transpotation

transpotationrouter.put('/transpotation/update/:id',(req,res) => {
    Transpotation.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,transpotation) => {
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Successfully"
            });
        }
    );
});

// delete transpotation 

transpotationrouter.delete('/transpotation/delete/:id', (req,res) => {
    Transpotation.findByIdAndRemove(req.params.id).exec((err,deletedTranspotation) => {

        if(err) return res.status(400).json({
            message:"Delete Unsuccessful",err
        });

        return res.json({
            message:"Delete Successfull", deletedTranspotation
        });
    });
});

module.exports = transpotationrouter;
