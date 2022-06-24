/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { setupServer } from 'msw/node'
import poeHandlers from '../../mocks/pathofexile'
import { UserRoles } from '../role/role.enum'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/user.service'
import { AuthService } from './auth.service'
import { jwtConstants } from './constants'

const server = setupServer(...poeHandlers)
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn'
  })
})
afterAll(() => {
  server.close()
})

describe('AuthService', () => {
  let authService: AuthService
  let usersService: UsersService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' }
        })
      ], // Add
      providers: [
        UsersService,
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {}
        }
      ] // Add
    }).compile()

    authService = moduleRef.get<AuthService>(AuthService)

    usersService = moduleRef.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  describe('validatelogin', () => {
    it('should return JWT object when credentials are valid', () => {
      const user = {
        accountName: 'user.accountName',
        uuid: 'user.uuid',
        poeToken: 'user.poeToken',
        roles: [UserRoles.Admin]
      }
      expect(authService.login(user)).toBeDefined()
    })
  })

  describe('validateUser', () => {
    it('should return a user object when credentials are valid, if not have db user create new user', async () => {
      const createUser = {
        accountName: 'name',
        uuid: 'uuid'
      }

      jest
        .spyOn(usersService, 'findUserForAuth')
        .mockReturnValue(createUser as unknown as Promise<User>)

      const valid = await authService.validateUser('test')

      expect(valid).toEqual({
        ...createUser,
        poeToken: 'MOKED_POE_ACCESS_TOKEN'
      })
    })
    it('should return a user object, if him have in db and when credentials are valid', async () => {
      // findLastCharMock.mockReturnValue('test')

      jest.spyOn(usersService, 'findUserForAuth').mockReturnValue(undefined)

      const createUser = {
        accountName: 'name',
        uuid: 'uuid'
      }
      jest
        .spyOn(usersService, 'createUser')
        .mockReturnValue(createUser as unknown as Promise<User>)

      const valid = await authService.validateUser('test')

      expect(valid).toEqual({
        ...createUser,
        poeToken: 'MOKED_POE_ACCESS_TOKEN'
      })
    })
  })
})
