const mongoose = require('mongoose');

const vehiclesSchema = mongoose.Schema({
   registrationNumber : {
    type: String,
    unique : true,
    required: true
   },
   vehicleType :{
    type: String,
    enum: ['bike', 'truck'],
    required: true
   },
   city : {
    type: String,
    required: true
   },
   activeOrderCount : {
    type: Number,
    required: true,
    default: 0,
    max: 2
   }
});

var vehiclesModel = mongoose.model('vehicles', vehiclesSchema);

module.exports = vehiclesModel;