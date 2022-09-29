import expressWinston from 'express-winston'
import { Express } from 'express'
import { Logger } from 'winston'

export const configureExpressWinston = (
  app: Express,
  logger: Logger,
  headerBlacklist: string[] = ['authorization'],
  bodyBlacklist: string[] = ['password', 'credentials'],
  requestWhitelist: string[] = ['body', 'params']
) => {
  expressWinston.requestWhitelist.push(...requestWhitelist)
  expressWinston.bodyBlacklist.push(...bodyBlacklist)

  app.use(
    expressWinston.logger({
      winstonInstance: logger,
      statusLevels: true,
      meta: true,
      msg: (req, res: any) => `${req.method} ${req.url} ${res.statusCode} ${res.responseTime}ms`,
      skip: (req) => req.path === '/health',
      colorize: true,
      headerBlacklist
    })
  )
  app.use(expressWinston.errorLogger({ winstonInstance: logger, meta: true }))
}
