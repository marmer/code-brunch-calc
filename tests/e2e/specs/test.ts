// https://docs.cypress.io/api/introduction/api.html

describe('App Tests', () => {
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

  // TODO: marmer 01.09.2021 some kind of cobra as icon
  // TODO: marmer 01.09.2021 holiday exclusions
  // TODO: marmer 02.09.2021 store allready fetched holyday exclusions
  // TODO: marmer 01.09.2021 Topics
  // TODO: marmer 01.09.2021 Ability to format the dates to the german style
})
