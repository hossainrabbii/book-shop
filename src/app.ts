import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import orderRouter from './app/module/order/order.router'
import bookRouter from './app/module/book/book.router'
dotenv.config()

const app = express()

app.use(express.json()) //allow to use json

app.use('/api/products', bookRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Server Live')
})

export default app
