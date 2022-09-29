import { logger } from '@microservices/shared/log'
import { Response } from '@microservices/shared/types'

const log = logger('error_resolver')

export const handleError = (res: Response<unknown>, error: Error): void => {
  log.error(`handleError: error=${error}`)

  res.status(500).send({ error: error.message })
}
