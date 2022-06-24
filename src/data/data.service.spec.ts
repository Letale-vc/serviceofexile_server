import { Test } from '@nestjs/testing'
import { CurrencyService } from './currency/currency.service'
import { DataService } from './data.service'
import { LeagueService } from './league/league.service'
import { ServiceCategoryService } from './serviceCategory/serviceCategory.service'

describe('DataService', () => {
  let dataService: DataService
  const resultOne = ['test']

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [], // Add
      providers: [
        DataService,
        {
          provide: LeagueService,
          useValue: {
            find: jest.fn().mockResolvedValue(resultOne)
          }
        },
        {
          provide: ServiceCategoryService,
          useValue: {
            findAllServiceCategory: jest.fn().mockResolvedValue(resultOne),
            takeServiceNames: jest.fn().mockResolvedValue(resultOne)
          }
        },
        {
          provide: CurrencyService,
          useValue: { find: jest.fn().mockResolvedValue(resultOne) }
        }
      ] // Add
    }).compile()

    dataService = moduleRef.get<DataService>(DataService)
  })

  it('should be defined', () => {
    expect(dataService).toBeDefined()
  })

  describe('createData', () => {
    it('should be return object result', async () => {
      const result = {
        league: resultOne,
        serviceCategory: resultOne,
        serviceCategoryNames: resultOne,
        currency: resultOne
      }

      expect(await dataService.createData()).toEqual(result)
    })
  })
})
