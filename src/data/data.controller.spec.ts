/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { Test } from '@nestjs/testing'
import { CurrencyService } from './currency/currency.service'
import { DataController } from './data.controller'
import { DataService } from './data.service'
import { LeagueService } from './league/league.service'
import { ServiceCategoryService } from './serviceCategory/serviceCategory.service'

describe('DataController', () => {
  let dataController: DataController
  const resultGetData = 'test'
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [DataController], // Add
      providers: [
        {
          provide: DataService,
          useValue: {
            createData: jest.fn().mockResolvedValueOnce(resultGetData)
          }
        },
        { provide: CurrencyService, useValue: {} },
        { provide: LeagueService, useValue: {} },
        { provide: ServiceCategoryService, useValue: {} }
      ] // Add
    }).compile()

    dataController = moduleRef.get<DataController>(DataController)
  })

  it('should be defined', () => {
    expect(dataController).toBeDefined()
  })
  describe('getData', () => {
    it('should be return resultGetData', async () => {
      expect(await dataController.getData()).toEqual(resultGetData)
    })
  })
})
