import { Day, Event, toOnlyEventsFrom } from '@/entities/CodeBrunchCalc'

export function getEvents (range: { start: Day, end: Day }): Event[] {
  return toOnlyEventsFrom(getAllDatesInRange(range.start, range.end)
    .map(toSmartDay)) // TODO: marmer 27.08.2021 Pass Exclusions (Holidays)
}
