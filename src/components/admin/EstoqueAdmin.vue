<template>
    <div class="estoque-admin">
        <b-form>
            <input id="estoque-id" type="hidden" v-model="estoque.id" />
            <b-row>
                <b-col md="6" ms="12">
                    <b-form-group label="Nome" label-for="estoque-name">
                        <b-form-input id="estoque-name" type="text"
                            v-model="estoque.name" required 
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome do Estoque" />
                    </b-form-group>
                </b-col>
                <b-col md="6" ms="12">
                    <b-form-group label="Unidade de Medida" label-for="estoque-unidade">
                        <b-form-select
                            id="stoque-unidade"
                            v-model="selected"
                            :options="options"
                            class="mb-3"
                            value-field="item"
                            text-field="name"
                            disabled-field="notEnabled"
                        ></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row v-show="mode === 'save'">
                <b-col md="6" ms="12">
                    <b-form-group label="Quantidade" label-for="estoque-quantidade">
                        <b-form-input id="estoque-quantidade" type="number"
                            v-model="estoque.quantidade" required 
                            placeholder="Informe a quantidade" />
                    </b-form-group>
                </b-col>
                <b-col md="6" ms="12">
                    <b-form-group label="Data de Validade" label-for="estoque-data-validade">
                        <b-form-input id="estoque-data-validade" type="date"
                            v-model="estoque.dataValidade" required 
                            placeholder="Selecione a Validade do Produto" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <b-table hover striped :items="estoques" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadEstoque(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadEstoque(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import {baseApiUrl, showError} from '@/global'
import axios from 'axios'

export default {
    name: 'EstoqueAdmin',
    data: function() {
        return {
            mode: 'save',
            estoque: {},
            estoques: [],
            fields: [
                {key: 'id', label: 'Código', sortable: true},
                {key: 'name', label: 'Nome', sortable: true},
                {key: 'unidade_medida', label: 'Unidade de Medida', sortable: true},
                {key: 'quantidade', label: 'Quantidade', sortable: true},
                {key: 'data_validade', label: 'Data de Validade', sortable: true},
                {key: 'actions', label: 'Ações'}
            ],
            options: [
                { item: 'A', name: 'g' },
                { item: 'B', name: 'Kg' },
                { item: 'A', name: 'L' },
                { item: 'B', name: 'mg' },
            ]
        }
    },
    methods: {
        loadEstoques() {
            const url = `${baseApiUrl}/estoque`
            axios.get(url).then(res =>{
                this.estoque = res.data
            })
        },
        reset() {
            this.mode = 'save'
            this.estoque = {}
            this.loadEstoques()
        },
        save() {
            const method = this.estoque.id ? 'put' : 'post'
            const id = this.estoque.id ? `/${this.estoque.id}` : ''
            axios[method](`${baseApiUrl}/estoque${id}`, this.estoque)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.estoque.id
            axios.delete(`${baseApiUrl}/estoque/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadEstoque(estoque, mode = 'save') {
            this.mode = mode
            this.estoque = { ...estoque }
        }
    },
    mounted() {
        this.loadEstoques()
    }
}

</script>

<style>

</style>