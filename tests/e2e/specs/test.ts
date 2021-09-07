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

  it('Should show all (and only) special dates within only the selected range', () => {
    cy.visit('/events?startDate=2021-01-01&endDate=2021-12-31')
    cy.findByLabelText('Start Date')
      .click()
    cy.findByTitle('Next month')
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
    cy.findAllByText(1).first().click()
    cy.findByLabelText('End Date')
      .click()
    cy.findByTitle('Previous month')
      .click()
      .click()
      .click()
      .click()
    cy.findAllByText('30').last()
      .click()

    cy.findByText('30.07.2021')
      .should('not.exist')
    cy.findByText('06.08.2021')
      .parent()
      .within(() => {
        cy.findByText('Code Brunch')
          .should('exist')
      })
    cy.findByText('13.08.2021')
      .parent()
      .within(() => {
        cy.findByText('Code Brunch')
          .should('exist')
      })
    cy.findByText('20.08.2021')
      .parent()
      .within(() => {
        cy.findByText('Code Brunch')
          .should('exist')
      })
    cy.findByText('27.08.2021')
      .parent()
      .within(() => {
        cy.findByText('Innovation Friday')
          .should('exist')
      })
    cy.findByText('03.09.2021')
      .should('not.exist')
  })

  it.only('Should be possible to to filter Code Brunch only', () => {
    cy.visit('/events?startDate=2021-01-01&endDate=2021-12-31')

    cy.findAllByText('Code Brunch').should('exist')
    cy.findAllByText('Innovation Friday').should('exist')
    cy.findByLabelText('Show Code Brunch only').should('not.be.checked').click()

    cy.findAllByText('Code Brunch').should('exist')
    cy.findAllByText('Innovation Friday').should('not.exist')
    cy.findByLabelText('Show Code Brunch only').should('be.checked').click()

    cy.findAllByText('Code Brunch').should('exist')
    cy.findAllByText('Innovation Friday').should('exist')
  })

  it('should be possible to navigate the dates by URL', () => {
    cy.visit('/events?startDate=2021-01-08&endDate=2021-01-08')
    cy.findByText('08.01.2021')
      .parent()
      .within(() => {
        cy.findByText('Code Brunch')
          .should('exist')
      })
    cy.findByText('15.01.2021').should('not.exist')

    cy.visit('/events?startDate=2021-01-15&endDate=2021-01-15')
    cy.findByText('15.01.2021')
      .parent()
      .within(() => {
        cy.findByText('Code Brunch')
          .should('exist')
      })
    cy.findByText('08.01.2021').should('not.exist')
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

    cy.findByText('17.09.2021').should('exist')
    cy.wait('@holidayCall')
    cy.findByText('17.09.2021').should('not.exist')

    cy.findByText('10.09.2021')
      .parent()
      .within(() => {
        cy.findByText('Code Brunch')
          .should('exist')
      })
    cy.findByText('24.09.2021')
      .parent()
      .within(() => {
        cy.findByText('Innovation Friday')
          .should('exist')
      })
  })

  // TODO: marmer 01.09.2021 Topics
  // TODO: marmer 07.09.2021 Filter Code Brunch
  // TODO: marmer 02.09.2021 Code coverage for Unittests
  // TODO: marmer 02.09.2021 Code coverage for Cypresstests
})
