import { CompanyEvent, toOnlyEventsFrom } from '@/use-cases/domain/CodeBrunchCalc'
import { getLegalHolidays } from '@/use-cases/ports/persistence/HolidayRepositoryFacade'

export type DateRange = { startDate: Date, endDate: Date }

export async function getEvents (range: DateRange): Promise<CompanyEvent[]> {
  // TODO: marmer 03.09.2021 for all years in range and not only 2021
  return toOnlyEventsFrom(range.startDate, range.endDate, await getLegalHolidays(2021))
}
