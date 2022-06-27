import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsDefined, IsNumber } from 'class-validator'

export class LeagueDeleteDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  id: number

  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string
}
