import { ServiceCategory } from '../serviceCategory/serviceCategory.entity'
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class ServiceName {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column({ unique: true })
  name: string

  @ApiProperty({ type: () => ServiceCategory })
  @ManyToOne(
    () => ServiceCategory,
    (serviceCategory) => serviceCategory.serviceName
  )
  serviceCategory: ServiceCategory
}
