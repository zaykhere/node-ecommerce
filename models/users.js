const mongoose= require("mongoose");
const bcrypt=require("bcrypt");

let userSchema= new mongoose.Schema({
  email:{
    type: String,
    required: [true, 'Please add an email'],
    maxlength:40,
    minlength: 5,

  },
  password:{
    type: String,
    maxlength: 200,
    minlength: 6,
    required:[true, 'Password is required']
  }
})

userSchema.methods.encryptPassword=  function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);  
}

userSchema.methods.verifyPassword=  function(password){
  return bcrypt.compareSync(password, this.password);
}

let User= mongoose.model("User", userSchema);
module.exports=User;
