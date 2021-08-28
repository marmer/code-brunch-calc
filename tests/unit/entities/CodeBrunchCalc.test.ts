import { toOnlyEventsFrom } from '@/entities/CodeBrunchCalc'

describe('@/entities/CodeBrunchCalc', () => {
  it('should serve all event kinds for the given dates', async () => {
    const monday = new Date(2021, 7, 16)
    const tuesday = new Date(2021, 7, 17)
    const wednesday = new Date(2021, 7, 18)
    const thursday = new Date(2021, 7, 19)
    const friday = new Date(2021, 7, 20)
    const saturday = new Date(2021, 7, 21)
    const sunday = new Date(2021, 7, 22)

    const lastFriday = new Date(2021, 7, 27)
    const lastsSaturday = new Date(2021, 7, 28)
    expect(toOnlyEventsFrom([monday, tuesday, wednesday, thursday, friday, saturday, sunday, lastFriday, lastsSaturday]))
      .toStrictEqual([{
        type: 'CodeBrunch',
        date: friday
      }, {
        type: 'InnovationFriday',
        date: lastFriday
      }])
  })
})
