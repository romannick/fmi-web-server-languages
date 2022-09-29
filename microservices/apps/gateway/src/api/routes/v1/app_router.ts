import express from 'express'
import asyncHandler from 'express-async-handler'
import { Container } from 'typedi'
import { BaseResponse, Request, Response, successResponse } from '@microservices/shared/types'
import {
  CreateUserRequest,
  HelloWorldRequest,
  HelloWorldResponse,
  User
} from '@microservices/api/user-sdk'

import { AppService } from '../../../services/app_service'

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

router.post(
  '/create-user',
  asyncHandler(async (req: Request<CreateUserRequest>, res: Response<User>) => {
    const user = await appService.createUser(req.body)

    res.status(200).send(user)
  })
)

router.get(
  '/get-users',
  asyncHandler(async (req: Request<void>, res: Response<User[]>) => {
    const users = await appService.getAllUsers()

    res.status(200).send(users)
  })
)

export default router
