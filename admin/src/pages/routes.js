import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import SideBar from '../component/layout/SideBar'
import Home from './Home'
import Login from './Login'
import Users from './Users'

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (window.localStorage.getItem('token') !== null) {
      const token = jwtDecode(window.localStorage.getItem('token'))
      if (token.role.role === 'ROLE_ADMIN') {
        setIsAuthenticated(true)
      }
    }
  }, [])

  return (
    <BrowserRouter>
      {isAuthenticated === true ? (
        <Routes >
          <Route path="/" element={<SideBar />} />
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      ) : (
        <Route path="/" element={<Login />} />
      )
      }
    </BrowserRouter>
  )
}

export default AppRouter
