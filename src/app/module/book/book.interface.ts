export enum BookCategory {
  Fiction = 'Fiction',
  Science = 'Science',
  SelfDevelopment = 'SelfDevelopment',
  Poetry = 'Poetry',
  Religious = 'Religious',
}

export interface IBook {
  title: string
  author: string
  price: number
  category: BookCategory
  description: string
  quantity: number
  inStock: boolean
  createdAt?: Date
  updatedAt?: Date
}
