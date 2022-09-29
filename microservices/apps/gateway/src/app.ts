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

const startApp = () => {
  const log = logger('app')
  const tracer = initTracer('app', log)

  initGlobalTracer(tracer)

  const app = express()
  const port = process.env.PORT

  app.use(bodyParser.json())
  app.use(cors())
  app.use(rTracer.expressMiddleware())
  app.use((error: Error, _, res: Response<unknown>, __: unknown) => handleError(res, error))

  configureExpressWinston(app, log)
  registerApiEndpoints(app)

  const server = app.listen(port, () =>
    console.log(`Started Microservices Gateway at localhost:${port}`)
  )

  server.on('error', console.error)
}

startApp()
