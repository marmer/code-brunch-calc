import { SmartDay, toOnlyEventsFrom, Weekday } from '@/entities/CodeBrunchCalc'

describe('@/entities/CodeBrunchCalc', () => {
  const baseDay: SmartDay = {
    day: 1,
    month: 2,
    year: 3,
    weekday: Weekday.SATURDAY,
    isLastWeekdayInMonth: true
  }

  it('should mark a friday as codebrunch if it is not the last one', async () => {
    expect(toOnlyEventsFrom([{
      ...baseDay,
      weekday: Weekday.FRIDAY,
      isLastWeekdayInMonth
    }]))
  })

  // TODO: marmer 27.08.2021 No not fridays
})
