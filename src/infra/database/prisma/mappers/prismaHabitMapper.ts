import { Habit } from '../../../../domain/entities/habit'

export class PrismaHabitMapper {
  static toPrisma(habit: Habit) {
    return {
      id: habit.id,
      title: habit.title,
      created_at: habit.createdAt,
      weekDays: {
        create: habit.weekDays.map(weekDay => {
          return { week_day: weekDay }
        })
      }
    }
  }

  static toDomain() {}
}
