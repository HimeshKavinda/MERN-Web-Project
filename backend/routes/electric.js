const express = require('express');
const electric = require('../models/electric');
const Electric = require('../models/electric');

const electricrouter = express.Router();

//save electric

electricrouter.post('/electric/save',(req,res) => {

    let newElectric = new Electric(req.body);

    newElectric.save((err) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Electric saved Successfully"
        });
    });

});

// get electrics

electricrouter.get('/electrics',(req,res) => {
    Electric.find().exec((err,electrics) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingElectrics:electrics
        });
    });
});


// get a specific electric

electricrouter.get("/electrics/:id", (req,res) => {

    let electricID = req.params.id;

    Electric.findById(electricID,(err,electrics) => {
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            electrics
        });
    });
});

// update electric

electricrouter.put('/electric/update/:id',(req,res) => {
    Electric.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,electric) => {
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Successfully"
            });
        }
    );
});

// delete electric 

electricrouter.delete('/electric/delete/:id', (req,res) => {
    Electric.findByIdAndRemove(req.params.id).exec((err,deletedElectric) => {

        if(err) return res.status(400).json({
            message:"Delete Unsuccessful",err
        });

        return res.json({
            message:"Delete Successfull", deletedElectric
        });
    });
});

module.exports = electricrouter;
