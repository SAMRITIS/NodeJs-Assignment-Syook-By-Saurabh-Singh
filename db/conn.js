const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/task', {useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false}).then(() => {  
    console.log("Successfully connected to the database");})
.catch(err => {  
    console.log('Could not connect to the database.', err);  process.exit();
});

var conn = mongoose.connection;
  module.exports = conn;