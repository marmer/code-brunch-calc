import { CompanyEvent, toOnlyEventsFrom } from '@/use-cases/domain/CodeBrunchCalc'

export type DateRange = { startDate: Date, endDate: Date }

export function getEvents (range: DateRange): CompanyEvent[] {
  return toOnlyEventsFrom(range.startDate, range.endDate)
}
