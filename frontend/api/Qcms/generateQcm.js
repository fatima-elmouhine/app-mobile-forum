import axiosInstance from '../config'

 export const generateQcm = async ( idTheme, nbQuestion ) => {
    const { data } = await axiosInstance.get(`qcms/generate/${nbQuestion}/${idTheme}`)
    return data
 }