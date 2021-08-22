import { createContext } from 'react'
import { setCookie, destroyCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
export const authContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'alurakut.user': user } = parseCookies()
    setUser(user)
  }, [])

  const logIn = (user, token) => {
    setCookie(null, 'alurakut.token', token, {
      maxAge: 60 * 60 * 1, //1 hour
    })

    setCookie(null, 'alurakut.user', user.login, {
      maxAge: 60 * 60 * 1, //1 hour
    })

    setUser(user.login)
    Router.push('/')
  }

  const logOut = () => {
    destroyCookie(null, 'alurakut.token')
    destroyCookie(null, 'alurakut.user')
    Router.push('/login')
  }
  return (
    <authContext.Provider value={{ user, isAuthenticated, logIn, logOut }}>
      {children}
    </authContext.Provider>
  )
}
