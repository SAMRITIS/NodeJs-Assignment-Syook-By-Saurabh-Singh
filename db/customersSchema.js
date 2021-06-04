const mongoose = require('mongoose');

const customersSchema = mongoose.Schema({
   name : {
    type: String,
    required: true
   },
   city :{
    type: String,
    required: true
   }
});

var customersModel = mongoose.model('customers', customersSchema);

module.exports = customersModel;