import { Request, Response } from 'express'
import { bookService } from './book.service'

// create a book
const createBook = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const newBook = await bookService.createBook(payload)

    res.json({
      message: 'Book created successfully',
      success: true,
      data: newBook,
    })
  } catch (error) {
    res.json({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}
// get all books and filter based on query
const getBooks = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query
    const query: any = {}

    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
        { author: { $regex: searchTerm, $options: 'i' } },
      ]
    }

    // Fetch books based on query
    const books = await bookService.getBooks(query)

    res.json({
      message: 'Books retrieved successfully',
      success: true,
      data: books,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error instanceof Error ? error.message : error,
    })
  }
}

// get single book
const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.productId
    const book = await bookService.getBookById(bookId)
    res.json({
      message: 'Book retrieved successfully',
      success: true,
      data: book,
    })
  } catch (error) {
    res.json({
      status: 404,
      success: false,
      message: 'Something went wrong, recheck book id',
      error,
    })
  }
}

// update a book
const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await bookService.updateBook(
      req.params.productId,
      req.body
    )

    res.json({
      message: 'Book updated successfully',
      success: true,
      data: updatedBook,
    })
  } catch (error) {
    res.json({
      status: 404,
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

// delete a book
const deleteBook = async (req: Request, res: Response) => {
  try {
    await bookService.deleteBook(req.params.productId)

    res.json({
      message: 'Book deleted successfully',
      success: true,
      data: {},
    })
  } catch (error) {
    res.json({
      status: 404,
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

// export functions
export const bookController = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
}
