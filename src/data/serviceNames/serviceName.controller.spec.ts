/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { Test } from '@nestjs/testing'
import { ServiceNameController } from './serviceName.controller'
import { ServiceNameService } from './serviceName.service'

describe('ServiceNameController', () => {
  let serviceNameController: ServiceNameController

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [ServiceNameController], // Add
      providers: [{ provide: ServiceNameService, useValue: {} }] // Add
    }).compile()

    serviceNameController = moduleRef.get<ServiceNameController>(
      ServiceNameController
    )
  })

  it('should be defined', () => {
    expect(serviceNameController).toBeDefined()
  })
})
