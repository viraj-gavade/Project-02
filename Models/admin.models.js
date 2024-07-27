const mongoose = require('mongoose')
const usernameRegex = /^(?!.*[-_]{2,})(?![-_])[A-Za-z0-9_-]{3,20}(?<![-_])$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')


const AdminSchema =  mongoose.Schema({
    username:{
        type:String,
        required:[true,'Admin username is compulsory!'],
        match:[usernameRegex,'Please eneter the username in valid format all should be lowercase'],
        lowercase:true
    },
    password:{
        type:String,
        required:[true,'Admin password is compulsory!'],
        match:[passwordRegex,'Please eneter the valid strong password!']
    },
    email:{
        type:String,
        required:[true,'Admin email in mandatory field!'],
        match:[emailRegex,'Enter the email in valid format!']
    },
    refreshToken:{
        type:String,
        required:[False,'Admin refreshtoken is not compulsory!']
    },
    profileImg:{
        type:String,
        required:[true,'Admin profile picture is neccessary!']
    }
})

AdminSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return null
    }
    const salt = await bcryptjs.genSalt(12)
    this.password = await bcryptjs.hash(this.password,salt)
    next()
})
module.exports = mongoose.model('Admin',AdminSchema)