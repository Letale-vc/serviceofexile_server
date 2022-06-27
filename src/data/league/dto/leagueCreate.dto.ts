import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsDefined } from 'class-validator'

export class LeagueCreateDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string
}
