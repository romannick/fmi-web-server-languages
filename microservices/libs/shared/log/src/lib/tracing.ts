import { Logger } from 'winston'
import { initTracerFromEnv } from 'jaeger-client'

export const initTracer = (serviceName: string, logger: Logger) => {
  const config = {
    serviceName,
    sampler: {
      type: 'const',
      param: 1
    },
    reporter: {
      logSpans: false
    }
  }

  return initTracerFromEnv(config, { logger })
}
