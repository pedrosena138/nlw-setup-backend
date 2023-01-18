import { BaseEntity } from '../../utils/baseEntity'
import { z as zod } from 'zod'
import { Replace } from '../../utils/replaceType'

import dayjs from 'dayjs'

export const habitSchema = zod.object({
  title: zod.string(),
  weekDays: zod.array(zod.number().min(0).max(6)),
  createdAt: zod.date()
})

type HabitProps = zod.infer<typeof habitSchema>

export class Habit extends BaseEntity {
  private readonly props: HabitProps

  constructor(
    props: Replace<HabitProps, { createdAt?: Date }>,
    id?: string
  ) {
    super(id)

    const today = dayjs().startOf('day').toDate()

    this.props = {
      ...props,
      createdAt: props.createdAt ?? today
    }
  }

  public get weekDays(): number[] {
    return this.props.weekDays
  }

  public set weekDays(weekDays: number[]) {
    this.props.weekDays = weekDays
  }

  public get title(): string {
    return this.props.title
  }

  public set title(title: string) {
    this.props.title = title
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
