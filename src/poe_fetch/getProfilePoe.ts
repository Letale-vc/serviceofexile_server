import axios from 'axios'

interface ProfileApiPoe {
  uuid: string
  name: string
}

export const getProfilePoe = async (
  access_token: string
): Promise<ProfileApiPoe> => {
  const profilePoe = await axios.get<ProfileApiPoe>(
    'https://www.pathofexile.com/api/profile',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': `OAuth servicesofexile/1.0.0 (contact: letalerv@gmail.com) StrictMode`
      }
    }
  )
  return profilePoe.data
}
