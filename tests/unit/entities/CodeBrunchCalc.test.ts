import { SmartDay, toOnlyEventsFrom, Weekday } from '@/entities/CodeBrunchCalc'

describe('@/entities/CodeBrunchCalc', () => {
  const baseDay: SmartDay = {
    day: 1,
    month: 2,
    year: 3,
    weekday: Weekday.SATURDAY,
    isLastWeekdayInMonth: true
  }

  it('should serve all event kinds for the given dates', async () => {
    const monday = {
      ...baseDay,
      day: 1,
      weekday: Weekday.MONDAY,
      isLastWeekdayInMonth: false
    }
    const tuesday = {
      ...baseDay,
      day: 2,
      weekday: Weekday.TUESDAY,
      isLastWeekdayInMonth: false
    }
    const wednesday = {
      ...baseDay,
      day: 3,
      weekday: Weekday.WEDNESDAY,
      isLastWeekdayInMonth: false
    }
    const thursday = {
      ...baseDay,
      day: 4,
      weekday: Weekday.THURSDAY,
      isLastWeekdayInMonth: false
    }
    const friday = {
      ...baseDay,
      day: 5,
      weekday: Weekday.FRIDAY,
      isLastWeekdayInMonth: false
    }
    const saturday = {
      ...baseDay,
      day: 6,
      weekday: Weekday.SATURDAY,
      isLastWeekdayInMonth: false
    }
    const sunday = {
      ...baseDay,
      day: 7,
      weekday: Weekday.SUNDAY,
      isLastWeekdayInMonth: false
    }

    const lastFriday = {
      ...baseDay,
      day: 8,
      weekday: Weekday.FRIDAY,
      isLastWeekdayInMonth: true
    }
    const lastsSaturday = {
      ...baseDay,
      day: 9,
      weekday: Weekday.SATURDAY,
      isLastWeekdayInMonth: true
    }
    expect(toOnlyEventsFrom([monday, tuesday, wednesday, thursday, friday, saturday, sunday, lastFriday, lastsSaturday]))
      .toStrictEqual([{
        type: 'CodeBrunch',
        date: { ...friday }
      }, {
        type: 'InnovationFriday',
        date: { ...lastFriday }
      }])
  })
})
