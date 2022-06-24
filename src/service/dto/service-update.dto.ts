import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min
} from 'class-validator'

export class ServiceUpdateDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  readonly uuid!: string

  @ApiProperty()
  @IsNumber()
  readonly leagueId: number

  @ApiProperty()
  @IsNumber()
  readonly serviceNameId: number

  @ApiProperty()
  @IsString()
  readonly sellOrBuy: string

  @ApiProperty()
  @IsString()
  readonly currencyId: number

  @ApiProperty()
  @Min(0.1)
  @Max(100)
  @IsPositive()
  readonly price?: number

  @ApiProperty()
  @Min(1)
  @Max(100)
  @IsPositive()
  readonly bulk?: number

  @ApiProperty()
  @IsBoolean()
  readonly active: boolean
}
