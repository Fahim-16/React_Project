const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    dname:{type:String, required: true},
    bdgrp:{type:String, require:true},
    contact:{type:Number,require:true},
    ddetails:{type:String, require:true}
});

const donorModel = mongoose.model("Donor",donorSchema);
module.exports = donorModel;