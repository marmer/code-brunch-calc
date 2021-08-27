import { Day, Event } from '@/entities/CodeBrunchCalc'
import { getAllDatesInRange } from '@/port-factories/DateHandlerProvider'

export function getEvents (range: { start: Day, end: Day }): Event[] {
  console.log(getAllDatesInRange(range.start, range.end))
  return []
}
