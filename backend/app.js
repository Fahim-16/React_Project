const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const donorModel = require('./donorModel');
const logModel = require('./logModel');
const bcrypt = require('bcrypt');

const app= express();
app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://fahim:Abcd1234@cluster0.ygq5j.mongodb.net/BloodBank?retryWrites=true&w=majority&appName=Cluster0"
  );

  app.post("/donor",async(req,res)=>{
    try{
        const{dname,bdgrp,contact,ddetails}= req.body;
    if(!dname || !bdgrp || !contact ||!ddetails){
        return res.status(400).json({message:"all fields are required"});
    }
    if(!contact.trim()){
        return res.status(400).json({message:"Mobile number cannont be empty"});
    }
    const existingDonor = await donorModel.findOne({ contact });
    if (existingDonor) {
      return res.status(409).json({ message: "Donor with this contact already exists" });
    }
    const newdonor = new donorModel({
    dname,
    bdgrp,
    contact,
    ddetails,
    });

    await newdonor.save();
    res.status(201).json({ message: "Donor registered successfully" });
} catch (error) {
  console.error("Error:", error);
  res.status(500).json({ error: error.message });
}
  });

  app.get('/gdonor', async(req,res)=>{
    try{
        const vdonor = await donorModel.find();
        res.json(vdonor);
    }catch{
        res.status(500).json({error:err.message});
    }
  });


app.delete('/deldonor/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await donorModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.status(200).json({ message: 'Donor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/updateDonor/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const updatedDonor = await donorModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedDonor) {
        return res.status(404).json({ message: 'Donor not found' });
      }
      res.status(200).json({ message: 'Donor updated successfully', donor: updatedDonor });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const logdetails = await logModel.findOne({ username });
  
      if (!logdetails) {
        return res.status(400).json({ error: "User not found!" });
      }
  
      if (password !== logdetails.password) {
        return res.status(400).json({ error: "Invalid credentials!" });
      }
  
      res.status(200).json({ message: "Login successful!" });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
 


  app.listen(3001,()=>{
    console.log("server running on port 3001");
  });