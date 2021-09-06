import { formatISO, parseISO } from 'date-fns'
import { HolidayYear } from '@/use-cases/CompanyEventsProvider'

interface HolidayDBO {
  name: string,
  date: string
}

interface HolidaysDBO {
  lastUpdated: string,
  holidays: HolidayDBO[]
}

export async function saveLegalHolidaysToStorage (holidays: HolidayYear): Promise<void> {
  localStorage.setItem(`holidays-${holidays.year}`, JSON.stringify({
    lastUpdated: formatISO(holidays.lastUpdated, { representation: 'date' }),
    holidays: holidays.holidays.map(it => ({
      name: it.name,
      date: formatISO(it.date, { representation: 'date' })
    } as HolidayDBO))
  }))
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
