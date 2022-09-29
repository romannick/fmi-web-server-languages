import express from 'express'
import asyncHandler from 'express-async-handler'
import { Container } from 'typedi'
import { BaseResponse, Request, Response, successResponse } from '@microservices/shared/types'

import { AppService } from '../../../services/app_service'
import { HelloWorldRequest, HelloWorldResponse } from '@microservices/api/user-sdk'

const router = express.Router()
const appService = Container.get(AppService)

router.get(
  '/test',
  asyncHandler(async (req: Request<void>, res: Response<BaseResponse>) => {
    res.status(200).send(successResponse)
  })
)

router.post(
  '/hello-world',
  asyncHandler(async (req: Request<HelloWorldRequest>, res: Response<HelloWorldResponse>) => {
    const response = await appService.helloWorld(req.body)

    res.status(200).send(response)
  })
)

export default router
