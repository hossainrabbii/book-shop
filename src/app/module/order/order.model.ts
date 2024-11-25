import mongoose, { Schema } from 'mongoose'
import { IOrder } from './order.interface'


// order schema
const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: function (email: string) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)
        },
        message: '{VALUE} is invalid email format',
      },
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'Product is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price cannot be negative'],
    },
  },
  { timestamps: true }
)

export const Order = mongoose.model<IOrder>('Order', orderSchema)
