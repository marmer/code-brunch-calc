import {
  getAllDatesInRangePortAdapter,
  toSmartDayPortAdapter
} from '@/adapter/datehandling/DateHandlerPortDateFnsAdapter'
import {
  getAllDatesInRangePort,
  toSmartDayPort
} from '@/use-cases/ports/datehandling/DateHandlerPort'

export const getAllDatesInRange: getAllDatesInRangePort = getAllDatesInRangePortAdapter
export const toSmartDay: toSmartDayPort = toSmartDayPortAdapter
