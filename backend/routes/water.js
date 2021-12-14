const express = require('express');
const water = require('../models/water');
const Water = require('../models/water');

const waterrouter = express.Router();

//save water

waterrouter.post('/water/save',(req,res) => {

    let newWater = new Water(req.body);

    newWater.save((err) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Water Bill saved Successfully"
        });
    });

});

// get water

waterrouter.get('/waters',(req,res) => {
    Water.find().exec((err,waters) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingWater:waters
        });
    });
});


// get a specific water

waterrouter.get("/waters/:id", (req,res) => {

    let waterID = req.params.id;

    Water.findById(waterID,(err,waters) => {
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            waters
        });
    });
});

// update water

waterrouter.put('/water/update/:id',(req,res) => {
    Water.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,water) => {
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Successfully"
            });
        }
    );
});

// delete water 

waterrouter.delete('/water/delete/:id', (req,res) => {
    Water.findByIdAndRemove(req.params.id).exec((err,deletedWater) => {

        if(err) return res.status(400).json({
            message:"Delete Unsuccessful",err
        });

        return res.json({
            message:"Delete Successfull", deletedWater
        });
    });
});

module.exports = waterrouter;
