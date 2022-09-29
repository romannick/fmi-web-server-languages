import express from 'express'
import asyncHandler from 'express-async-handler'
import { Container } from 'typedi'
import { Request, Response } from '@microservices/shared/types'

import { AppService } from '../../../services/greetings_service'
import { HelloWorldRequest, HelloWorldResponse } from '@microservices/api/user-sdk'

const router = express.Router()
const appService = Container.get(AppService)

router.post(
  '/hello-world',
  asyncHandler(async (req: Request<HelloWorldRequest>, res: Response<HelloWorldResponse>) => {
    const response = await appService.helloWorld(req.body)

    res.status(200).send(response)
  })
)

export default router
