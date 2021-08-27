import { Day } from '@/entities/CodeBrunchCalc'
import { getAllDatesInRange } from '@/use-cases/ports/datehandling/DateHandlerPort'

export const getAllDates: getAllDatesInRange = (start: Day, end: Day) => {
  return [{
    day: 42,
    month: 42,
    year: 42
  }]
}
