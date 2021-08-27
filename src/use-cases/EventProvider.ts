import { Day, Event, toOnlyEventsFrom } from '@/entities/CodeBrunchCalc'
import { getAllDatesInRange, toSmartDay } from '@/port-factories/DateHandlerProvider'

export function getEvents (range: { start: Day, end: Day }): Event[] {
  return toOnlyEventsFrom(getAllDatesInRange(range.start, range.end)
    .map(toSmartDay)) // TODO: marmer 27.08.2021 Pass Exclusions (Holidays)
}
