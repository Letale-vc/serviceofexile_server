import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { UserRoles } from './role.enum'

@Entity({ name: 'roles' })
export class Role {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ type: () => UserRoles })
  @Column({ type: 'enum', default: UserRoles.User, enum: UserRoles })
  name: UserRoles
}
