import { Express } from 'express'

import CarsRouter from './routes/v1/cars_router'
import EventsRouter from './routes/v1/events_router'

const registerApiEndpoints = (app: Express) => {
  app.use('/api/v1/cars', CarsRouter)
  app.use('/api/v1/events', EventsRouter)
}

export default registerApiEndpoints
