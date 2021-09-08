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

async function holidaysKnownFor (year: number) {
  const holidayDates = await HolidayRepository.getLegalHolidaysDates(year)
  return holidayDates.length > 0
}

export async function updateLegalHolidays (startYear: number, endYearInclusive: number): Promise<void> {
  const results = await Promise.allSettled(getRangeFrom(startYear, endYearInclusive)
    .map(async year => {
      if (!(await holidaysKnownFor(year))) {
        try {
          await HolidayRepository.save(await HolidayApi.getLegalHolidays(year))
        } catch (e) {
          throw new Error(`Something went wrong while updating the legal holidays for year ${year}`)
        }
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
  return (await Promise.all(getYearsOf(range)
    .map(year => HolidayRepository.getLegalHolidaysDates(year)))).flat()
}

export async function getEvents (range: DateRange): Promise<CompanyEvent[]> {
  return toOnlyEventsFrom(range.startDate, range.endDate, await getExclusionsFor(range))
}
