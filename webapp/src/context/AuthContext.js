import React, { createContext, useContext, useEffect, useState } from 'react'
import RequestService from '../services/Request.service'

const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) throw new Error('There is no Auth provider')
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)

  const login = async (user_email, user_password) => {
    const response = await RequestService.post('/users/login', {
      user_email,
      user_password,
    })
    if (response.status === 200 && response.data.user) {
      setUser(response.data.user)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    } else {
      throw new Error(response.data.error)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('access-token')
    localStorage.removeItem('user')
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token')
    const userData = localStorage.getItem('user')
    if (accessToken && userData) {
      setUser(JSON.parse(userData))
    }
    setLoadingUser(false)
  }, [])

  return (
    <authContext.Provider
      value={{
        login,
        user,
        logout,
        loadingUser,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
