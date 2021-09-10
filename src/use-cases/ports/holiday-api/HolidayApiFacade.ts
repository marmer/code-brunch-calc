import { HolidayYear } from '@/use-cases/CompanyEventsProvider'
import { fetchHolidays } from '@/adapter/holiday-api/HolidayApiClient'
import { parseISO } from 'date-fns'

export async function getLegalHolidays (year: number): Promise<HolidayYear> {
  const holidaysDTO = await fetchHolidays(year)
  const now = new Date()

  const holidays = holidaysDTO.map(it => ({
    name: it.title,
    date: parseISO(it.date)
  }))
  holidays.push({
    name: 'Heiligabend',
    date: new Date(year, 11, 24)
  })
  holidays.push({
    name: 'Sylvester',
    date: new Date(year, 11, 31)
  })
  holidays.sort((a, b) => a.date.valueOf() - b.date.valueOf())
  return {
    year,
    lastUpdated: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    holidays: holidays
  }
}
