// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Some Navication', () => {
    cy.visit('/')
    cy.findByText('About')
      .click()
    cy.findByText('Code Brunch Calculator')
      .should('exist')
    cy.findByText('Home')
      .click()
  })

  it('should be a not existing tests', async () => {
    cy.findByLabelText('Start Date')
      .click()
    cy.findByText(13).click()
    cy.findByLabelText('End Date')
      .click()
    cy.findByText(14)
      .click()
  })
})
