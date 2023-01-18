import { randomUUID } from 'crypto'

export class BaseEntity {
  private readonly _id: string

  constructor(id?: string) {
    this._id = id ?? randomUUID()
  }

  public get id(): string {
    return this._id
  }
}
