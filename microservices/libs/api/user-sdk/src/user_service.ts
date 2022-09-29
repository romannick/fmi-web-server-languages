import { Logger } from 'winston'
import axios, { AxiosInstance } from 'axios'
import { id as rTracerId } from 'cls-rtracer'
import { HelloWorldRequest } from './models/request/HelloWorldRequest'
import { HelloWorldResponse } from './models/response/HelloWorldResponse'

export class UserService {
  axiosInstance: AxiosInstance

  constructor(serviceUrl: string, log: Logger) {
    this.axiosInstance = axios.create({
      baseURL: serviceUrl
    })

    this.axiosInstance.interceptors.request.use(
      (config) => {
        log.debug(`Sending request to url=${config.url}`)
        config.headers = { 'X-Correlation-Id': String(rTracerId()) }

        return config
      },
      (error) => Promise.reject(error)
    )
  }

  async helloWorld(payload: HelloWorldRequest): Promise<HelloWorldResponse> {
    const response = await this.axiosInstance.post(`api/v1/greetings/hello-world`, payload)
    return response.data
  }
}
