import { ApiProperty } from '@nestjs/swagger'

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
