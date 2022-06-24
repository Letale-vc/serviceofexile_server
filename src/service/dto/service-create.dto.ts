import { ApiProperty } from '@nestjs/swagger'
import {
  IsDefined,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min
} from 'class-validator'

export class ServiceCreateDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  readonly sellOrBuy!: string

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  readonly currencyId!: number

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsPositive()
  @Min(1)
  readonly serviceNameId: number

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsPositive()
  @Min(1)
  readonly leagueId: number

  @ApiProperty()
  @IsDefined()
  @Min(0.1)
  @Max(100)
  @IsPositive()
  readonly price: number

  @ApiProperty()
  @IsDefined()
  @Min(1)
  @Max(100)
  @IsPositive()
  readonly bulk: number
}
