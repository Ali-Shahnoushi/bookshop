import { createContext } from 'react'

const AuthContext = createContext({
  isLoggedIn: false,
  userData: null,
  token: null,
  isLoading:null,
  login: () => {},
  logout: () => {},
})

export default AuthContext
