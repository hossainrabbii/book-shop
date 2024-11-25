import { IBook } from './book.interface'
import { Book } from './book.model'

// create new book
const createBook = async (payload: IBook): Promise<IBook> => {
  const result = await Book.create(payload)
  return result
}

// get all books
const getBooks = async () => {
  return await Book.find()
}
// get single book
const getBookById = async (id: string) => {
  return (await Book.findById(id)) || null
}
// update a book
const updateBook = async (id: string, bookData: Partial<IBook>) => {
  return await Book.findByIdAndUpdate(id, bookData, {
    new: true,
    runValidators: true,
  })
}
// delete a book
const deleteBook = async (id: string) => {
  return await Book.findByIdAndDelete(id)
}

export const bookService = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
}
