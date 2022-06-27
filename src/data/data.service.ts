import { Injectable } from '@nestjs/common'
import { Data } from './data.entity'
import { ServiceCategoryService } from './serviceCategory/serviceCategory.service'
import { LeagueService } from './league/league.service'
import { CurrencyService } from './currency/currency.service'

@Injectable()
export class DataService {
  constructor(
    private readonly _leagueService: LeagueService,
    private readonly _servicesListService: ServiceCategoryService,
    private readonly _currencyService: CurrencyService
  ) {}

  async createData(): Promise<Data> {
    const league = await this._leagueService.find()
    const serviceCategory =
      await this._servicesListService.findAllServiceCategory()
    const serviceCategoryNames =
      await this._servicesListService.takeServiceNames()
    const currency = await this._currencyService.find()

    const data = new Data()
    data.league = league
    data.currency = currency
    data.serviceCategory = serviceCategory
    data.serviceCategoryNames = serviceCategoryNames

    return data
  }
}
