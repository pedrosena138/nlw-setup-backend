import { PrismaClient } from '@prisma/client'
import { PrismaHabitsRepository } from './repositories/prismaHabitsRepository'

const client = new PrismaClient()

export const prismaHabitsRepository = new PrismaHabitsRepository(client)
