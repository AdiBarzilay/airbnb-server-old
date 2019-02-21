const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;


const ExperienceSchema = new Schema({ 
    discription: String,
    experience_name: String,
    price: Number,
    ratig_score: Number,
    reviews: Number,
    img_url: String,
    location: String,
    includes: String,
    language: String,
    duration: Number
    
}, {timestamps:true});

  
const ExperienceModel = mongoose.model('experience',ExperienceSchema);
  
module.exports = ExperienceModel;