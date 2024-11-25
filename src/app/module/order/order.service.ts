import { IOrder } from './order.interface'
import { Order } from './order.model'

// create new order
const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const result = await Order.create(payload)
  return result
}
const getOrders = async () => {
  return await Order.find() 
}

// calculate total revenue
const calculateTotalRevenue = async (): Promise<number> => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ])
  return result.length > 0 ? result[0].totalRevenue : 0
}

export const orderService = {
  createOrder,
  getOrders,
  calculateTotalRevenue,
}
