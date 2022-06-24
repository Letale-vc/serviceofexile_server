import { Test } from '@nestjs/testing'
import { CurrencyController } from './currency.controller'
import { CurrencyService } from './currency.service'

describe('CurrencyController', () => {
  let currencyController: CurrencyController
  const currency = {
    name: 'name',
    url: 'url'
  }
  const addResult = { ...currency, id: 1 }
  const deleteResult = { raw: 'test' }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CurrencyService,
          useValue: {
            add: jest.fn(async () => Promise.resolve(addResult)),
            find: jest.fn(),
            delete: jest.fn(async () => Promise.resolve(deleteResult))
          }
        }
      ],
      controllers: [CurrencyController]
    }).compile()

    currencyController = moduleRef.get<CurrencyController>(CurrencyController)
  })

  describe('addCurrency', () => {
    it('should return to be result', async () => {
      expect(await currencyController.addCurrency(currency)).toEqual(addResult)
    })
  })

  describe('deleteCurrency', () => {
    it('should return to be result', async () => {
      expect(
        await currencyController.deleteCurrency({ currencyId: 1 })
      ).toEqual(deleteResult)
    })
  })
})
