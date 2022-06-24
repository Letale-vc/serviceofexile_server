import { ApiProperty } from '@nestjs/swagger'
import { Service } from '../service.entity'

export class ServiceSerializer {
  constructor(private readonly _servicesDb: [Service[], number]) {
    this.services = this._servicesDb[0]
    this.totalItems = this._servicesDb[1]
  }

  @ApiProperty({ type: () => [Service] })
  readonly services: Service[]

  @ApiProperty()
  readonly totalItems: number
}
