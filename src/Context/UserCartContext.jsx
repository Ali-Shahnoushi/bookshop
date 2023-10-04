import { createContext } from 'react'

const booksInLocalStorage = JSON.parse(localStorage.getItem('cartItems')) || []

const UserCartContext = createContext({
  cart: booksInLocalStorage,
})

export default UserCartContext
