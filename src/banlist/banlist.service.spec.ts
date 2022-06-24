import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UsersService } from '../users/user.service'
import { Banlist } from './banlist.entity'
import { BanlistService } from './banlist.service'

describe('BanlistService', () => {
  let banlistService: BanlistService
  const result = 'test'
  const addResult = {
    banlistAddDto: {
      accountName: 'test',
      reasonBan: 'test'
    },
    whoBannedUserUuid: 'test'
  }
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BanlistService,
        {
          provide: getRepositoryToken(Banlist),
          useValue: {
            findOne: jest.fn(() => Promise.resolve(result)),
            find: jest.fn(() => Promise.resolve(result)),
            delete: jest.fn(() => Promise.resolve(result)),
            save: jest.fn(() => Promise.resolve(addResult))
          }
        },
        {
          provide: UsersService,
          useValue: {
            findUserForBanlist: jest.fn(() =>
              Promise.resolve({ accountName: 'test' })
            )
          }
        }
      ] // Add
    }).compile()

    banlistService = moduleRef.get<BanlistService>(BanlistService)
  })

  it('should be defined', () => {
    expect(banlistService).toBeDefined()
  })

  describe('findOne', () => {
    it('must be return result', async () => {
      expect(await banlistService.findOne('test')).toEqual(result)
    })
  })
  describe('findAll', () => {
    it('must be return result', async () => {
      expect(await banlistService.findAll()).toEqual(result)
    })
  })
  describe('add', () => {
    it('must be return result', async () => {
      expect(await banlistService.add(addResult.banlistAddDto, 'test')).toEqual(
        addResult
      )
    })
  })
  describe('delete', () => {
    it('must be return result', async () => {
      expect(await banlistService.delete(result)).toEqual(result)
    })
  })
})
