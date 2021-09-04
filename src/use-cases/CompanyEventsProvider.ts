import { CompanyEvent, toOnlyEventsFrom } from '@/use-cases/domain/CodeBrunchCalc'
import * as HolidayRepository from '@/use-cases/ports/persistence/HolidayRepositoryFacade'
import * as HolidayApi from '@/use-cases/ports/holiday-api/HolidayApiFacade'

export interface Holiday {
  name: string,
  date: Date
}

export interface HolidayYear {
  year: number,
  lastUpdated: Date,
  holidays: Holiday[]
}

export async function updateLegalHolidays (startYear: number, endYearInclusive: number = startYear): Promise<void> {
  const results = await Promise.allSettled(getRangeFrom(startYear, endYearInclusive)
    .map(async year => {
      try {
        await HolidayRepository.save(await HolidayApi.getLegalHolidays(year))
      } catch (e) {
        throw new Error(`Something went wrong while updating the legal holidays for year ${year}`)
      }
    })
  )
  const errors = results.map(it => it.status === 'rejected' ? it.reason : null)
    .filter(it => it)
  if (errors.length > 0) throw errors
}

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
  return getRangeFrom(
    startDate.getFullYear(),
    endDate.getFullYear())
}

async function getExclusionsFor (range: DateRange): Promise<Date[]> {
  const allYears = await Promise.allSettled(getYearsOf(range)
    .map(year => HolidayRepository.getLegalHolidaysDates(year)))

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
