import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '../users/entities/user.entity'

@Entity()
export class Banlist {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User)
  whoBanned: User

  @ApiProperty()
  @Column({ nullable: false })
  reasonBan: string

  @OneToOne(() => User, (user) => user.banned)
  @JoinColumn()
  user: User
}
