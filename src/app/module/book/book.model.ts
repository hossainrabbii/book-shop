import mongoose, { Schema } from 'mongoose'
import { BookCategory, IBook } from './book.interface'

// book schema
const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [100, 'Title must not exceed 100 characters'],
    },
    author: {
      type: String,
      required: true,
      minlength: [3, 'Author must be at least 3 characters long'],
      maxlength: [100, 'Author must not exceed 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be greater than or equal to 0'],
    },
    category: {
      type: String,
      enum: {
        values: Object.values(BookCategory),
        message:
          'Category must be one of: Fiction, Science, SelfDevelopment, Poetry, Religious',
      },
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description must not exceed 500 characters'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be greater than or equal to 0'],
      validate: {
        validator: (value: number) => Number.isInteger(value),
        message: 'Quantity must be an integer',
      },
    },
    inStock: {
      type: Boolean,
      required: [true, 'In-stock status is required'],
    },
  },
  { timestamps: true }
)

export const Book = mongoose.model<IBook>('Product', BookSchema)
