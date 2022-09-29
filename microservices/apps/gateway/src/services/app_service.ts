import { Service } from 'typedi'
import { logger } from '@microservices/shared/log'
import {
  CreateUserRequest,
  HelloWorldRequest,
  HelloWorldResponse,
  User
} from '@microservices/api/user-sdk'

import { UserService } from './external/user_service'

const log = logger('app_service')

@Service()
export class AppService {
  constructor(private userService: UserService) {}

  helloWorld(payload: HelloWorldRequest): Promise<HelloWorldResponse> {
    log.debug(`helloWorld: payload=${JSON.stringify(payload)}`)

    return this.userService.helloWorld(payload)
  }

  createUser(payload: CreateUserRequest): Promise<User> {
    log.debug(`createUser: payload=${JSON.stringify(payload)}`)

    return this.userService.createUser(payload)
  }

  getAllUsers(): Promise<User[]> {
    log.debug(`getAllUsers`)

    return this.userService.getAllUsers()
  }
}
