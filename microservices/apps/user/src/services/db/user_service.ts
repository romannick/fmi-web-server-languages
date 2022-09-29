import { Service } from 'typedi'
import { logger } from '@microservices/shared/log'
import { CreateUserRequest } from '@microservices/api/user-sdk'
import { UserModel } from '@microservices/db-models/user'

const log = logger('user_service')

@Service()
export class UserService {
  create(payload: CreateUserRequest): Promise<UserModel> {
    log.debug(`create: payload=${JSON.stringify(payload)}`)

    return UserModel.create({ firstName: payload.firstName, lastName: payload.lastName })
  }

  getAll(): Promise<UserModel[]> {
    log.debug(`getAll`)

    return UserModel.findAll()
  }
}
