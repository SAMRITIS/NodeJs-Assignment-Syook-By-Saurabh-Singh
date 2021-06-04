const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
   orderNumber : {
    type: String,
    unique: true, 
    required: true
   },
   itemId : {
    type: String,
    required: true
   },
   price : {
       type: Number,
       required: true,
   },
   customerId : {
     type: String,
     required: true
   },
   deliveryVehicleId : {
       type: String,
       required: true
   },
   isDelivered : {
       type : Boolean,
       required : true,
       default : false
   }
});

var orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;