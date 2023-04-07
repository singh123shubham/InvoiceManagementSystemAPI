const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose
  .connect(url)
  .then(() => console.log('Connected with mongodb.....'))
  .catch(() => console.log('Failed to connecting database', err))
};

module.exports = connectDB;
