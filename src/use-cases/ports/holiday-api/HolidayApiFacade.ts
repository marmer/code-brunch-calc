import { HolidayYear } from '@/use-cases/CompanyEventsProvider'

export async function getLegalHolidays (year: number): Promise<HolidayYear> {
  // TODO: marmer 03.09.2021 Add "Heiligabend" and Sylvester if the api does not serve it
  throw new Error('Unsupported operation')
}
