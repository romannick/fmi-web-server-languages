import { createLogger, format, transports } from 'winston'
import { id } from 'cls-rtracer'

const { printf, combine, timestamp } = format

const WINSTON_LOG_LEVEL = process.env.WINSTON_LOG_LEVEL || 'info'

const logFormat = (moduleName: string) =>
  printf((info) => {
    const rid = id()

    let log = rid
      ? `${info.timestamp}|${info.level}|[request-id:${rid}]|${moduleName}`
      : `${info.timestamp}|${info.level}|${moduleName}`

    if (info instanceof Error) {
      log += `|${info.stack}`
    } else {
      log += `|${info.message}`
    }

    // For express winston
    if (info.meta) {
      if (info.meta.exception) {
        // Include exception details
        log += `|${info.meta.message}`
      } else {
        log += `|${JSON.stringify(info.meta)}`
      }
    }

    return log
  })

export default (moduleName: string) => {
  const options = {
    console: {
      handleExceptions: true
    }
  }

  return createLogger({
    level: WINSTON_LOG_LEVEL,
    transports: [new transports.Console(options.console)],
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss.ms' }), logFormat(moduleName)),
    exitOnError: false
  })
}
