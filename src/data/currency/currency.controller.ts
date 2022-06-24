import { Body, Controller, Delete, Post } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { DeleteResult } from 'typeorm'
import { Currency } from './currency.entity'
import { CurrencyService } from './currency.service'
import { CurrencyAddDto } from './dto/currency-add.dto'
import { CurrencyDeleteDto } from './dto/currency-delete.dto'

@ApiBearerAuth()
@Controller('api/data/currency/')
export class CurrencyController {
  constructor(private readonly _currencyService: CurrencyService) {}

  @Post()
  async addCurrency(@Body() currencyAddDto: CurrencyAddDto): Promise<Currency> {
    return this._currencyService.add(currencyAddDto)
  }

  @Delete()
  async deleteCurrency(
    @Body() { currencyId }: CurrencyDeleteDto
  ): Promise<DeleteResult> {
    return this._currencyService.delete(currencyId)
  }
}
