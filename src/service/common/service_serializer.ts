import { ApiProperty } from '@nestjs/swagger'
import { Service } from '../service.entity'

export class ServiceSerializer {
  constructor(private readonly _servicesDb: [Service[], number]) {
    const [services, totalItems] = this._servicesDb
    this.services = services
    this.totalItems = totalItems
  }

  @ApiProperty({ type: () => [Service] })
  readonly services: Service[]

  @ApiProperty()
  readonly totalItems: number
}
