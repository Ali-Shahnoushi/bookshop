import { createContext } from 'react'

const AuthContext = createContext({
  isLoggedIn: false,
  userData: null,
  token: null,
  login: () => {},
  logout: () => {},
})

export default AuthContext
