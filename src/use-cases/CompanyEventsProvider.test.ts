import { DateRange, getEvents } from '@/use-cases/CompanyEventsProvider'
import { CompanyEvent } from '@/use-cases/domain/CodeBrunchCalc'
import * as HolidayRepositoryFacade from '@/use-cases/ports/persistence/HolidayRepositoryFacade'

jest.mock('@/use-cases/ports/persistence/HolidayRepositoryFacade')

describe('CompanyEventsProvider', () => {
  describe('getEvents', () => {
    it('should serve events without the excluded ones', async () => {
      // Preparation
      const holiday2019 = new Date(2019, 11, 27)
      const holiday2020 = new Date(2020, 0, 3)

      const range: DateRange = {
        startDate: new Date(2019, 11, 20),
        endDate: new Date(2020, 0, 10)
      }
      const event1: CompanyEvent = {
        type: 'CodeBrunch',
        date: range.startDate
      }
      const event2: CompanyEvent = {
        type: 'CodeBrunch',
        date: range.endDate
      }

      const getLegalHolidaysDatesMocked = jest.spyOn(HolidayRepositoryFacade, 'getLegalHolidaysDates').mockImplementation((year: number) => {
        switch (year) {
          case 2019:
            return Promise.resolve([holiday2019])
          case 2020:
            return Promise.resolve([holiday2020])
          default:
            fail(`Unexpected year ${year}`)
            return Promise.resolve([])
        }
      })

      // Execution
      const result = await getEvents(range)

      // Assertion
      expect(JSON.stringify(result)).toStrictEqual(JSON.stringify([event1, event2]))
    })

    it('should serve no events on twisted order', async () => {
      // Preparation
      const range: DateRange = {
        startDate: new Date(2020, 0, 10),
        endDate: new Date(2019, 11, 20)
      }

      jest.spyOn(HolidayRepositoryFacade, 'getLegalHolidaysDates').mockResolvedValue([])

      // Execution
      const result = await getEvents(range)

      // Assertion
      expect([]).toStrictEqual([])
    })
  })
})

// TODO: marmer 03.09.2021 Handle "Heiligabend" and Sylvester exclusion
