import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { Currency } from './currency.entity'
import { CurrencyAddDto } from './dto/currency-add.dto'

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private readonly _currencyRepository: Repository<Currency>
  ) {}

  async add(currencyAddDto: CurrencyAddDto): Promise<Currency> {
    const newCurrency = new Currency()
    newCurrency.name = currencyAddDto.name
    newCurrency.url = currencyAddDto.url
    return this._currencyRepository.save(newCurrency)
  }

  async find(): Promise<Currency[]> {
    return this._currencyRepository.find()
  }

  async delete(currencyId: number): Promise<DeleteResult> {
    return this._currencyRepository.delete({ id: currencyId })
  }
}
