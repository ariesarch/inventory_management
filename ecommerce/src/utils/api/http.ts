import axios from 'axios'
import { getToken } from './get-token'
import { createHmac } from 'crypto'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT, // TODO: take this api URL from env
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Change request data/error here
http.interceptors.request.use(
  (config: any) => {
    // console.log("GUEST_KEY:", process.env.NEXT_PUBLIC_GUEST_KEY);
    const token = getToken()
    config.headers = {
      ...config.headers,
      AppToken: createHmac(
        'sha256',
        process.env.NEXT_PUBLIC_GUEST_KEY as string
      )
        .update(process.env.NEXT_PUBLIC_GUEST_SECRET as string)
        .digest('hex'),
      Authorization: `Bearer ${token ? token : ''}`,
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http
