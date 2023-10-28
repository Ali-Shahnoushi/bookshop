import { useCallback, useEffect, useState } from 'react'
import routes from './routes'
import { useRoutes } from 'react-router-dom'
import AuthContext from './Context/AuthContext'
import useGetUserInfo from './services/userRoutes/user/getUserInfo'

export default function App() {
  const routing = useRoutes(routes)
  const [userData, setUserData] = useState({})
  const [token, setToken] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [isLoading, setIsLoading] = useState(true)

  const login = useCallback((userData, token) => {
    setToken(token)
    setIsLoggedIn(true)
    setUserData(userData)
    localStorage.setItem('user', JSON.stringify({ token }))
  }, [])

  const userLocalStorageData = JSON.parse(localStorage.getItem('user'))
  const { data, isLoading } = useGetUserInfo(userLocalStorageData.token)

  useEffect(() => {
    if (!isLoading) {
      setIsLoggedIn(true)
      setUserData(data)
    }
  }, [isLoading])

  const logout = useCallback(() => {
    setToken(null)
    setIsLoggedIn(false)
    localStorage.removeItem('user')
  }, [])

  // useEffect(() => {
  //   const userLocalStorageData = JSON.parse(localStorage.getItem('user'))

  //   if (userLocalStorageData) {
  //     fetch('http://localhost:8000/api/user/get/info', {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${userLocalStorageData.token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data)
  //         setIsLoggedIn(true)
  //         setUserData(data.data)
  //       })
  //   }
  // }, [login])

  return (
    !isLoading && (
      <AuthContext.Provider
        value={{
          userData,
          isLoggedIn,
          isLoading,
          token,
          login,
          logout,
        }}
      >
        {routing}
      </AuthContext.Provider>
    )
  )
}
