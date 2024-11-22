import mongoose, { mongo } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    // email:{type:String,required:true},
    cartData : {type:Object,default:{}},
},{minimize:false});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model.User || mongoose.model('User',userSchema);

export default User;