import mongoose, { Document, Schema } from "mongoose";
import { title } from '../../../../admin/src/constant/order.constant';

export interface IOrder extends Document {
  order_id: Schema.Types.ObjectId;
  user_id: Schema.Types.ObjectId;
  total_price: number | null;
  delivery_time: Date | null;
  create_at: Date;
  payment_method: string | null;
  lng: number | null;
  lat: number | null;
  message: string | null;
  address: string | null;
  status:
    | "Pending"
    | "Processing"
    | "Packed"
    | "Delivering"
    | "Delivered"
    | "Successfully"
    | "Cancelled"
    | null;
  shipper_id:  Schema.Types.ObjectId | null;
}

const OrderSchema = new Schema<IOrder>({
  order_id: { type:  Schema.Types.ObjectId, required: true, unique: true },
  user_id: { type:  Schema.Types.ObjectId, default: null },
  total_price: { type: Number, default: null },
  delivery_time: { type: Date, default: null },
  create_at: { type: Date, default: Date.now }, // Set default to current date
  payment_method: { type: String, default: null },
  lng: { type: Number, default: null },
  lat: { type: Number, default: null },
  message: { type: String, default: null },
  address: { type: String, default: null },
  status: {
    type: String,
    enum: [
      "Pending",
      "Processing",
      "Packed",
      "Delivering",
      "Delivered",
      "Successfully",
      "Cancelled",
    ],
    default: null,
  },
  shipper_id: { type:  Schema.Types.ObjectId, default: null },
});

// Define the interface for Order Item
export interface IOrderItem extends Document {
  order_id: Schema.Types.ObjectId;
  item_id: Schema.Types.ObjectId;
  quantity: number;
  title?: string;
  price?: number;
  image?: string;
}

// Define schema for Order Item
const OrderItemSchema: Schema = new Schema<IOrderItem>({
  order_id: { type: Schema.Types.ObjectId, required: true },
  item_id: { type: Schema.Types.ObjectId, required: true, ref: "MenuItem" },
  quantity: { type: Number, required: true },
  title: { type: String, default: null },
  price: { type: Number, default: null },
  image: { type: String, default: null },
});

// Create models from schemas
const Order = mongoose.model<IOrder>("Order", OrderSchema);
const OrderItem = mongoose.model<IOrderItem>("OrderItem", OrderItemSchema);

export { Order, OrderItem };
