import { ApiProperty } from '@nestjs/swagger'
import { Service } from '../../service/service.entity'
import { User } from '../entities/user.entity'

export class VouchesCount {
  @ApiProperty()
  readonly vouches_unique_all_count: number

  @ApiProperty()
  readonly vouches_all_count: number

  @ApiProperty()
  readonly vouches_unique_league_count: number

  @ApiProperty()
  readonly vouches_league_count: number
}

export class UserSerializer {
  constructor(userReturnFindOneDb: User) {
    this.uuid = userReturnFindOneDb.uuid
    this.characterName = userReturnFindOneDb.characterName
    this.discord = userReturnFindOneDb.discord
    this.accountName = userReturnFindOneDb.accountName
    this.discordId = userReturnFindOneDb.discordId
    this.isOnline = userReturnFindOneDb.isOnline
    this.created_at = userReturnFindOneDb.created_at
    this.roles = userReturnFindOneDb.roles.map((el) => el.name)
    this.services = userReturnFindOneDb.services
    this.vouches = {
      vouches_unique_all_count:
        userReturnFindOneDb.vouches_unique_all_count || 0,
      vouches_all_count: userReturnFindOneDb.vouches_all_count || 0,
      vouches_unique_league_count:
        userReturnFindOneDb.vouches_unique_league_count || 0,
      vouches_league_count: userReturnFindOneDb.vouches_league_count || 0
    }
  }

  @ApiProperty()
  public readonly uuid: string

  @ApiProperty()
  public readonly roles: string[]

  @ApiProperty()
  public readonly accountName: string

  @ApiProperty()
  public readonly characterName: string

  @ApiProperty()
  public readonly discord: string | null

  @ApiProperty()
  public readonly discordId: string | null

  @ApiProperty()
  public readonly isOnline: boolean

  @ApiProperty({ type: () => [Service] })
  public readonly services: Service[]

  @ApiProperty({ type: () => Date })
  public readonly created_at: Date

  @ApiProperty({ type: () => VouchesCount })
  public readonly vouches: VouchesCount
}
