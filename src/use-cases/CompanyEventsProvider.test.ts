import * as underTest from '@/use-cases/CompanyEventsProvider'
import { DateRange, getEvents, HolidayYear } from '@/use-cases/CompanyEventsProvider'
import { CompanyEvent } from '@/use-cases/domain/CodeBrunchCalc'
import * as HolidayRepositoryFacade from '@/use-cases/ports/persistence/HolidayRepositoryFacade'
import * as HolidayApiFacade from '@/use-cases/ports/holiday-api/HolidayApiFacade'

jest.mock('@/use-cases/ports/persistence/HolidayRepositoryFacade')
jest.mock('@/use-cases/ports/holiday-api/HolidayApiFacade')

describe('CompanyEventsProvider', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
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
      const result = await underTest.getEvents(range)

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
      const result = await underTest.getEvents(range)

      // Assertion
      expect(result).toStrictEqual([])
    })
  })

  describe('updateLegalHolidays', () => {
    it('should update all legal holidays', async () => {
      // preparation
      const holidayYear: HolidayYear = {
        year: 2021,
        lastUpdated: new Date(),
        holidays: [{ date: new Date(2002, 6, 4), name: 'birthday' }]
      }

      jest.spyOn(HolidayApiFacade, 'getLegalHolidays').mockImplementation((year: number) => {
        if (year === 2021) {
          return Promise.resolve(holidayYear)
        } else {
          fail(`Unexpected year: ${year}`)
          throw new Error(`Unexpected year: ${year}`)
        }
      })

      const saveMock = jest.spyOn(HolidayRepositoryFacade, 'save')
      const loadMock = jest.spyOn(HolidayRepositoryFacade, 'getLegalHolidaysDates').mockResolvedValue([])

      // Execution
      await underTest.updateLegalHolidays(2021)

      // Assertions
      expect(saveMock).toBeCalledWith(holidayYear)
    })

    // TODO: marmer 06.09.2021 don't forget to update the dates if the range changes within the UI

    it('should not update all legal holidays if they are allready known', async () => {
      // preparation
      const holidayYear: HolidayYear = {
        year: 2021,
        lastUpdated: new Date(),
        holidays: [{
          date: new Date(2002, 6, 4),
          name: 'birthday'
        }]
      }

      const loadByApiMock = jest.spyOn(HolidayApiFacade, 'getLegalHolidays').mockImplementation((year: number) => {
        if (year === 2021) {
          return Promise.resolve(holidayYear)
        } else {
          fail(`Unexpected year: ${year}`)
          throw new Error(`Unexpected year: ${year}`)
        }
      })

      const saveMock = jest.spyOn(HolidayRepositoryFacade, 'save')
      const loadMock = jest.spyOn(HolidayRepositoryFacade, 'getLegalHolidaysDates').mockImplementation(async (year) => {
        if (year === 2021) {
          return [new Date()]
        }
        fail('Unexpected year: ' + year)
        throw new Error('Unexpected year: ' + year)
      })

      // Execution
      await underTest.updateLegalHolidays(2021)

      // Assertions
      expect(saveMock).not.toBeCalled()
      expect(loadByApiMock).not.toBeCalled()
    })

    it('should update all legal holidays for all years if not known yet', async () => {
      // preparation
      const holidays2021: HolidayYear = {
        year: 2021,
        lastUpdated: new Date(),
        holidays: [{
          date: new Date(2021, 6, 4),
          name: 'birthday'
        }]
      }
      const holidays2022: HolidayYear = {
        year: 2022,
        lastUpdated: new Date(),
        holidays: [{
          date: new Date(2022, 6, 4),
          name: 'birthday'
        }]
      }
      const holidays2023: HolidayYear = {
        year: 2023,
        lastUpdated: new Date(),
        holidays: [{
          date: new Date(2023, 6, 4),
          name: 'birthday'
        }]
      }

      jest.spyOn(HolidayApiFacade, 'getLegalHolidays').mockImplementation((year: number) => {
        if (year === 2021) {
          return Promise.resolve(holidays2021)
        } else if (year === 2022) {
          return Promise.resolve(holidays2022)
        } else if (year === 2023) {
          return Promise.resolve(holidays2023)
        } else {
          fail(`Unexpected year: ${year}`)
          throw new Error(`Unexpected year: ${year}`)
        }
      })
      const loadMock = jest.spyOn(HolidayRepositoryFacade, 'getLegalHolidaysDates').mockResolvedValue([])

      const saveMock = jest.spyOn(HolidayRepositoryFacade, 'save')

      // Execution
      await underTest.updateLegalHolidays(2021, 2023)

      // Assertions
      expect(saveMock).toBeCalledWith(holidays2021)
      expect(saveMock).toBeCalledWith(holidays2022)
      expect(saveMock).toBeCalledWith(holidays2023)
    })

    it('should save all successful api fetches on api errors', async () => {
      const holidays2021: HolidayYear = {
        year: 2021,
        lastUpdated: new Date(),
        holidays: [{ date: new Date(2021, 6, 4), name: 'birthday' }]
      }
      const holidays2023: HolidayYear = {
        year: 2023,
        lastUpdated: new Date(),
        holidays: [{ date: new Date(2023, 6, 4), name: 'birthday' }]
      }

      jest.spyOn(HolidayApiFacade, 'getLegalHolidays').mockImplementation((year: number) => {
        if (year === 2021) {
          return Promise.resolve(holidays2021)
        } else if (year === 2022) {
          throw new Error('Some Ugly error')
        } else if (year === 2023) {
          return Promise.resolve(holidays2023)
        } else {
          fail(`Unexpected year: ${year}`)
          throw new Error(`Unexpected year: ${year}`)
        }
      })

      const saveMock = jest.spyOn(HolidayRepositoryFacade, 'save')
      const loadMock = jest.spyOn(HolidayRepositoryFacade, 'getLegalHolidaysDates').mockResolvedValue([])

      // Execution
      try {
        await underTest.updateLegalHolidays(2021, 2023)
        fail('Expected a rejected promise with an appropriate error message')
      } catch (e: any) {
        expect(e).toStrictEqual([new Error('Something went wrong while updating the legal holidays for year 2022')])
      }

      // Assertions
      expect(saveMock).toBeCalledWith(holidays2021)
      expect(saveMock).toBeCalledWith(holidays2023)
    })
  })
})
