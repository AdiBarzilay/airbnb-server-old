const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;


const CommentSchema = new Schema({ 
    first_name: String,
    comment: String,
    avatar: String,
    stars: String,
    year: String,
    month: String

}, {timestamps:true});

  
const CommentModel = mongoose.model('comment',CommentSchema);
  
module.exports = CommentModel;

