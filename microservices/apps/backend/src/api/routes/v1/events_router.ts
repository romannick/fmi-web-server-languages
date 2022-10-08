import express from 'express'
import asyncHandler from 'express-async-handler'
import { Container } from 'typedi'
import { BaseResponse, Request, Response, successResponse } from '@microservices/shared/types'
import { CreateEventRequest, Event } from '@microservices/api/backend-sdk'

import { EventService } from '../../../services/db/event_service'

const router = express.Router()
const eventService = Container.get(EventService)

router.post(
  '/create',
  asyncHandler(async (req: Request<CreateEventRequest>, res: Response<Event>) => {
    const car = await eventService.createEvent(req.body)

    res.status(200).send(car)
  })
)

router.get(
  '/all',
  asyncHandler(async (req: Request<void>, res: Response<Event[]>) => {
    const cars = await eventService.getAllEvents()

    res.status(200).send(cars)
  })
)

router.put(
  '/:id',
  asyncHandler(async (req: Request<CreateEventRequest>, res: Response<BaseResponse>) => {
    const id = Number(req.params.id)
    await eventService.editEvent(id, req.body)

    res.status(200).send(successResponse)
  })
)

router.delete(
  '/:id',
  asyncHandler(async (req: Request<void>, res: Response<BaseResponse>) => {
    const id = Number(req.params.id)
    await eventService.deleteEvent(id)

    res.status(200).send(successResponse)
  })
)

export default router
