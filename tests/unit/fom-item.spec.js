import { shallowMount } from '@vue/test-utils'
import ItemAdmin from '@/components/admin/ItemAdmin'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

Vue.use(BootstrapVue)
Vue.use(Vuelidate)


describe('ItemAdmin', () => {

    let wrapper

    beforeAll(() => {
        wrapper = shallowMount(ItemAdmin)
    })

    test('Se o estado do validation form do item é incialmente $invalid == true', () => {
        wrapper.setData({
            item: {     
                name: "",
                unit: "",
                brand: "",
                cost_value: "",
                current_inventory: "",
                minimum_stock: "",
                validaty: ""  
            },
        })
        expect(wrapper.vm.$v.invalid).toBeTruthy
    })

    test('Se o estado do validation form do item é $invalid == false quando campos estão preenchidos', () => {
        wrapper.setData({
            item: {     
                name: "Item do iventárioo",
                unit: "3",
                brand: "Nico",
                cost_value: "3.40",
                current_inventory: "30.00",
                minimum_stock: "10.00",
                validaty: "2019-01-10"  
            },
        })
        expect(wrapper.vm.$v.invalid).toBeTruthy
    })

    test('Componente é uma instância do Vue', () => {
        expect(wrapper.App).toBeThuthy
    })
})