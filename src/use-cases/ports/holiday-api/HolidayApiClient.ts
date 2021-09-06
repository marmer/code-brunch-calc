export async function fetchHolidays (year: number): Promise<[{ title: string, date: string }]> {
  const response = await fetch(`https://ipty.de/feiertag/api.php?do=getFeiertage&jahr=${year}&loc=BE&outformat=Y-m-d`, {
    method: 'GET'
  })
  if (response.status !== 200) {
    throw new Error(`Error fetching holidays from API. Bad status code: ${response.status}`)
  }
  return await response.json()
}
