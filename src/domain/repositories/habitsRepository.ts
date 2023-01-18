import { Habit } from '../entities/habit'

export interface HabitsRepository {
  create: (habit: Habit) => Promise<void>
}
