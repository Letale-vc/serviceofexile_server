import { Test } from '@nestjs/testing'
import { UsersController } from './user.controller'
import { UsersService } from './user.service'

describe('UserController', () => {
  let userController: UsersController

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [UsersController], // Add
      providers: [{ provide: UsersService, useValue: {} }] // Add
    }).compile()

    userController = moduleRef.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(userController).toBeDefined()
  })
})
