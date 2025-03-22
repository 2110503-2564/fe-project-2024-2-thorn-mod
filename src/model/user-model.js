import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    name : {
        type : String,
        required : [true,'please add name']
    },
    email :{
        type : String,
        requireก : [true,'please add email'],
        unique: true,
        match : [/^[^\s@]+@[^\s@]+\.[^\s@]+$/]
    },
    tel:{
        type: String,
        unique:true
    },
    role : {
        type : String,
        enum : ['user','admin'],
        default : 'user'
    },
    password :{
        type : String,
        required : [true,'please add password'],
        minlength : 6,
        select:false
    },
    resetPasswordToken: String,
    resetPasswordExpire : Date,
    createAt :{
        type : Date,
        default : Date.now
    }
})

export const User = mongoose.model("User", UserSchema)