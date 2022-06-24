import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ServiceName } from '../serviceNames/serviceName.entity'

@Entity()
export class ServiceCategory {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number

  @ApiProperty()
  @Column({ unique: true })
  name: string

  @ApiProperty({ type: () => [ServiceName] })
  @OneToMany(() => ServiceName, (serviceName) => serviceName.serviceCategory)
  serviceName: ServiceName[]
}
