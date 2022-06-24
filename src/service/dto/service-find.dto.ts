import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNumber, IsString } from 'class-validator'

export class ServicesFindDto {
  [index: string]: any

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  serviceNameId: number

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  leagueId: number

  @ApiProperty()
  @IsString()
  @IsDefined()
  sellOrBuy: string
}
