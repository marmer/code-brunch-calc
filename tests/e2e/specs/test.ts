// https://docs.cypress.io/api/introduction/api.html

describe('App Tests', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('Navigation should work between about and home', () => {
    cy.visit('/')
    cy.findByText('About')
      .click()
    cy.findByText('Code Brunch Calculator')
      .should('exist')
    cy.findByText('Home')
      .click()
    cy.findByLabelText('Start Date')
      .should('exist')
  })

  it('Should show all special dates within the selected range', () => {
    cy.visit('/')
    cy.findByLabelText('Start Date')
      .click()
    cy.findAllByText(1).first().click()
    cy.findByLabelText('End Date')
      .click()
    cy.findByText(31).last()
      .click()

    cy.findByText('2021-08-06')
      .parent()
      .within(() => {
        cy.findByText('Code Brunch')
          .should('exist')
      })
    cy.findByText('2021-08-13')
      .parent()
      .within(() => {
        cy.findByText('Code Brunch')
          .should('exist')
      })
    cy.findByText('2021-08-20')
      .parent()
      .within(() => {
        cy.findByText('Code Brunch')
          .should('exist')
      })
    cy.findByText('2021-08-27')
      .parent()
      .within(() => {
        cy.findByText('Innovation Friday')
          .should('exist')
      })
  })

  it('should be possible to navigate the dates by URL', () => {
    cy.visit('/events?startDate=2021-01-08&endDate=2021-01-08')
    cy.findByText('2021-01-08')
      .parent()
      .within(() => {
        cy.findByText('Code Brunch')
          .should('exist')
      })
    cy.findByText('2021-01-15').should('not.exist')

    cy.visit('/events?startDate=2021-01-15&endDate=2021-01-15')
    cy.findByText('2021-01-15')
      .parent()
      .within(() => {
        cy.findByText('Code Brunch')
          .should('exist')
      })
    cy.findByText('2021-01-08').should('not.exist')
  })

  it('should date changes should be reflected to the url', () => {
    cy.visit('/')
    cy.findByLabelText('Start Date')
      .click()
    cy.findByText(13)
      .click()
    cy.findByLabelText('End Date')
      .click()
    cy.findByText(14)
      .click()

    const currentYear = new Date().getFullYear()

    cy.location().should((loc) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      expect(loc.search).to.eq(`?startDate=${currentYear}-01-13&endDate=${currentYear}-12-14`)
    })
  })

  it('should exclude legal holidays', () => {
    cy.intercept('GET', 'https://ipty.de/feiertag/api.php?do=getFeiertage&jahr=2021&loc=BE&outformat=Y-m-d', {
      statusCode: 200,
      body: [{
        title: 'Internationaler Frauentag',
        date: '2021-09-17',
        locs: [
          'BE'
        ],
        dayName: 'Monday',
        tagName: 'Montag'
      }]
    }).as('holidayCall')

    cy.visit('/events?startDate=2021-09-10&endDate=2021-09-24')

    cy.findByText('2021-09-17').should('exist')
    cy.wait('@holidayCall')
    cy.findByText('2021-09-17').should('not.exist')

    cy.findByText('2021-09-10')
      .parent()
      .within(() => {
        cy.findByText('Code Brunch')
          .should('exist')
      })
    cy.findByText('2021-09-24')
      .parent()
      .within(() => {
        cy.findByText('Innovation Friday')
          .should('exist')
      })
  })

  // TODO: marmer 02.09.2021 Show Status while loading feiertage somehow without ad blocking ui
  // TODO: marmer 02.09.2021 Handle broken connections to feiertage-api
  // TODO: marmer 02.09.2021 Handle slow connections to feiertage-api
  // TODO: marmer 01.09.2021 holiday exclusions
  // TODO: marmer 02.09.2021 store allready fetched holyday exclusions
  // TODO: marmer 01.09.2021 Topics
  // TODO: marmer 01.09.2021 Ability to format the dates to the german style
  // TODO: marmer 02.09.2021 Code coverage for Unittests
  // TODO: marmer 02.09.2021 Code coverage for Cypresstests
})
