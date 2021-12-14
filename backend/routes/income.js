const express = require('express');
const income = require('../models/income');
const Income = require('../models/income');

const incomerouter = express.Router();

//save income

incomerouter.post('/income/save',(req,res) => {

    let newIncome = new Income(req.body);

    newIncome.save((err) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Income saved Successfully"
        });
    });

});

// get incomes

incomerouter.get('/incomes',(req,res) => {
    Income.find().exec((err,incomes) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingIncomes:incomes
        });
    });
});


// get a specific income

incomerouter.get("/incomes/:id", (req,res) => {

    let incomeID = req.params.id;

    Income.findById(incomeID,(err,incomes) => {
        if(err){
            return res.status(400).json({success:false, err});
        }

        return res.status(200).json({
            success:true,
            incomes
        });
    });
});

// update income

incomerouter.put('/income/update/:id',(req,res) => {
    Income.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,income) => {
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Successfully"
            });
        }
    );
});

// delete income 

incomerouter.delete('/income/delete/:id', (req,res) => {
    Income.findByIdAndRemove(req.params.id).exec((err,deletedIncome) => {

        if(err) return res.status(400).json({
            message:"Delete Unsuccessful",err
        });

        return res.json({
            message:"Delete Successfull", deletedIncome
        });
    });
});

module.exports = incomerouter;
