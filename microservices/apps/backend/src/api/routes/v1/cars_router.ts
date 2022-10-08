import express from 'express'
import asyncHandler from 'express-async-handler'
import { Container } from 'typedi'
import { BaseResponse, Request, Response, successResponse } from '@microservices/shared/types'
import { Car, CreateCarRequest } from '@microservices/api/backend-sdk'

import { CarService } from '../../../services/db/car_service'

const router = express.Router()
const carService = Container.get(CarService)

router.post(
  '/create',
  asyncHandler(async (req: Request<CreateCarRequest>, res: Response<Car>) => {
    const car = await carService.createCar(req.body)

    res.status(200).send(car)
  })
)

router.get(
  '/all',
  asyncHandler(async (req: Request<void>, res: Response<Car[]>) => {
    try {
      const cars = await carService.getAllCars()
      res.status(200).send(cars)
    } catch (error) {
      console.log(error)
    }
  })
)

router.put(
  '/:id',
  asyncHandler(async (req: Request<CreateCarRequest>, res: Response<BaseResponse>) => {
    const id = Number(req.params.id)
    await carService.editCar(id, req.body)

    res.status(200).send(successResponse)
  })
)

router.delete(
  '/:id',
  asyncHandler(async (req: Request<void>, res: Response<BaseResponse>) => {
    const id = Number(req.params.id)
    await carService.deleteCar(id)

    res.status(200).send(successResponse)
  })
)

export default router
