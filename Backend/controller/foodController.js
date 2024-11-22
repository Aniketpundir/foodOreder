import foodModel from "../models/foodModels.js";
import fs from "fs";

const addfood = async(req,res)=>{
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
         name : req.body.name,
         price : req.body.price,
         description : req.body.description,
         image : image_filename,
         category : req.body.category
    })
    try{
        await food.save();
        res.json({success:true,message:"success"});
    }
    catch(e){
        res.json({
            success:false,
            message:`failed ${e}`
        })
    }
};

 const listFood = async(req,res)=>{
    try {
        const food = await foodModel.find({});
        res.json({success:true,data:food});
    } catch (e) {
        res.json({success:false,message:`failed ${e}`});
    }
 }

 const removeFood = async (req,res)=>{
    console.log(req.body)
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});
        await foodModel.findByIdAndDelete(food._id);
        res.json({success:true,message:'removed food'});

    } catch (e) {
        res.json({success:false , message:`failed ${e}`});
    }
 }

export {addfood,listFood,removeFood};