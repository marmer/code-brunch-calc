import { CompanyEvent, toOnlyEventsFrom } from '@/entities/CodeBrunchCalc'

export function getEvents (range: { start: Date, end: Date }): CompanyEvent[] {
  return toOnlyEventsFrom(range.start, range.end)
  // TODO: marmer 27.08.2021 Pass Exclusions (Holidays, Vacancy)
}
