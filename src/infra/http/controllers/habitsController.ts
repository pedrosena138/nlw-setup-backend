import { FastifyReply, FastifyRequest } from 'fastify'
import { createHabitBody } from '../dtos/createHabitBody'
import { CreateHabitUseCase } from '../../../domain/useCases/createHabit'

export class HabitsController {
  constructor(
    private readonly createHabitUseCase: CreateHabitUseCase
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { title, weekDays } = createHabitBody.parse(request.body)
    await this.createHabitUseCase.execute({ title, weekDays })

    return await reply.send()
  }
}
