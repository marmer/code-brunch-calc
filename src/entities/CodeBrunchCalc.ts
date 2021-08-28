export enum Weekday {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

export type EventType = 'InnovationFriday' | 'CodeBrunch'

export interface Event {
  type: EventType
  date: Date
}

function isLastWeekdayInMonth (date: Date) {
  return date.getMonth() !== new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7).getMonth()
}

export function toOnlyEventsFrom (days: Date[]): Event[] {
  return days.filter(it => it.getDay() === Weekday.FRIDAY)
    .map(it => ({
      type: isLastWeekdayInMonth(it) ? 'InnovationFriday' : 'CodeBrunch',
      date: new Date(it.valueOf())
    }))
}
