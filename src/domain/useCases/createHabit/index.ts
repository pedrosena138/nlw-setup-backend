import { prismaHabitsRepository } from '../../../infra/database/prisma'
import { CreateHabitUseCase } from './createHabitUseCase'

const createHabitUseCase = new CreateHabitUseCase(prismaHabitsRepository)

export { createHabitUseCase, CreateHabitUseCase }
