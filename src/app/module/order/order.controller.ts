import { bookService } from '../book/book.service'
import { orderService } from './order.service'
import { Request, Response, NextFunction } from 'express'

const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const payload = req.body

    // Check if the product exists
    let orderBook
    try {
      orderBook = await bookService.getBookById(payload.product)

    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === 'CastError') {
          res.status(400).json({
            success: false,
            message: 'Invalid product ID format',
          })
          return
        }
      }
      throw error // Rethrow unexpected errors
    }

    if (!orderBook) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      })
      return
    }

    // Check stock availability
    if (orderBook.quantity < payload.quantity) {
      res.status(400).json({
        success: false,
        message: `Only ${orderBook.quantity} products are in stock. Ordered quantity must be less than or equal to available stock.`,
      })
      return
    }
    // minus from the stock
    const productRemainingQuantitiy: number = orderBook.quantity
    const orderedQuantity: number = payload.quantity
    const updatedQuantity: number = productRemainingQuantitiy - orderedQuantity
    const pricePerUnit: number = orderBook.price
    // calculate price

    if (pricePerUnit * orderedQuantity != payload.totalPrice) {
      res.json({
        success: false,
        message: `Incorrect total price. Per unit price is ${pricePerUnit}`,
      })
      return
    }

    // Create the order
    const newOrder = await orderService.createOrder(payload)

    const updateQuantityInStock = async () => {
      await bookService.updateBook(payload.product, {
        quantity: updatedQuantity,
      })
    }

    const updateQuantityOutStock = async () => {
      await bookService.updateBook(payload.product, {
        quantity: 0,
        inStock: false,
      })
    }
    if (updatedQuantity === 0) {
      updateQuantityOutStock()
    } else {
      updateQuantityInStock()
    }
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: newOrder,
    })
    return
  } catch (error) {
    res.json({
      message: 'Something went wrong',
      error,
    })
    next(error)
  }
}

const getOrders = async (req: Request, res: Response) => {
  try {
    const books = await orderService.getOrders()
    res.json({
      message: 'Orders retrieved successfully',
      success: true,
      data: books,
    })
  } catch (error) {
    res.json({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const calculateTotalRevenue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const totalRevenue = await orderService.calculateTotalRevenue()
    res.json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue,
      },
    })
  } catch (error) {
    next(error)
  }
}
export const orderController = {
  createOrder,
  calculateTotalRevenue,
  getOrders,
}
