import { Test } from '@nestjs/testing'
import { UpdateResult } from 'typeorm'
import { ServiceController } from './service.controller'
import { ServiceService } from './service.service'

describe('ServiceController', () => {
  let serviceController: ServiceController
  let service: ServiceService
  const user = {
    accountName: 'name',
    uuid: 'uuid',
    roles: 'admin',
    poeToken: 'poeToken'
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [ServiceController], // Add
      providers: [
        {
          provide: ServiceService,

          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
          }
        }
      ] // Add
    }).compile()

    serviceController = moduleRef.get<ServiceController>(ServiceController)
    service = moduleRef.get<ServiceService>(ServiceService)
  })

  it('should be defined', () => {
    expect(serviceController).toBeDefined()
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('updateService', () => {
    it('should be return result', async () => {
      const resultUpdate = { test: 'test' }
      const updateObj = {
        uuid: '321',
        leagueId: 1,
        serviceNameId: 1,
        sellOrBuy: 'WTS',
        currencyId: 1,
        price: 1,
        bulk: 1,
        active: true
      }
      jest
        .spyOn(service, 'update')
        .mockResolvedValue(resultUpdate as unknown as Promise<UpdateResult>)

      const res = await serviceController.updateService(user, updateObj)
      expect(res).toEqual(resultUpdate)
    })
  })
})
