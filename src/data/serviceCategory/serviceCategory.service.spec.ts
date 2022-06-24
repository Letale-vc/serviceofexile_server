/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ServiceCategory } from './serviceCategory.entity'
import { ServiceCategoryService } from './serviceCategory.service'

describe('ServiceCategoryService', () => {
  let serviceCategoryService: ServiceCategoryService
  const defResult = { any: 'test' }
  const names = [{ name: 'test' }, { name: 'test' }, { name: 'test' }]

  const namesArrayResult = names.reduce<string[]>((prev, current) => {
    return [...prev, current.name]
  }, [])

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [], // Add
      providers: [
        ServiceCategoryService,
        {
          provide: getRepositoryToken(ServiceCategory),
          useValue: {
            save: jest.fn(() => Promise.resolve(defResult)),
            findOne: jest.fn(() => Promise.resolve(defResult)),
            delete: jest.fn(() => Promise.resolve(defResult)),
            find: jest.fn(() => Promise.resolve(defResult)),
            createQueryBuilder: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnThis(),
              cache: jest.fn().mockReturnThis(),
              getMany: jest.fn().mockImplementation(() => names)
            })
          }
        }
      ] // Add
    }).compile()

    serviceCategoryService = moduleRef.get<ServiceCategoryService>(
      ServiceCategoryService
    )
  })

  it('should be defined', () => {
    expect(serviceCategoryService).toBeDefined()
  })

  describe('findOne', () => {
    it('should be expect defResult', async () => {
      expect(await serviceCategoryService.findOne(1)).toEqual(defResult)
    })
  })
  describe('takeServiceNames', () => {
    it(' should be expect namesArrayResult', async () => {
      expect(await serviceCategoryService.takeServiceNames()).toEqual(
        namesArrayResult
      )
    })
  })
  describe('findAllServiceCategory', () => {
    it('should be expect defResult', async () => {
      expect(await serviceCategoryService.findAllServiceCategory()).toEqual(
        defResult
      )
    })
  })
  describe('add', () => {
    it('should be expect defResult', async () => {
      expect(await serviceCategoryService.add('test')).toEqual(defResult)
    })
  })
  describe('delete', () => {
    it('should be  expect defResult', async () => {
      expect(await serviceCategoryService.delete(1)).toEqual(defResult)
    })
  })
})
