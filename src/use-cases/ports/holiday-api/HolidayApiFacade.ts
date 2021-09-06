import { HolidayYear } from '@/use-cases/CompanyEventsProvider'
import { fetchHolidays } from '@/use-cases/ports/holiday-api/HolidayApiClient'
import { parseISO } from 'date-fns'

export async function getLegalHolidays (year: number): Promise<HolidayYear> {
  // TODO: marmer 04.09.2021 Handle  Heiligabend and Sylvester if real api is getting called

  // TODO: marmer 06.09.2021 client logic to lower layer
  const holidaysDTO = await fetchHolidays(year)

  return {
    year,
    lastUpdated: new Date(),
    holidays: holidaysDTO.map(it => ({
      name: it.title,
      date: parseISO(it.date)
    }))
  }
}
