export enum Weekday {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export interface Day {
  day: number,
  month: number,
  year: number,
}

export interface SmartDay extends Day {
  weekday: Weekday,
  isLastWeekdayInMonth: boolean
}

export type EventType = 'InnovationFriday' | 'CodeBrunch'

export interface Event {
  type: EventType
  date: Day
}

export function toOnlyEventsFrom (smartDays: SmartDay[]): Event[] {
  return [] // TODO: marmer 27.08.2021 implement
}
