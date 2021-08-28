import { CompanyEvent, toOnlyEventsFrom } from '@/entities/CodeBrunchCalc'

describe('@/entities/CodeBrunchCalc', () => {
  it('should serve all kinds of events for the given dates', async () => {
    const monday = new Date(2021, 7, 16)
    const lastsSaturday = new Date(2021, 7, 28)
    expect(toOnlyEventsFrom(monday, lastsSaturday))
      .toStrictEqual<CompanyEvent[]>([{
        type: 'CodeBrunch',
        date: new Date(2021, 7, 20)
      }, {
        type: 'InnovationFriday',
        date: new Date(2021, 7, 27)
      }])
  })

  it('should be able to handle a single day', async () => {
    const lastFriday = new Date(2021, 7, 27)
    expect(toOnlyEventsFrom(lastFriday, lastFriday))
      .toStrictEqual<CompanyEvent[]>([{
        type: 'InnovationFriday',
        date: new Date(2021, 7, 27)
      }])
  })
})
