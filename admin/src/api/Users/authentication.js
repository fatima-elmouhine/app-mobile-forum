import axiosInstance from '../config'

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
      window.localStorage.setItem('token', response.data.token)
      console.log(response.data.token);
      return response.data.token
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