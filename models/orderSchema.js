import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    id: {type: Number,required: true, unique: true},
    username: { type: String, required: true},
    email: { type: String, required: true},
    orders: {type: [[Schema.Types.Mixed]], required: true},
    price: {type: Number, required: true},
  }, { timestamps: true });
  
const Order = mongoose.model('Order', OrderSchema);
export default Order;