import express from 'express'
import asyncHandler from 'express-async-handler'
import { Container } from 'typedi'
import { Request, Response } from '@microservices/shared/types'
import { CreateUserRequest, User } from '@microservices/api/user-sdk'

import { UserService } from '../../../services/db/user_service'

const router = express.Router()
const userService = Container.get(UserService)

router.post(
  '/',
  asyncHandler(async (req: Request<CreateUserRequest>, res: Response<User>) => {
    const user = await userService.create(req.body)

    res.status(200).send(user)
  })
)

router.get(
  '/all',
  asyncHandler(async (req: Request<void>, res: Response<User[]>) => {
    const users = await userService.getAll()

    res.status(200).send(users)
  })
)

export default router
