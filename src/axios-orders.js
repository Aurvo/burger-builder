import axios from 'axios'
import { firebaseProjectURL } from './firebase-project-constants'

const instance = axios.create({
    baseURL: firebaseProjectURL
})

export default instance