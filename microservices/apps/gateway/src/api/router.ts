import { Express } from 'express'

import HealthRouter from './routes/health_router'
import AppRouter from './routes/v1/app_router'

const registerApiEndpoints = (app: Express) => {
  app.use('/health', HealthRouter)
  app.use('/api/v1/app', AppRouter)
}

export default registerApiEndpoints
