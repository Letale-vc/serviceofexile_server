import { Test } from '@nestjs/testing'
import { LeagueController } from './league.controller'
import { LeagueService } from './league.service'

describe('LeagueController', () => {
  let leagueController: LeagueController
  let leagueService: LeagueService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: LeagueService,
          useValue: {
            add: jest.fn(),
            find: jest.fn(),
            delete: jest.fn()
          }
        }
      ],
      controllers: [LeagueController]
    }).compile()

    leagueService = moduleRef.get<LeagueService>(LeagueService)
    leagueController = moduleRef.get<LeagueController>(LeagueController)
  })

  it('should be defined', () => {
    expect(leagueController).toBeDefined()
  })

  describe('addLeague', () => {
    it('should return to be result', async () => {
      const league = {
        name: 'name'
      }
      const result = { ...league, id: 1 }
      jest
        .spyOn(leagueService, 'add')
        .mockImplementation(() => Promise.resolve(result))

      expect(await leagueController.addLeague(league)).toEqual(result)
    })
  })

  describe('deleteLeague', () => {
    it('should return to be result', async () => {
      const result = { raw: 'test' }
      jest
        .spyOn(leagueService, 'delete')
        .mockImplementation(() => Promise.resolve(result))

      expect(
        await leagueController.deleteLeague({ id: 1, name: 'test' })
      ).toEqual(result)
    })
  })
})
