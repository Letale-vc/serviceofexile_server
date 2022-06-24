import type { DefaultRequestBody, MockedRequest, RestHandler } from 'msw'
import { rest } from 'msw'

const poeHandlers: Array<RestHandler<MockedRequest<DefaultRequestBody>>> = [
  rest.post(
    'https://www.pathofexile.com/oauth/token',
    async (req, res, ctx) => {
      return res(
        ctx.json({
          access_token: 'MOKED_POE_ACCESS_TOKEN'
        })
      )
    }
  ),
  rest.get(
    'https://www.pathofexile.com/api/character',
    async (req, res, ctx) => {
      return res(
        ctx.json({
          characters: [{ current: true, name: 'MOCKED_POE_CHARACKET' }]
        })
      )
    }
  ),
  rest.get('https://www.pathofexile.com/api/profile', async (req, res, ctx) => {
    return res(
      ctx.json({
        uuid: '90d4249f-5bb4-4afb-a3a3-025d5d66bf1d',
        name: 'Lotale',
        realm: 'pc',
        locale: 'en_US',
        twitch: { name: 'letale' }
      })
    )
  })
]

export default poeHandlers
