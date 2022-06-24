import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNumber } from 'class-validator'

export class CurrencyDeleteDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  currencyId: number
}
