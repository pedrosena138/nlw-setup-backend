import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

async function cleanDatabase(): Promise<void> {
  await prisma.habitWeekDay.deleteMany()
  await prisma.dayHabit.deleteMany()
  await prisma.day.deleteMany()
  await prisma.habit.deleteMany()
}

async function populateDatabase(): Promise<void> {
  const habits = [
    {
      id: randomUUID(),
      title: 'Beber 2L água',
      created_at: new Date('2022-12-31T03:00:00.000'),
      weekDays: {
        create: [
          { week_day: 1 },
          { week_day: 2 },
          { week_day: 3 }
        ]
      }
    },
    {
      id: randomUUID(),
      title: 'Exercitar',
      created_at: new Date('2023-01-03T03:00:00.000'),
      weekDays: {
        create: [
          { week_day: 3 },
          { week_day: 4 },
          { week_day: 5 }
        ]
      }
    },
    {
      id: randomUUID(),
      title: 'Ler um livro',
      created_at: new Date('2023-01-03T03:00:00.000'),
      weekDays: {
        create: [
          { week_day: 1 },
          { week_day: 2 },
          { week_day: 3 },
          { week_day: 4 },
          { week_day: 5 }
        ]
      }
    }
  ]

  const days = [
    {
      /** Monday */
      date: new Date('2023-01-02T03:00:00.000z'),
      dayHabits: {
        create: {
          habit_id: habits[0].id
        }
      }
    },
    {
      /** Friday */
      date: new Date('2023-01-06T03:00:00.000z'),
      dayHabits: {
        create: {
          habit_id: habits[0].id
        }
      }
    },
    {
      /** Wednesday */
      date: new Date('2023-01-04T03:00:00.000z'),
      dayHabits: {
        create: [
          { habit_id: habits[0].id },
          { habit_id: habits[1].id }
        ]
      }
    }
  ]

  await Promise.all(habits.map(habit =>
    prisma.habit.create({
      data: habit
    })
  ))

  await Promise.all(days.map(day =>
    prisma.day.create({
      data: day
    })
  ))
}

async function main(): Promise<void> {
  try {
    await prisma.$connect()
    await cleanDatabase()
    await populateDatabase()
    await prisma.$disconnect()
  } catch (err) {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  }
}

main()
