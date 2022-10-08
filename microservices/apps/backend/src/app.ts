import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { initGlobalTracer } from 'opentracing'
import rTracer from 'cls-rtracer'
import { configureExpressWinston, initTracer, logger } from '@microservices/shared/log'
import { Response } from '@microservices/shared/types'
import { handleError } from '@microservices/shared/utils'

import registerApiEndpoints from './api/router'
import { config } from './config/config'

const startApp = () => {
  const log = logger('app')
  const tracer = initTracer('app', log)

  initGlobalTracer(tracer)

  const app = express()

  app.use(bodyParser.json())
  app.use(cors())
  app.use(rTracer.expressMiddleware())
  app.use((error: Error, _, res: Response<unknown>, __: unknown) => handleError(res, error))

  configureExpressWinston(app, log)
  registerApiEndpoints(app)

  const server = app.listen(config.port, () =>
    console.log(`Started Backend at localhost:${config.port}`)
  )

  server.on('error', console.error)
}

startApp()
