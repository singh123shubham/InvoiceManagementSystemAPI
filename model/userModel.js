const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})

// Hash password
 userSchema.pre('save',async function(){
    if(!this.isModified('password',)) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
 })

 const User = mongoose.model('User', userSchema);

 module.exports = User;
 