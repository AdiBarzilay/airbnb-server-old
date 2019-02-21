const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//     _id         : Schema.Types.ObjectId,
// });

const UserSchema = new Schema({
    first_name : { type : String, required : [true,'First name is really important'] },
    last_name  : { type : String, required : true },
    email      : { type : String, required : true, unique : true},
    password   : { type : String, required : true },
    phone      : {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
      }
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