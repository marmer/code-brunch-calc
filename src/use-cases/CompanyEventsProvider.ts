import { CompanyEvent, toOnlyEventsFrom } from '@/entities/CodeBrunchCalc'

export function getEvents (range: { startDate: Date, endDate: Date }): CompanyEvent[] {
  return toOnlyEventsFrom(range.startDate, range.endDate)
  // TODO: marmer 27.08.2021 Pass Exclusions (Holidays, Vacancy)
}
