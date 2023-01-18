import { z as zod } from 'zod'

export const createHabitBody = zod.object({
  title: zod.string(),
  weekDays: zod.array(zod.number())
})
