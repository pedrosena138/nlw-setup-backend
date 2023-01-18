import { PrismaClient } from '@prisma/client'
import { Habit } from '../../../../domain/entities/habit'
import { HabitsRepository } from '../../../../domain/repositories/habitsRepository'
import { PrismaHabitMapper } from '../mappers/prismaHabitMapper'

export class PrismaHabitsRepository implements HabitsRepository {
  constructor(private readonly client: PrismaClient) {}

  async create(habit: Habit): Promise<void> {
    await this.client.habit.create({
      data: PrismaHabitMapper.toPrisma(habit)
    })
  }
}
