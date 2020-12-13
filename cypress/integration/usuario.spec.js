/// <reference types="cypress" />

describe('Testar todos elementos page cadastrar usuario', () => {
    it('successfully loads', () => {
        cy.visit('/admin')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('deve cliclar no botão usuario para cadastrar', () => {
        cy.get('#__BVID__56___BV_tab_button__').click()
        cy.get('.user-admin > .btn-group > .btn-primary').click()

        cy.get('#user-name')
            .type('Francelino Marcilio da Silva')
            .should('have.value', 'Francelino Marcilio da Silva')

        cy.get('#user-email')
            .type('marcilio@gmail.com')
            .should('have.value', 'marcilio@gmail.com')

        cy.get('#user-password')
            .type('123456')
            .should('have.value', '123456')

        cy.get('#user-confirm-password')
            .type('123456')
            .should('have.value', '123456')

        cy.get(':nth-child(3) > #modal-1___BV_modal_outer_ > #modal-1 > .modal-dialog > .modal-content > #modal-1___BV_modal_footer_ > .btn-primary').click()
    
    });
})