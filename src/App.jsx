import React, { useCallback, useEffect, useState } from 'react'
import routes from './routes'
import { useRoutes } from 'react-router-dom'
import AuthContext from './Context/AuthContext'

export default function App() {
  const routing = useRoutes(routes)
  const [userData, setUserData] = useState({})
  const [token, setToken] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = useCallback((userData, token) => {
    setToken(token)
    setIsLoggedIn(true)
    setUserData(userData)
    localStorage.setItem('user', JSON.stringify({ token }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setIsLoggedIn(false)
    localStorage.removeItem('user')
  }, [])

  useEffect(() => {
    const userLocalStorageData = JSON.parse(localStorage.getItem('user'))
    if (userLocalStorageData) {
      fetch('http://localhost:8000/api/user/get/info', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userLocalStorageData.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoggedIn(true)
          setUserData(data.data)
        })
    }
  }, [login])

  return (
    <AuthContext.Provider
      value={{
        userData,
        isLoggedIn,
        token,
        login,
        logout,
      }}
    >
      {routing}
    </AuthContext.Provider>
  )
}
