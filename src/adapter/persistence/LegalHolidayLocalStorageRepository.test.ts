import { getLegalHolidaysFromLocalStorage } from '@/adapter/persistence/LegalHolidayLocalStorageRepository'
import { formatISO } from 'date-fns'

describe('LegalHolidayLocalStorageRepository', () => {
  it('should serve stored holidays', async () => {
    localStorage.setItem('holidays-2021', `{
  "lastUpdated": "2021-03-04",
  "holidays": [{
    "name": "Neujahr",
    "date": "${formatISO(new Date(2021, 1, 1))}"
  },{
    "name": "Heilige Drei Könige",
    "date": "${formatISO(new Date(2021, 1, 6))}"
  }]
  }`)

    expect(await getLegalHolidaysFromLocalStorage(2021)).toStrictEqual([new Date(2021, 1, 1), new Date(2021, 1, 6)])
  })
})
