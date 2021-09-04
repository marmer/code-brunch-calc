import { parseISO } from 'date-fns'
import { HolidayYear } from '@/use-cases/CompanyEventsProvider'

export async function saveLegalHolidaysToStorage (holidays: HolidayYear): Promise<void> {
  throw new Error('Unsupported operation')
}

interface HolidayDBO {
  name: string,
  date: string
}

interface HolidaysDBO {
  lastUpdated: string,
  holidays: HolidayDBO[]
}

export async function getLegalHolidaysFromLocalStorage (year: number): Promise<Date[]> {
  const storedHolidays = localStorage.getItem(`holidays-${year}`)
  if (storedHolidays) {
    const holidaysDBO: HolidaysDBO = JSON.parse(storedHolidays)
    return holidaysDBO.holidays
      .map((it: HolidayDBO) => it.date)
      .map((it: string) => parseISO(it))
  } else {
    return []
  }
}
