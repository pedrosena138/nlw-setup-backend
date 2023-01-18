import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { habitsSwaggerSchema } from '../../config/swagger'

const prisma = new PrismaClient()

export function router(app: FastifyInstance): void {
  app.get('/habits', habitsSwaggerSchema.get, async () => {
    const habits = await prisma.habit.findMany()
    return habits
  })
}
