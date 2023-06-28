const mongoose = require('mongoose')
const { Schema } = mongoose;


const cartSchema = new Schema({

      item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required:true
      },
      userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required:true
      },
      quantity :{
            type:Number,
            default:0
      }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart


