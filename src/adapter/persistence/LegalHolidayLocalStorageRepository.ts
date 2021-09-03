import { parseISO } from 'date-fns'

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
    return JSON.parse(storedHolidays).holidays
      .map((it: HolidayDBO) => it.date)
      .map((it: string) => parseISO(it))
  } else {
    return []
  }
}
