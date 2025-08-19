import axios from 'axios'

const api = axios.create({
    baseURL: 'http://to-do-list-nu-lovat-66.vercel.app'
})

export default api