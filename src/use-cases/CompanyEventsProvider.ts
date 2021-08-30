import { CompanyEvent, toOnlyEventsFrom } from '@/entities/CodeBrunchCalc'

export type DateRange = { startDate: Date, endDate: Date }

export function getEvents (range: DateRange): CompanyEvent[] {
  return toOnlyEventsFrom(range.startDate, range.endDate)
  // TODO: marmer 27.08.2021 Pass Exclusions (Holidays, Vacancy)
}