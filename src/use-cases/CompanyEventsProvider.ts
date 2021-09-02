import { CompanyEvent, toOnlyEventsFrom } from '@/use-cases/domain/CodeBrunchCalc'

export type DateRange = { startDate: Date, endDate: Date }

export async function getEvents (range: DateRange): Promise<CompanyEvent[]> {
  return toOnlyEventsFrom(range.startDate, range.endDate)
}
