import { Service } from 'typedi'
import { UserService as UserServiceSDK } from '@microservices/api/user-sdk'
import { logger } from '@microservices/shared/log'

import { config } from '../../config/config'

const log = logger('user_service')

@Service()
export class UserService extends UserServiceSDK {
  constructor() {
    super(config.services.userServiceAPI, log)
  }
}
