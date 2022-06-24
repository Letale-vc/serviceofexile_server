import { authPoe } from './authPoe'
import { findLastChar } from './findLastCharPoe'
import { getProfilePoe } from './getProfilePoe'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const server = setupServer()
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn'
  })
})
afterAll(() => {
  server.close()
})

describe('Test poe fetch', () => {
  // const mock = new MockAdapter(axios)

  describe('authPoe', () => {
    it('must be return respResult', async () => {
      const respResult = {
        access_token: 'MOKED_POE_ACCESS_TOKEN'
      }
      server.use(
        rest.post(
          'https://www.pathofexile.com/oauth/token',
          (req, res, ctx) => {
            return res(ctx.json(respResult))
          }
        )
      )
      const authPoeReturn = await authPoe('test')
      expect(authPoeReturn).toEqual(respResult)
    })
  })

  describe('getProfilePoe', () => {
    it('must be return respResult', async () => {
      const respResult = {
        uuid: '90d4249f-5bb4-4afb-a3a3-025d5d66bf1d',
        name: 'Lotale',
        realm: 'pc',
        locale: 'en_US',
        twitch: { name: 'letale' }
      }

      server.use(
        rest.get(
          'https://www.pathofexile.com/api/profile',
          async (req, res, ctx) => {
            return res(ctx.json(respResult))
          }
        )
      )

      const getProfilePoeReturn = await getProfilePoe('test')
      expect(getProfilePoeReturn).toEqual(respResult)
    })
  })

  describe('findLastChar', () => {
    it('must be return name1', async () => {
      const respResult = {
        characters: [
          { name: 'name1' },
          { name: 'name3', current: true },
          { name: 'name4' },
          { name: 'name5' }
        ]
      }

      server.use(
        rest.get(
          'https://www.pathofexile.com/api/character',
          (req, res, ctx) => {
            return res(ctx.json(respResult))
          }
        )
      )
      const findLastCharReturn = await findLastChar('test')

      expect(findLastCharReturn).toBe(respResult.characters[1].name)
    })
  })
})
