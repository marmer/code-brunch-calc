import { getLegalHolidaysFromLocalStorage } from '@/adapter/persistence/LegalHolidayLocalStorageRepository'

export const getLegalHolidays: (year: number) => Promise<Date[]> = getLegalHolidaysFromLocalStorage
