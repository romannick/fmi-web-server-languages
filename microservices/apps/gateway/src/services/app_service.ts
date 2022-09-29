import { Service } from 'typedi'
import { logger } from '@microservices/shared/log'

import { UserService } from "./external/user_service";
import { HelloWorldRequest, HelloWorldResponse } from "@microservices/api/user-sdk";

const log = logger('app_service')

@Service()
export class AppService {
  constructor(private userService: UserService) {}

  helloWorld(payload: HelloWorldRequest): Promise<HelloWorldResponse> {
    log.debug(`helloWorld: payload=${JSON.stringify(payload)}`)

    return this.userService.helloWorld(payload)
  }
}
