const mongoose    = require('mongoose')
const path = require('path')
const p = require( '../utils/color_logger')(path.basename(__filename))

const { DB_HOST, DB_PORT, DB_NAME } = process.env

const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

const connect = async ()=> {
    try{
        await mongoose.connect(uri, options)
        p.magenta(' ✨  Connected to Mongo DB ✨ ')
    }catch(error){
        p.error(error)
    }
}

module.exports = {connect};

