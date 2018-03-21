import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-builder-ce2aa.firebaseio.com/'
})

export default instance