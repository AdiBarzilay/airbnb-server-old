require('dotenv').config() 

const express = require('express');
const morgan = require('morgan')
const path = require('path')
const p = require( './utils/color_logger')(path.basename(__filename));

const db = require('./db/mongoose.connection')
// const user_router = require('./modules/user/user.router');
const experience_router = require('./modules/experience/experience.router');
const city_router = require('./modules/city/city.router');
const comment_router = require('./modules/comment/comment.router');
// const port = process.env.PORT || 3000;

const { NODE_ENV,API_PORT,API_HOST } = process.env;
// const { NODE_ENV,API_PORT,API_HOST }  = {NODE_ENV:"development",API_PORT:3000,API_HOST:"localhost"};
// const cors = require('cors')

const app = express();

// app.use(cors())
app.use(morgan('dev'))

// test routing
app.get('/api', (req, res) => {
  res.status(200).json({ express: 'Hello From Express' });
});


// actual routing
app.use('/api/experiences', experience_router);
app.use('/api/cities', city_router);
app.use('/api/comments', comment_router);
// app.use('/api/users', user_router);

// central error handling
app.use( (err, req, res, next) => {
  p.error(err)
  if(NODE_ENV === 'production')
      res.status(500).json({error:'internal server error'})
  else
      res.status(500).json({error:err.message,stack:err.stack})
})
//when no routes were matched...
app.use('*', (req, res) => {
  res.status(404).json({[req.url]:"not found"})
})

//connect to mongo db
db.connect();

//start the express api server
app.listen(API_PORT,API_HOST, (error) => {
    if(error) p.error(error)
    else p.magenta(`express api is live  ✨ ⚡ http://${API_HOST}:${API_PORT} ✨ ⚡`)
});
