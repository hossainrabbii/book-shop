import { Router } from 'express'
import { bookController } from './book.controller'

const bookRouter = Router()
bookRouter.post('/', bookController.createBook)
bookRouter.get('/', bookController.getBooks)
bookRouter.get('/:productId', bookController.getBookById)
bookRouter.put('/:productId', bookController.updateBook)
bookRouter.delete('/:productId', bookController.deleteBook)
export default bookRouter
