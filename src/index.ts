import Fastfify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import { loggerFormat } from './config/logger'

const app = Fastfify({
  logger: loggerFormat.development
})

const prisma = new PrismaClient()

app.register(cors)

app.get('/', () => {
  return { message: 'Hello World' }
})

app.get('/habits', async () => {
  const habits = await prisma.habit.findMany()
  return habits
})

app.listen({
  port: 3333
})
