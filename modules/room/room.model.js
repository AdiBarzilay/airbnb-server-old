const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//     _id         : Schema.Types.ObjectId,
// });

const UserSchema = new Schema({
    first_name : String, 
    
}, {timestamps:true});

// UserSchema.pre('save', async function(next){
//     this.password = await bcrypt.hash(this.password, 10)
//     next()
// })
  
// UserSchema.methods.is_valid_password = async function(password){
//     return await bcrypt.compare(password, this.password)
// }
  
const UserModel = mongoose.model('user',UserSchema);
  
module.exports = UserModel;