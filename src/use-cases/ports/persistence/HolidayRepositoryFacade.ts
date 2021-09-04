import {
  getLegalHolidaysFromLocalStorage,
  saveLegalHolidaysToStorage
} from '@/adapter/persistence/LegalHolidayLocalStorageRepository'
import { HolidayYear } from '@/use-cases/CompanyEventsProvider'

export const getLegalHolidaysDates: (year: number) => Promise<Date[]> = getLegalHolidaysFromLocalStorage
export const save: (holidays: HolidayYear) => Promise<void> = saveLegalHolidaysToStorage
