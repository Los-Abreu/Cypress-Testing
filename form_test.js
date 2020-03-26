describe('Testing User Boarding', function(){
    beforeEach(function() {
        cy.visit('http://localhost:3001/')
    })
    it('Adds tests to inputs and submits form', function(){
        cy.get('input[data-cy="name"]')
        .type("Muffin Man")
        .should('have.value', "Muffin Man");
        cy.get('input[data-cy="email"]')
        .type("MuffinManRules@bakery.com")
        .should('have.value', "MuffinManRules@bakery.com")
        cy.get('input[data-cy="password"]')
        .type("Muffins4lyfe")
        .should('have.value', "Muffins4lyfe")
        cy.get('input[data-cy="terms"]')
        .check()
        .should('be.checked')
        cy.get('button[data-cy="submit"]')
        .click();
    });
})