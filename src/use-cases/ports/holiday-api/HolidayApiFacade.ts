import { HolidayYear } from '@/use-cases/CompanyEventsProvider'

export async function getLegalHolidays (year: number): Promise<HolidayYear> {
  // FIXME: marmer 04.09.2021 This is only valid for 2021 Call a real api or calculate the real dates
  // TODO: marmer 04.09.2021 Handle  Heiligabend and Sylvester if real api is getting called
  return {
    year,
    lastUpdated: new Date(),
    holidays: [
      {
        name: 'Neujahrstag',
        date: new Date(year, 0, 1)
      }, {
        name: 'Karfreitag',
        date: new Date(year, 2, 25)
      }, {
        name: 'Ostermontag',
        date: new Date(year, 2, 28)
      }, {
        name: 'Tag der Arbeit',
        date: new Date(year, 4, 1)
      }, {
        name: 'Christi Himmelfahrt',
        date: new Date(year, 4, 5)
      }, {
        name: 'Pfingstmontag',
        date: new Date(year, 4, 16)
      }, {
        name: 'Tag der Deutschen Einheit',
        date: new Date(year, 9, 3)
      }, {
        name: 'Heiligabend',
        date: new Date(year, 11, 24)
      }, {
        name: '1. Weihnachtstag',
        date: new Date(year, 11, 25)
      }, {
        name: '2. Weihnachtstag',
        date: new Date(year, 11, 26)
      }, {
        name: 'Sylvester',
        date: new Date(year, 11, 31)
      }

    ]
  }
}
