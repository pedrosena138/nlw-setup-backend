import Fastfify from 'fastify';
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

const app = Fastfify()
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
  port: 3333,
}).then(() => {
  console.log('Server running on port 3333')
}).catch(err => {
  console.error(err)
})