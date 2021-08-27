import { Day, SmartDay } from '@/entities/CodeBrunchCalc'

export type getAllDatesInRangePort = (start: Day, end: Day) => Day[]
export type toSmartDayPort = (day: Day) => SmartDay
