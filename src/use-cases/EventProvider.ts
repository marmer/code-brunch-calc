import { CompanyEvent, toOnlyEventsFrom } from '@/entities/CodeBrunchCalc'

// TODO: marmer 28.08.2021 Extend the interface of business logic for a range instead of a single date. Range calculation should be simple enough
export function getEvents (range: { start: Date, end: Date }): CompanyEvent[] {
  return toOnlyEventsFrom(getAllDatesInRange(range.start, range.end)) // TODO: marmer 27.08.2021 Pass Exclusions (Holidays)
}
