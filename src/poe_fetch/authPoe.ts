import axios from 'axios'
import { stringify } from 'query-string'

interface AuthPoe {
  access_token: string
}
const POE_CLIENT_ID = 'serviceofexile'
const POE_REDIRECT_URI = 'https://serviceofexile.com/callback/poe'

export const authPoe = async (code: string): Promise<AuthPoe> => {
  const data = stringify({
    client_id: POE_CLIENT_ID,
    client_secret: 'yRuZw9zEFjNw',
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: POE_REDIRECT_URI,
    scope: 'account:profile account:characters'
  })

  const authToken = await axios.post<AuthPoe>(
    `https://www.pathofexile.com/oauth/token`,
    data,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': `OAuth servicesofexile/1.0.0 (contact: letalerv@gmail.com) StrictMode`
      }
    }
  )
  return authToken.data
}
