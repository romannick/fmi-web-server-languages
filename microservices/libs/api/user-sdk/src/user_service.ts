import { Logger } from 'winston'
import axios, { AxiosInstance } from 'axios'
import { id as rTracerId } from 'cls-rtracer'

import { HelloWorldRequest } from './models/request/HelloWorldRequest'
import { HelloWorldResponse } from './models/response/HelloWorldResponse'
import { CreateUserRequest } from './models/request/CreateUserRequest'
import { User } from './models/response/User'

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

  async createUser(payload: CreateUserRequest): Promise<User> {
    const response = await this.axiosInstance.post(`api/v1/users`, payload)
    return response.data
  }

  async getAllUsers(): Promise<User[]> {
    const response = await this.axiosInstance.get(`api/v1/users/all`)
    return response.data
  }
}
