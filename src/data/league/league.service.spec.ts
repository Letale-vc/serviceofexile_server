import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { LeagueController } from './league.controller'
import { League } from './league.entity'
import { LeagueService } from './league.service'

describe('LeagueService', () => {
  let leagueService: LeagueService

  const league = {
    name: 'name'
  }
  const leagueModelTest = { name: 'name', id: 1 }
  const findResult = [leagueModelTest]
  const deleteResult = { raw: 'test' }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeagueService,
        {
          provide: getRepositoryToken(League),
          useValue: {
            save: jest
              .fn()
              .mockImplementation(async () => Promise.resolve(leagueModelTest)),
            find: jest
              .fn()
              .mockImplementation(async () => Promise.resolve(findResult)),
            createQueryBuilder: jest.fn().mockReturnValue({
              delete: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              execute: jest.fn().mockImplementation(() => deleteResult)
            })
          }
        }
      ],
      exports: [LeagueService],
      controllers: [LeagueController]
    }).compile()

    leagueService = module.get<LeagueService>(LeagueService)
  })

  describe('add', () => {
    it('should return to LeagueModelTest', async () => {
      const leagueNew = await leagueService.add(league.name)
      expect(leagueNew).toEqual(leagueModelTest)
    })
  })
  describe('find', () => {
    it('should return to findResult', async () => {
      const leagueFind = await leagueService.find()
      expect(leagueFind).toEqual(findResult)
    })
  })
  describe('delete', () => {
    it('should return to  deleteResult', async () => {
      expect(await leagueService.delete({ name: 'test', id: 1 })).toEqual(
        deleteResult
      )
    })
  })
})
