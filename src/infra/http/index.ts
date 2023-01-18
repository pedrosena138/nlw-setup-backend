import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { habitsSwaggerSchema } from '../../config/swagger'
import { HabitsController } from './controllers/habitsController'
import { createHabitUseCase } from '../../domain/useCases/createHabit'

const habitsController = new HabitsController(createHabitUseCase)

export async function router(app: FastifyInstance): Promise<void> {
  app.post('/habits', async (request, reply) => {
    return await habitsController.create(request, reply)
  })
}
