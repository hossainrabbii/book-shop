import express from 'express'
import { orderController } from './order.controller'



const orderRouter = express.Router()
// order routes
orderRouter.post('/', orderController.createOrder)
orderRouter.get('/revenue', orderController.calculateTotalRevenue)
orderRouter.get('/orders', orderController.getOrders)

export default orderRouter
