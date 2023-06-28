const mongoose = require('mongoose')
const { Schema } = mongoose;

const fooditemSchema = new Schema({
 name:{
    type:String,
    required:true
 },
 price:{
    type:Number,
    required:true,
 },
 imageurl:{
    type:String,
    required:true
 },
 description:{
    type:String,
    required:true
 },
 category:{
    type:String,
    enum:["Pizza","Dessert","Refreshments","Other"],
    required:true
 }
 

});
const Fooditem = mongoose.model('Fooditem', fooditemSchema);
module.exports = Fooditem