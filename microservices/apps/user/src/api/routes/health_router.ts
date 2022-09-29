import { Router } from 'express'
import { Request, Response } from '@microservices/shared/types'

const router = Router()

router.get('/', (req: Request<void>, res: Response<void>) => {
  res.sendStatus(200)
})

export default router
