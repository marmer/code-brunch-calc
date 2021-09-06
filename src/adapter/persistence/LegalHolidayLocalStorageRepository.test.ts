import * as underTest from '@/adapter/persistence/LegalHolidayLocalStorageRepository'

describe('LegalHolidayLocalStorageRepository', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  describe('getLegalHolidaysFromLocalStorage', () => {
    it('should serve stored holidays', async () => {
      localStorage.setItem('holidays-2021', `{
  "lastUpdated": "2021-03-04",
  "holidays": [{
    "name": "Neujahr",
    "date": "2021-01-01"
  },{
    "name": "Heilige Drei Könige",
    "date": "2021-01-06"
  }]
  }`)

      expect(await underTest.getLegalHolidaysFromLocalStorage(2021)).toStrictEqual([new Date(2021, 0, 1), new Date(2021, 0, 6)])
    })

    it('serve an empty list if no holidays have been stored yet', async () => {
      expect(await underTest.getLegalHolidaysFromLocalStorage(2021)).toStrictEqual([])
    })
  })

  describe('saveLegalHolidaysToStorage', () => {
    it('should save the given holidays within the local storage', async () => {
      // Execution
      await underTest.saveLegalHolidaysToStorage({
        year: 2002,
        lastUpdated: new Date(2003, 1, 3),
        holidays: [
          {
            date: new Date(2001, 4, 7),
            name: 'Opposite day'
          },
          {
            date: new Date(2000, 6, 5),
            name: 'Opposite Opposite day'
          }
        ]
      })

      // Assertions
      expect(JSON.parse(localStorage.getItem('holidays-2002') as string)).toStrictEqual(JSON.parse(`{
  "lastUpdated": "2003-02-03",
  "holidays": [{
    "name": "Opposite day",
    "date": "2001-05-07"
  },{
    "name": "Opposite Opposite day",
    "date": "2000-07-05"
  }]
}`))
    })
  })
})
