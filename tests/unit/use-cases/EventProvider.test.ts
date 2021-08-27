import { getEvents } from '@/use-cases/EventProvider'
import { Day, Event } from '@/entities/CodeBrunchCalc'

// TODO: marmer 27.08.2021 Holiday exclusions

describe('EventProvider', () => {
  it('should serve all necessary events within range', async () => {
    const start: Day = {
      day: 1,
      month: 8,
      year: 2021
    }
    const end: Day = {
      day: 31,
      month: 8,
      year: 2021
    }
    expect(getEvents({
      start,
      end
    })).toStrictEqual([{
      date: {
        day: 6,
        month: 8,
        year: 2021
      },
      type: 'CodeBrunch'
    }, {
      date: {
        day: 13,
        month: 8,
        year: 2021
      },
      type: 'CodeBrunch'
    }, {
      date: {
        day: 20,
        month: 8,
        year: 2021
      },
      type: 'CodeBrunch'
    }, {
      date: {
        day: 27,
        month: 8,
        year: 2021
      },
      type: 'InnovationFriday'
    }] as Event[])
  })
})
