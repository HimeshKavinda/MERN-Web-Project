const express = require('express');
const material = require('../models/materials');
const Material = require('../models/materials');

const materialrouter = express.Router();

//save material

materialrouter.post('/material/save',(req,res) => {

    let newMaterial = new Material(req.body);

    newMaterial.save((err) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Material saved Successfully"
        });
    });

});

// get materials

materialrouter.get('/materials',(req,res) => {
    Material.find().exec((err,materials) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingMaterials:materials
        });
    });
});


// get a specific material

materialrouter.get("/materials/:id", (req,res) => {

    let materialID = req.params.id;

    Material.findById(materialID,(err,materials) => {
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            materials
        });
    });
});

// update material

materialrouter.put('/material/update/:id',(req,res) => {
    Material.findByIdAndUpdate(
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

// delete material 

materialrouter.delete('/material/delete/:id', (req,res) => {
    Material.findByIdAndRemove(req.params.id).exec((err,deletedMaterial) => {

        if(err) return res.status(400).json({
            message:"Delete Unsuccessful",err
        });

        return res.json({
            message:"Delete Successfull", deletedMaterial
        });
    });
});

module.exports = materialrouter;
