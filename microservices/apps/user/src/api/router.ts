import { Express } from 'express'

import HealthRouter from './routes/health_router'
import GreetingsRouter from './routes/v1/greetings_router'
import UsersRouter from './routes/v1/users_router'

const registerApiEndpoints = (app: Express) => {
  app.use('/health', HealthRouter)
  app.use('/api/v1/greetings', GreetingsRouter)
  app.use('/api/v1/users', UsersRouter)
}

export default registerApiEndpoints
