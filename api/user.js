const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String , required:true },
  name:{type:String, required:true},
  cart:[{id:Number,offerPrice:Number,name:String,qty:Number,image:String}],
  wishlist:[{id:Number,offerPrice:Number,name:String,qty:Number,image:String}]
});

module.exports = mongoose.model("usersVer", userSchema);

