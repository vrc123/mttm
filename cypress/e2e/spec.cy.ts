describe('Test of MTTM', () => {

  before(() => {
    cy.visit('http://localhost:3000/')
  })

  after(() => {
    cy.visit('http://localhost:3000/my-opponents')

    cy.get('.OpponentList_opponentList__xp7Ew').contains('.OpponentItem_opponentItem__8xMoL', 'Test Test Test').within(() => {
      cy.get('button').contains('Delete').click()
    })

    cy.get('button').contains('Yes').click()
  })

  it('Creates an analysis', () => {

    cy.get('h1').should('have.text', 'My table tennis matches')
    cy.get('button').contains('Create an analysis').click()

    cy.get('h1').should('have.text', 'Create an analysis')
    cy.get('input').eq(0).type('2000-10-10')
    cy.get('input').eq(0).should('have.value', '2000-10-10')
    cy.get('button').eq(0).click()

    cy.get('h1').should('have.text', 'Select your opponent')
    cy.get('a').contains('Click here').click()
    
    cy.get('h1').should('have.text', 'Add and select opponent')
    cy.get('input').eq(0).type('Test')
    cy.get('input').eq(0).should('have.value', 'Test')
    cy.get('input').eq(1).type('Test')
    cy.get('input').eq(1).should('have.value', 'Test')
    cy.get('input').eq(2).type('Test')
    cy.get('input').eq(2).should('have.value', 'Test')
    cy.get('input').eq(3).type('Test')
    cy.get('input').eq(3).should('have.value', 'Test')
    cy.get('input').eq(4).type('2000-10-10')
    cy.get('input').eq(4).should('have.value', '2000-10-10')
    cy.get('button').contains('Add opponent').click()
    
    cy.get('h1').should('have.text', 'Add the score of the match')
    cy.get('input').eq(0).type('4')
    cy.get('input').eq(0).should('have.value', '4')
    cy.get('input').eq(1).type('3')
    cy.get('input').eq(1).should('have.value', '3')
    cy.get('button').contains('Next').click()

    cy.get('h1').should('have.text', 'Add serves')
    cy.get('button').contains('Next').click()

    cy.get('h1').should('have.text', 'Add recieves')
    cy.get('button').contains('Next').click()

    cy.get('h1').should('have.text', 'Add match rallies')
    cy.get('button').contains('Create analysis').click()

    cy.get('h1').should('have.text', 'My analyses')
    cy.get('.AnalysisItem_analysisItem__UCTCo').last().should('contain', 'Test Test Test')
  })
})