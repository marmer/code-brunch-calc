type HolidayDTO = { title: string, date: string }
type HolidaysDTO = [HolidayDTO]

function isHolidaysDTO (body: any): body is HolidaysDTO {
  if (!Array.isArray(body)) {
    return false
  }
  for (const holiday of body) {
    if (!('title' in holiday) ||
      typeof holiday.title !== 'string' ||
      !('date' in holiday) ||
      typeof holiday.date !== 'string') {
      return false
    }
  }
  return true
}

export async function fetchHolidays (year: number): Promise<HolidaysDTO> {
  const response = await fetch(`https://ipty.de/feiertag/api.php?do=getFeiertage&jahr=${year}&loc=BE&outformat=Y-m-d`, {
    method: 'GET'
  })
  if (response.status !== 200) {
    throw new Error(`Error fetching holidays from API. Bad status code: ${response.status}`)
  }
  const body = await response.json()
  if (!isHolidaysDTO(body)) {
    throw new Error('Error fetching holidays from API. Response has a bad structure')
  }
  return body
}
