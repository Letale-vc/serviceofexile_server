import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CurrencyController } from './currency.controller'
import { Currency } from './currency.entity'
import { CurrencyService } from './currency.service'

describe('CurrencyService', () => {
  let currencyService: CurrencyService

  const currency = {
    name: 'name',
    url: 'url'
  }
  const currencyModelTest = { name: 'name', url: 'url', id: 1 }
  const findResult = [currencyModelTest]
  const deleteResult = { raw: 'test' }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService,
        {
          provide: getRepositoryToken(Currency),
          useValue: {
            save: jest
              .fn()
              .mockImplementation(async () =>
                Promise.resolve(currencyModelTest)
              ),
            find: jest
              .fn()
              .mockImplementation(async () => Promise.resolve(findResult)),
            delete: jest
              .fn()
              .mockImplementation(async () => Promise.resolve(deleteResult))
          }
        }
      ],
      exports: [CurrencyService],
      controllers: [CurrencyController]
    }).compile()

    currencyService = module.get<CurrencyService>(CurrencyService)
  })

  describe('add', () => {
    it('should return to CurrencyModelTest', async () => {
      const currencyNew = await currencyService.add(currency)
      expect(currencyNew).toEqual(currencyModelTest)
    })
  })
  describe('find', () => {
    it('should return to findResult', async () => {
      const currencyFind = await currencyService.find()
      expect(currencyFind).toEqual(findResult)
    })
  })
  describe('delete', () => {
    it('should return to  deleteResult', async () => {
      expect(await currencyService.delete(1)).toEqual(deleteResult)
    })
  })
})
