/// <reference types="cypress" />

describe('Testar todos os elementos page cadastrar estoque', () => {

    it('successfully loads', () => {
        cy.visit('/admin')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('deve cliclar no botão estoque para cadastrar', () => {
        cy.get('.toggle').click()
        cy.get('[href="/admin/EstoqueAdmin"] > .spanText').click()
        cy.get('.btn-group > .btn').click()

        cy.get('#estoque-nf')
            .type('1001')
            .should('have.value', '1001')
        
        cy.get('#estoque-tipo')
            .select('ENTRADA')
            .should('have.value', '0')

        cy.get('#modal_1___BV_modal_body_ > .modal-footer > .btn-success').click()
        
        cy.get('#estoque-name')
            .select('Alcool Etilico')
            .should('have.value', 'Alcool Etilico')

        cy.get('#estoque-id')
            .select('10')
            .should('have.value', '10')

        cy.get('#estoque-quantidade')
            .type('500')
            .should('have.value', '500')

            cy.get('#modal_item___BV_modal_body_ > .modal-footer > .btn-success').click()

        cy.get('#__BVID__40')
            .clear()
            .type('Bananinha{selectAll}Alcool 70', {delay: 300})
            .should('have.value', 'Alcool 70')
        
    });
})