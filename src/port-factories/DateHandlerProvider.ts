import { getAllDates as getAllDatesAdapter } from '@/adapter/datehandling/DateHandlerPortDateFnsAdapter'
import { getAllDatesInRange as getAllDatesInRangePort } from '@/use-cases/ports/datehandling/DateHandlerPort'

export const getAllDatesInRange: getAllDatesInRangePort = getAllDatesAdapter
