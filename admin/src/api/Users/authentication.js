import axiosInstance from '../config'
import jwtDecode from 'jwt-decode'

export const userAuthentication = async ( email, password ) => {
  if (window.localStorage.getItem('token') !== null) {
    window.localStorage.removeItem('token')
  }

  const response = await axiosInstance.post('users/login', {
    email,
    password
  })

  try {
    if (response.status === 200) {
      const decodedToken = jwtDecode(response.data.token)
      decodedToken.role.map((roleItem) => {
        if (roleItem === 'ROLE_ADMIN') {
          window.localStorage.setItem('token', response.data.token)
          document.cookie = `token=${response.data.token}`
          console.log('responsToken', response.data.token);
          return response.data.token
        } else {
          console.log('Vous n\'avez pas les droits d\'accès');
          return 'Vous n\'avez pas les droits d\'accès'
        }
      })
      
    } 
  } catch (e) {
    switch (e) {
    case e.request:
      console.log(e.request)
      console.log(e.message)
      break
    case e.response:
      console.log(e.response)
      console.log(e.message)
      break
    default:
      console.log(e.config)
    }
  }
    return response.data && response.data.token
}