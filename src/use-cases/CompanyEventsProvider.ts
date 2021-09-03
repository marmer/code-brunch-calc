import { CompanyEvent, toOnlyEventsFrom } from '@/use-cases/domain/CodeBrunchCalc'
import { getLegalHolidaysDates } from '@/use-cases/ports/persistence/HolidayRepositoryFacade'

export type DateRange = { startDate: Date, endDate: Date }

function getRangeFrom (fromInclusive: number, toInclusive: number) {
  return Array(toInclusive - fromInclusive + 1)
    .fill(fromInclusive)
    .map((sd, i) => sd + i)
}

function getYearsOf ({
  startDate,
  endDate
}: DateRange): number[] {
  const fromInclusive = startDate.getFullYear()
  const toInclusive = endDate.getFullYear()
  return getRangeFrom(
    fromInclusive < toInclusive ? fromInclusive : toInclusive,
    fromInclusive < toInclusive ? toInclusive : fromInclusive)
}

async function getExclusionsFor (range: DateRange): Promise<Date[]> {
  const allYears = await Promise.allSettled(getYearsOf(range)
    .map(year => getLegalHolidaysDates(year)))

  return allYears.map((it: PromiseFulfilledResult<Date[]> | PromiseRejectedResult) => {
    if (it.status === 'fulfilled') {
      return it.value
    } else {
      throw it.reason
    }
  }).flat()
}

export async function getEvents (range: DateRange): Promise<CompanyEvent[]> {
  return toOnlyEventsFrom(range.startDate, range.endDate, await getExclusionsFor(range))
}
