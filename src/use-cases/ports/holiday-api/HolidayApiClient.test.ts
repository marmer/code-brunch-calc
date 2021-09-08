import * as underTest from './HolidayApiClient'

describe('HolidayApiClient', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    jest.resetAllMocks()
  })

  it('should serve the fetched content', async () => {
    // Preparation
    fetchMock.mockIf('https://ipty.de/feiertag/api.php?do=getFeiertage&jahr=2019&loc=BE&outformat=Y-m-d',
      async () => ({
        status: 200,
        body: '[{ "title": "Fancy Day", "date": "2019-03-04" }]'
      }))

    // Execution
    const result = await underTest.fetchHolidays(2019)

    // Assertion
    expect(result).toStrictEqual([{
      title: 'Fancy Day',
      date: '2019-03-04'
    }])
  })
  it('should serve an appropriate error if the response status is unexpected', async () => {
    // Preparation
    fetchMock.mockIf('https://ipty.de/feiertag/api.php?do=getFeiertage&jahr=2019&loc=BE&outformat=Y-m-d',
      async () => ({
        body: '[{ "title": "Fancy Day", "date": "2019-03-04" }]',
        status: 403
      }))

    // Execution
    const result = underTest.fetchHolidays(2019)

    // Assertion
    await expect(result).rejects.toStrictEqual(new Error('Error fetching holidays from API. Bad status code: 403'))
  })

  it.each([
    '{ "title": "Fancy Day", "date": "2019-03-04" }',
    '[{ "bla": "blub" }]',
    '[{ "title": "Fancy Day", "date": 42}]',
    '[{ "title": 42, "date": "2019-03-04" }]'
  ])('Should throw an appropriate error if the response has a bad structure: %s', async (body: string) => {
    // Preparation
    fetchMock.mockIf('https://ipty.de/feiertag/api.php?do=getFeiertage&jahr=2019&loc=BE&outformat=Y-m-d',
      async () => ({
        body,
        status: 200
      }))

    // Execution
    const result = underTest.fetchHolidays(2019)

    // Assertion
    await expect(result).rejects.toStrictEqual(new Error('Error fetching holidays from API. Response has a bad structure'))
  })
})
