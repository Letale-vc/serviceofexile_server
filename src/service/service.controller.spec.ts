import { Test } from '@nestjs/testing'
import { create } from 'domain'
import { UpdateResult } from 'typeorm'
import { ServiceCreateDto } from './dto/service-create.dto'
import { ServiceController } from './service.controller'
import { Service } from './service.entity'
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
    it('should be return result,  service.update: tobecalledwith upateobject+user.uuid, toBeCalledTimes 1 time ', async () => {
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
      expect(service.update).toBeCalledWith(updateObj, user.uuid)
      expect(service.update).toBeCalledTimes(1)
    })
  })

  describe('createService', () => {
    it('should be called function service.create, and must pass arguments createObj and user.uuid', async () => {
      const createObj = {
        bulk: 1,
        leagueId: 1,
        currencyId: 1,
        price: 2,
        sellOrBuy: 'WTB',
        serviceNameId: 1
      }

      jest.spyOn(service, 'create').mockResolvedValue()
      await serviceController.createService(user, createObj)
      expect(service.create).toBeCalledTimes(1)
      expect(service.create).toBeCalledWith(createObj, user.uuid)
    })
  })

  describe('', () => {
    it('should be return result, and service.find called times 1', async () => {
      const searchParams = {
        serviceNameId: 1,
        leagueId: 1,
        sellOrBuy: 'wtb'
      }

      const res = await serviceController.getServices(searchParams)
    })
  })
})
