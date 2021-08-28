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

function dayAfter (from: Date) {
  const dayAfter = new Date(from.valueOf())
  dayAfter.setDate(from.getDate() + 1)
  return dayAfter
}

// TODO: marmer 28.08.2021 no need to serve all. Pass some predicate
function getAllDays (from: Date, to: Date): Date[] {
  const endReached = from.valueOf() - to.valueOf() > 0
  if (endReached) {
    return []
  } else {
    const result: Date[] = [from]
    return result.concat(getAllDays(dayAfter(from), to))
  }
}

export function toOnlyEventsFrom (from: Date, to: Date): Event[] {
  return getAllDays(from, to).filter(it => it.getDay() === Weekday.FRIDAY)
    .map(it => ({
      type: isLastWeekdayInMonth(it) ? 'InnovationFriday' : 'CodeBrunch',
      date: new Date(it.valueOf())
    }))
}
