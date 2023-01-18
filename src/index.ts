import Fastfify from 'fastify'
import cors from '@fastify/cors'

import { logger } from './config/logger'
import { router } from './infra/http/router'
import { swaggerConfig } from './config/swagger'

const app = async (): Promise<void> => {
  const fastify = Fastfify({
    logger: process.env.NODE_ENV !== 'production' ? logger.development : logger.production
  })

  await fastify.register(cors)

  await swaggerConfig(fastify)

  router(fastify)

  await fastify.ready()

  fastify.swagger()

  fastify.listen({
    port: 3333
  })
}

app()
