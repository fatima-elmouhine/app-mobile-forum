import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = ({ isUserAuthenticated }) => {
  return (
    isUserAuthenticated ? <Outlet/> : <Navigate to={'/login'}/>
  )
}
export default PrivateRoutes