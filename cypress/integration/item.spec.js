/// <reference types="cypress" />

describe('Testar todos os elementos (Cadastrar Item)', () => {

    it('successfully loads', () => {
        cy.visit('/admin')
      })

    beforeEach(() => {
        cy.reload()
    })

    it('teste simples para o title', () => {
        cy.title().should('be.equal', 'Lab Leite')
    })

    it('deve clicar no botão para cadastrar', () => {
        cy.get('#__BVID__13___BV_tab_button__').click()
        cy.get('div.card-body > .btn-group > .btn-primary').click()

        cy.get('#item-name')
            .type('Item AB')
            .should('have.value', 'Item AB')

        cy.get('#item-marca')
            .clear()
            .type('Erro{selectAll}Marca AB', {delay: 300})
            .should('have.value', 'Marca AB')

        cy.get('#item-preco')
            .type('50')
            .should('have.value', '50')

        cy.get('#item-estoque')
            .type('100')
            .should('have.value', '100')

        cy.get('#item-minimo')
            .type('10')
            .should('have.value', '10')

        cy.get('#item-unidade')
            .select('UND')
            .should('have.value', '0')

        cy.get('#item-unidade')
            .select('KL')
            .should('have.value', '5')

        cy.get('#item-ativo')
            .click({force:true})

        cy.get('#modal-formulario-item___BV_modal_footer_ > .btn-primary').click()

        cy.get(':nth-child(1) > [aria-colindex="9"] > .mr-2').click()
    
        cy.get('#item-marca')
            .clear()
            .type('Digitei Errado{selectAll}Alterado com sucesso', {delay: 300})
            .should('have.value', 'Alterado com sucesso')

        cy.get('#modal-formulario-item___BV_modal_footer_ > .btn-primary').click()

    })
   
})