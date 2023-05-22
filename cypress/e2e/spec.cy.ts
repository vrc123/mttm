describe('Test of MTTM', () => {
  it('Creates an anlysis', () => {
    cy.visit('http://localhost:3000/')

    cy.get('h1').should('have.text', 'My table tennis matches')
    cy.get('button').contains('Create an analysis').click()

    cy.get('h1').should('have.text', 'Create an analysis')
    cy.get('input').its('length').should('eq', 1)
    cy.get('input').eq(0).type('2000-10-10')
    cy.get('button').eq(0).click()

    cy.get('h1').should('have.text', 'Select your opponent')
    cy.get('a').contains('Click here').click()
    
    cy.get('h1').should('have.text', 'Add and select opponent')
    cy.get('input').its('length').should('eq', 5)
    cy.get('input').eq(0).type('Test')
    cy.get('input').eq(1).type('Test')
    cy.get('input').eq(2).type('Test')
    cy.get('input').eq(3).type('Test')
    cy.get('input').eq(4).type('2000-10-10')
    cy.get('button').contains('Add opponent').click()
    
    cy.get('h1').should('have.text', 'Add the score of the match')
    cy.get('input').its('length').should('eq', 2)
    cy.get('input').eq(0).type('4')
    cy.get('input').eq(1).type('3')
    cy.get('button').contains('Next').click()

    cy.get('h1').should('have.text', 'Add serves')
    cy.get('input').its('length').should('eq', 2)
    cy.get('button').contains('Next').click()

    cy.get('h1').should('have.text', 'Add recieves')
    cy.get('input').its('length').should('eq', 2)
    cy.get('button').contains('Next').click()

    cy.get('h1').should('have.text', 'Add match rallies')
    cy.get('input').its('length').should('eq', 2)
    cy.get('button').contains('Create analysis').click()
    cy.get('.AnalysisItem_analysisItem__UCTCo')
  })

  /*



  it('passess', () => {
    cy.visit('http://localhost:3000/my-opponents')
  })
  it('passess', () => {
    cy.visit('http://localhost:3000/')
    
    cy.get('h1').should('have.text', 'My table tennis matches')
    cy.get('button').contains('My analyses').click()

    cy.get('h1').should('have.text', 'My analyses')
    cy.get('.AnalysisItem_analysisItem__UCTCo').within(() => {})
    //.contains('p', 'Test')
  })*/
  /*
  it('passes', () => {
    cy.visit('http://localhost:3000/')

    cy.get('h1').should('have.text', 'My table tennis matches')
    cy.get('nav').contains('a', 'My opponents').click()
    
    cy.get('h1').should('have.text', 'My opponents')
    cy.get('.OpponentItem_opponentItem__8xMoL').contains('p', 'Test')
  })*/
})