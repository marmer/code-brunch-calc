import { toOnlyEventsFrom } from '@/entities/CodeBrunchCalc'

describe('@/entities/CodeBrunchCalc', () => {
  it('should serve all kinds of events for the given dates', async () => {
    const monday = new Date(2021, 7, 16)
    const lastsSaturday = new Date(2021, 7, 28)
    expect(toOnlyEventsFrom(monday, lastsSaturday)
    .toStrictEqual([{
      type: 'CodeBrunch',
      date: new Date(2021, 7, 20)
    }, {
      type: 'InnovationFriday',
      date: new Date(2021, 7, 27)
    }])
  })

})
