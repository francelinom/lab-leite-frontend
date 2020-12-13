import { shallowMount } from '@vue/test-utils'
import EstoqueAdmin from '@/components/admin/EstoqueAdmin'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

Vue.use(BootstrapVue)
Vue.use(Vuelidate)

describe('EstoqueAdmin', () => {

    let wrapper

    beforeAll(() => {
        wrapper = shallowMount(EstoqueAdmin)
    })

    test('Se o estado do validation modal de estoque é incialmente $invalid == true', () => {
        wrapper.setData({
            stock: {
                nf: '',
                movement: '',
            },
        })

        expect(wrapper.vm.$v.invalid).toBeTruthy
    })

    test('Se o estado do validation modal de estoque é $invalid == false quando todos os campos obrigatórios forem preenchidos', () => {
        wrapper.setData({
            stock: {
                nf: '0001',
                movement: 0,
            },
        })
        expect(wrapper.vm.$v.invalid).toBeFalsy
    })

    test('Se o estado do validation modal de estoque_item é incialmente $invalid == true', () => {
        wrapper.setData({
            stock_item: {
                stock: '',
                item: '',
                qtd: 0
            },
        })

        expect(wrapper.vm.$v.invalid).toBeTruthy
    })

    test('Se o estado do validation modal de estoque_item é $invalid == false quando todos os campos obrigatórios forem preenchidos', () => {
        wrapper.setData({
            stock_item: {
                stock: 1,
                item: 1,
                qtd: 10
            },
        })
        expect(wrapper.vm.$v.invalid).toBeFalsy
    })



    test('Componente é uma instância do Vue', () => {
        expect(wrapper.App).toBeThuthy
    })
})