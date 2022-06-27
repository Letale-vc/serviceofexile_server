import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '../../users/entities/user.entity'

@Entity()
export class VouchesLeague {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column('boolean', { default: true })
  vouche: boolean

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => User)
  whoGive: User

  @ApiProperty({ type: () => Date })
  @CreateDateColumn()
  created_at: Date

  @ApiProperty({ type: () => Date })
  @UpdateDateColumn()
  updated_at: Date
}
