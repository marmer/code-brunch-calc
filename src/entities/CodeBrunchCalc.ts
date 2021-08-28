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

export interface CompanyEvent {
  type: EventType
  date: Date
}

const isLastWeekdayInMonth = (date: Date) =>
  date.getMonth() !== new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7).getMonth()

const dayAfter = (from: Date) => {
  const nextDay = new Date(from.valueOf())
  nextDay.setDate(from.getDate() + 1)
  return nextDay
}

type Predicate<T> = (value: T) => boolean;

function getAllDaysBetween (from: Date, to: Date, predicate: Predicate<Date>): Date[] {
  const endReached = from.valueOf() - to.valueOf() > 0
  if (endReached) {
    return []
  } else {
    return predicate(from)
      ? [from].concat(getAllDaysBetween(dayAfter(from), to, predicate))
      : getAllDaysBetween(dayAfter(from), to, predicate)
  }
}

const isFriday = (it: Date) =>
  it.getDay() === Weekday.FRIDAY

const getAllFridaysBetween = (from: Date, to: Date) =>
  getAllDaysBetween(from, to, isFriday)

const toCompanyEvent = (it: Date): CompanyEvent => ({
  type: isLastWeekdayInMonth(it) ? 'InnovationFriday' : 'CodeBrunch',
  date: new Date(it.valueOf())
})

export function toOnlyEventsFrom (from: Date, to: Date): CompanyEvent[] {
  return getAllFridaysBetween(new Date(from.getFullYear(), from.getMonth(), from.getDate()), new Date(to.getFullYear(), to.getMonth(), to.getDate()))
    .map(toCompanyEvent)
}
