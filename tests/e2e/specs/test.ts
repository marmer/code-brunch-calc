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
        cy.findByText('Code Brunch')
          .should('exist')
      })
  })
})
