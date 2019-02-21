const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;


const CitySchema = new Schema({ 
    city: String,
    city_pic: String,
    price: Number
    
}, {timestamps:true});

  
const CityModel = mongoose.model('city',CitySchema);
  
module.exports = CityModel;