import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsDefined, IsNumber } from 'class-validator'

export class LeagueCreateDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string
}

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
