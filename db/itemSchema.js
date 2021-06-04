const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
   name : {
    type: String,
    required: true
   },
   price :{
    type: Number,
    required: true
   }
});

var itemModel = mongoose.model('item', itemSchema);

module.exports = itemModel;