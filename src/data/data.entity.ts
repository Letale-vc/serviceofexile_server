import { ApiProperty } from '@nestjs/swagger'
import { Currency } from './currency/currency.entity'
import { League } from './league/league.entity'
import { ServiceCategory } from './serviceCategory/serviceCategory.entity'

export class Data {
  @ApiProperty({ type: () => [League] })
  league: League[]

  @ApiProperty({ type: () => [Currency] })
  currency: Currency[]

  @ApiProperty({ type: () => [ServiceCategory] })
  serviceCategory: ServiceCategory[]

  @ApiProperty({ type: ['string'] })
  serviceCategoryNames: string[]
}
