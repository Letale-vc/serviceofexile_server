import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { VouchesLeague } from '../../vouches/entities/vouchesLeague.entity'
import { VouchesAll } from '../../vouches/entities/vouchesAll.entity'
import { Banlist } from '../../banlist/banlist.entity'
import { Service } from '../../service/service.entity'
import { Role } from '../../role/role.entity'

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryColumn('uuid')
  uuid: string

  @ApiProperty()
  @Column({ unique: true })
  accountName: string

  @ApiProperty()
  @Column()
  characterName: string

  @ApiProperty()
  @Column({ nullable: true })
  discord: string

  @ApiProperty()
  @Column({ nullable: true })
  discordId: string

  @ApiProperty()
  @Column({ default: false })
  isOnline: boolean

  @ApiProperty({ type: () => [Service] })
  @OneToMany(() => Service, (services) => services.user)
  services: Service[]

  @ApiProperty({ type: () => Banlist })
  @OneToOne(() => Banlist, (banlist) => banlist.user)
  @JoinColumn()
  banned: Banlist

  @OneToMany(() => VouchesAll, (vouches_all) => vouches_all.user, {
    cascade: true
  })
  vouches_all: VouchesAll[]

  @OneToMany(() => VouchesLeague, (vouches_league) => vouches_league.user)
  vouches_league: VouchesLeague[]

  @ApiProperty({ type: [Role] })
  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[]

  @ApiProperty({ type: () => Date })
  @CreateDateColumn()
  created_at: Date

  @ApiProperty({ type: () => Date })
  @UpdateDateColumn()
  updated_at: Date

  @ApiProperty()
  vouches_all_count: number

  @ApiProperty()
  vouches_unique_all_count: number

  @ApiProperty()
  vouches_unique_league_count: number

  @ApiProperty()
  vouches_league_count: number
}
