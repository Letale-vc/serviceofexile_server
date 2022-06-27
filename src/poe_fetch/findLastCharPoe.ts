import axios from 'axios'

export const findLastChar = async (
  poeToken: string
): Promise<string | null> => {
  const profileCharecters = await axios.get<{
    characters: { current?: boolean; name: string }[]
  }>('https://www.pathofexile.com/api/character', {
    headers: {
      Authorization: `Bearer ${poeToken}`
    }
  })

  const findChar = Promise.resolve(
    profileCharecters.data.characters.reduce<string>(
      (_previousValue, currentValue): string => {
        const char = Object.keys(currentValue)

        if (char.includes('current')) return currentValue.name
        return _previousValue
      },
      null
    )
  )

  return findChar
}
