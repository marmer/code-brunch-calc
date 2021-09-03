import { getLegalHolidaysFromLocalStorage } from '@/adapter/persistence/LegalHolidayLocalStorageRepository'

export const getLegalHolidaysDates: (year: number) => Promise<Date[]> = getLegalHolidaysFromLocalStorage
