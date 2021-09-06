import * as underTest from '@/use-cases/ports/holiday-api/HolidayApiFacade'
import { HolidayYear } from '@/use-cases/CompanyEventsProvider'

describe('HolidayApiFacade', () => {
  it('should serve the api holidays including Heiligabend and Sylvester', async () => {
    // Preparation
    fetchMock.mockIf('https://ipty.de/feiertag/api.php?do=getFeiertage&jahr=2021&loc=BE&outformat=Y-m-d', async _ => ({
      // language=JSON
      body: `[
          {
            "title": "Neujahr",
            "date": "2021-01-01",
            "locs": [
              "BE"
            ],
            "dayName": "Friday",
            "tagName": "Freitag"
          },
          {
            "title": "Cthulhu Day",
            "date": "2021-12-26",
            "locs": [
              "BE",
              "BB",
              "HB"
            ],
            "dayName": "Sunday",
            "tagName": "Sonntag"
          }
        ]`,
      status: 200
    }
    ))

    // Execution
    const result = await underTest.getLegalHolidays(2021)
    const now = new Date()

    // Assertion
    expect(result).toStrictEqual<HolidayYear>({
      year: 2021,
      lastUpdated: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      holidays: [{
        name: 'Neujahr',
        date: new Date(2021, 0, 1)
      }, {
        name: 'Heiligabend',
        date: new Date(2021, 11, 24)
      }, {
        name: 'Cthulhu Day',
        date: new Date(2021, 11, 26)
      }, {
        name: 'Sylvester',
        date: new Date(2021, 11, 31)
      }]
    })
  })
})
