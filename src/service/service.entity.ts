import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { ServiceName } from '../data/serviceNames/serviceName.entity'
import { League } from '../data/league/league.entity'
import { User } from '../users/entities/user.entity'
import { Currency } from '../data/currency/currency.entity'

@Entity({ name: 'services' })
export class Service {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @ApiProperty()
  @Column({ type: 'text', enum: ['WTS', 'WTS'] })
  sellOrBuy: string

  @ApiProperty()
  @Column({ type: 'float', default: 0 })
  price: number

  @ApiProperty()
  @Column({ default: 1, nullable: false })
  bulk: number

  @ApiProperty()
  @Column({ default: true })
  active: boolean

  @ManyToOne(() => User, (user) => user.services)
  user: User

  @ManyToOne(() => ServiceName)
  @ApiProperty({ type: () => ServiceName })
  serviceName: ServiceName

  @ManyToOne(() => League)
  @ApiProperty({ type: () => League })
  league: League

  @ManyToOne(() => Currency)
  @ApiProperty({ type: () => Currency })
  currency: Currency
}
