import { Test } from '@nestjs/testing'
import { UserRoles } from '../role/role.enum'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

describe('AuthController', () => {
  let authController: AuthController
  const result = ['test']
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [AuthController], // Add
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(() => Promise.resolve(result))
          }
        }
      ] // Add
    }).compile()

    authController = moduleRef.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(authController).toBeDefined()
  })

  describe('login', () => {
    it('should be expect result', async () => {
      expect(
        await authController.login({
          roles: [UserRoles.Admin],
          uuid: 'string',

          accountName: 'string',

          poeToken: 'string'
        })
      ).toEqual(result)
    })
  })
})
