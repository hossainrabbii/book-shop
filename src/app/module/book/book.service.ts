import { IBook } from './book.interface'
import { Book } from './book.model'

const createBook = async (payload: IBook): Promise<IBook> => {
  const result = await Book.create(payload)
  return result
}

const getBooks = async () => {
  return await Book.find()
}

const getBookById = async (id: string) => {
  return (await Book.findById(id)) || null
}

const updateBook = async (id: string, bookData: Partial<IBook>) => {
  return await Book.findByIdAndUpdate(id, bookData, {
    new: true,
    runValidators: true,
  })
}

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
