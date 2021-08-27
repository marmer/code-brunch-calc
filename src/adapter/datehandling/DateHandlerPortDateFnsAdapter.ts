import { Day, Weekday } from '@/entities/CodeBrunchCalc'
import {
  getAllDatesInRangePort,
  toSmartDayPort
} from '@/use-cases/ports/datehandling/DateHandlerPort'

export const toSmartDayPortAdapter: toSmartDayPort = day => { // TODO: marmer 27.08.2021 implement!
  return {
    ...day,
    isLastWeekdayInMonth: false,
    weekday: Weekday.SATURDAY
  }
}

export const getAllDatesInRangePortAdapter: getAllDatesInRangePort = (start: Day, end: Day) => { // TODO: marmer 27.08.2021 Implement
  return [{
    day: 42,
    month: 42,
    year: 42
  }]
}
