/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { BanlistService } from '../banlist/banlist.service'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/user.service'
import { AdminController } from './admin.controller'

describe('AdminController', () => {
  let adminController: AdminController
  let usersService: UsersService
  let banlistService: BanlistService

  const unbannedResult = { raw: ['test'] }
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: BanlistService,
          useValue: {
            add: jest.fn(),
            delete: jest.fn(() => Promise.resolve(unbannedResult))
          }
        },
        {
          provide: UsersService,
          useValue: {
            userRoleChange: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(User),
          useValue: {}
        }
      ],
      controllers: [AdminController]
    }).compile()

    banlistService = module.get<BanlistService>(BanlistService)
    usersService = module.get<UsersService>(UsersService)
    adminController = module.get<AdminController>(AdminController)
  })

  describe('BannedUser', () => {
    it('should be to have been called 1 time function banlistService.add', async () => {
      await adminController.BannedUser(
        {
          roles: [],
          uuid: 'string',
          accountName: 'string',
          poeToken: 'string'
        },
        {
          accountName: 'test',
          reasonBan: 'test'
        }
      )

      expect(banlistService.add).toHaveBeenCalledTimes(1)
    })
  })

  describe('unbanned', () => {
    it('should be to return DeleteResult', async () => {
      expect(
        await adminController.UnbannedUser({ accountName: 'test' })
      ).toEqual(unbannedResult)
    })
  })

  describe('changeUserRoles', () => {
    it('should be to have been called 1 time function userRoleChange', async () => {
      await adminController.changeUserRoles({ uuid: 'test', roles: [1] })

      expect(usersService.userRoleChange).toHaveBeenCalledTimes(1)
    })
  })
})
