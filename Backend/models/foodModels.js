import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    restroId : {type:String,required:true},
    name : {type : String,required:true},
    price : {type : Number,required:true},
    description : {type : String,required:true},
    image : {type : String,required:true},
    category : {type : String,required:true}
});

foodSchema.index({name : 1});

const foodModel = mongoose.model.food || mongoose.model('food',foodSchema);

export default foodModel;