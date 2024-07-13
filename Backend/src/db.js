const mongoose = require("mongoose")

const connectDb = async () => {
  return (await mongoose.connect('mongodb://localhost:27017/lms', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo error", err))) ;   
}

module.exports = { connectDb }

// const { connect } = require("mongoose")

// const connectDb = async () => {
//   return connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, { dbName: process.env.DB_NAME })
// }

// module.exports = { connectDb }