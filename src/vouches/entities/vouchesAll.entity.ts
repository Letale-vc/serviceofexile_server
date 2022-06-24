import { User } from '../../users/entities/user.entity'
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class VouchesAll {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column({ default: true })
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
