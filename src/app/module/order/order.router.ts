import express from 'express'
import { orderController } from './order.controller'

const orderRouter = express.Router()

// Create an order
orderRouter.post('/', orderController.createOrder)
orderRouter.get('/revenue', orderController.calculateTotalRevenue)
orderRouter.get('/or', orderController.getOrders)

export default orderRouter
