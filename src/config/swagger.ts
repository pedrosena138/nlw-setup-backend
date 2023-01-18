import { FastifyDynamicSwaggerOptions, fastifySwagger } from '@fastify/swagger'
import { FastifySwaggerUiOptions, fastifySwaggerUi } from '@fastify/swagger-ui'
import { FastifyInstance } from 'fastify'

export async function swaggerConfig(fastify: FastifyInstance): Promise<void> {
  const swaggerOpts: FastifyDynamicSwaggerOptions = {
    openapi: {
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      info: {
        title: 'NLW Setup',
        description: 'Fastify API RESTful',
        version: '0.1.0'
      },
      tags: [
        { name: 'Habits Controller' }
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'apiKey',
            in: 'header'
          }
        }
      }
    },
    hideUntagged: false
  }

  await fastify.register(fastifySwagger, swaggerOpts)

  const swaggerUiOpts: FastifySwaggerUiOptions = {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  }

  await fastify.register(fastifySwaggerUi, swaggerUiOpts)

  fastify.addSchema({
    $id: 'Habit',
    type: 'object',
    required: ['title'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      title: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' }
    }
  })
}

export const habitsSwaggerSchema = {
  get: {
    schema: {
      description: 'List habits',
      tags: ['Habits Controller'],
      response: {
        200: {
          'x-response-description': 'Ok',
          type: 'array',
          items: {
            $ref: 'Habit#'
          }
        }
      }
    }
  }
}
