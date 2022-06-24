import { Test } from '@nestjs/testing'
import { ServiceCategoryController } from './serviceCategory.controller'
import { ServiceCategoryService } from './serviceCategory.service'

describe('ServiceCategoryController', () => {
  let serviceCategoryController: ServiceCategoryController
  const result = 'test'

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [ServiceCategoryController], // Add
      providers: [
        {
          provide: ServiceCategoryService,
          useValue: { add: jest.fn(() => Promise.resolve(result)) }
        }
      ] // Add
    }).compile()

    serviceCategoryController = moduleRef.get<ServiceCategoryController>(
      ServiceCategoryController
    )
  })

  it('should be defined', () => {
    expect(serviceCategoryController).toBeDefined()
  })

  describe('addServiceCategory', () => {
    it('should be expect result', async () => {
      expect(
        await serviceCategoryController.addServiceCategory({ name: 'test' })
      ).toEqual(result)
    })
  })
})
