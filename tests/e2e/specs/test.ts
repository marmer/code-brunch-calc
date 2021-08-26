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
})
