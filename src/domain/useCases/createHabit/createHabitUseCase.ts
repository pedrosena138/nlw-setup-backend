import { Habit } from '../../entities/habit'
import { HabitsRepository } from '../../repositories/habitsRepository'

export interface CreateHabitRequest {
  title: string
  weekDays: number[]
}

export class CreateHabitUseCase {
  constructor(private readonly habitsRepository: HabitsRepository) {}

  async execute(request: CreateHabitRequest): Promise<void> {
    const { title, weekDays } = request
    const habit = new Habit({ title, weekDays })
    await this.habitsRepository.create(habit)
  }
}
