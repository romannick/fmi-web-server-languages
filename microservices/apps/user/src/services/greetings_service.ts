import { Service } from 'typedi'
import { logger } from '@microservices/shared/log'

import { HelloWorldRequest, HelloWorldResponse } from "@microservices/api/user-sdk";

const log = logger('app_service')

@Service()
export class AppService {
  helloWorld(payload: HelloWorldRequest): Promise<HelloWorldResponse> {
    log.debug(`helloWorld: payload=${JSON.stringify(payload)}`)

    return Promise.resolve({ message: `${payload.message} - Returned from User microservice` })
  }
}
