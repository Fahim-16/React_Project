const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    username:{type:String, required: true},
    password:{type:String, required: true}
});

const logModel = mongoose.model("log",logSchema);
module.exports = logModel;