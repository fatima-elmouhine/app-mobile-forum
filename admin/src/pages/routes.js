import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
// import LayoutTemplate from './components/layout/LayoutTemplate'
import { useNavigate, useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import Home from './Home'
import Login from './Login'

function Routes() {

    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
    useEffect(() => {
        if (window.localStorage.getItem('token') !== null) {
            console.log('token', window.localStorage.getItem('token'));
            const currentUser = jwtDecode(window.localStorage.getItem('token'))
            if (currentUser.role.role === 'ROLE_ADMIN') {
                setIsUserAuthenticated(true)
            } else {
                setIsUserAuthenticated(false)
            }
        }
    }, [])

    const params = useParams()
    const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
        {isUserAuthenticated==false && <Route path='/login' element={<Login />} />}
        <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default Routes