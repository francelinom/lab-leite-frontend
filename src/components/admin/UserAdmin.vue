<template>
    <div class="user-admin">
        <PageTitle main="Gerenciar Usuários" icon="fa fa-users"/> 
        <b-card title="Ações:">       
        <b-button-group>   
            <b-button v-b-modal.modal-1 variant="primary">Cadastrar Usuário</b-button>                        
        </b-button-group>
        <b-modal id="modal-1" ref="modal-1" title="Cadastrando novo usuário" hide-footer>
            <b-form>
                <input id="user-id" type="hidden" v-model="user.id" />
                <div class="alert alert-info" role="alert">
                <h6>Todos os campos marcados com (*) são obrigatório</h6></div>
                <b-row>
                    <b-col md="6" ms="12">
                        <b-form-group label="Primeiro nome *" label-for="user-first">
                            <b-form-input
                                id="user-name"
                                type="text"
                                v-model="user.first_name"
                                required
                                :readonly="mode === 'remove'"
                                @change="$v.user.firstname.$touch()"
                                :class="{'is-invalid':$v.user.first_name.$error, 'is-valid':!$v.user.first_name.$invalid}"                               
                                placeholder="Informe o nome do Usuário"                                                                
                                 />
                                <span class="valid-feedback">Nome é valido</span>
                                <span class="invalid-feedback">Preencher o campo</span> 
                        </b-form-group>
                    </b-col>
                    <b-col md="6" ms="12">
                        <b-form-group label="Sobrenome *" label-for="user-last">
                            <b-form-input
                                id="user-last"
                                type="text"
                                v-model="user.last_name"
                                required 
                                :readonly="mode === 'remove'"
                                @change="$v.user.email.$touch()"
                                :class="{'is-invalid':$v.user.last_name.$error, 'is-valid':!$v.user.last_name.$invalid}"                               
                                placeholder="Informe o sobrenome"
                                />
                                <span class="valid-feedback">Sobrenome é valido</span>
                                <span class="invalid-feedback">Preencher o sobrenome</span>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row> 
                    <b-col md="6" ms="12">
                        <b-form-group label="Nome Usuário *" label-for="user-name">
                            <b-form-input
                                id="user-name"
                                type="text"
                                v-model="user.username"
                                required 
                                :readonly="mode === 'remove'"
                                @change="$v.user.username.$touch()"
                                :class="{'is-invalid':$v.user.username.$error, 'is-valid':!$v.user.username.$invalid}"                                                               
                                placeholder="Informe um nome de Usuário"
                                />
                                <span class="valid-feedback">Nome de usuário é valido</span>
                                <span class="invalid-feedback">Preencher o nome de Usuário</span>
                        
                        </b-form-group>
                    </b-col>                  
                    <b-col md="6" ms="12">
                        <b-form-group label="E-mail *" label-for="user-email">
                            <b-form-input
                                id="user-email"
                                type="text"
                                v-model="user.email"
                                required 
                                :readonly="mode === 'remove'"
                                @change="$v.user.email.$touch()"
                                :class="{'is-invalid':$v.user.email.$error, 'is-valid':!$v.user.email.$invalid}"                               
                                placeholder="Informe o E-mail do Usuário"
                                />
                                <span class="valid-feedback">E-mail é valido</span>
                                <span class="invalid-feedback">Preencher o E-mail</span>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="6" ms="12">
                        <b-form-checkbox id="user-admin" 
                            v-show="mode === 'save'"
                            v-model="user.admin"
                            class="mt-3 mb-3">
                            Administrador ?
                        </b-form-checkbox>
                    </b-col>
                    
                </b-row>                
                <b-row v-show="mode === 'save'">
                    <b-col md="6" ms="12">
                        <b-form-group label="Senha *" label-for="user-password">
                            <b-form-input
                                id="user-password"
                                type="password"
                                v-model="user.password"
                                required
                                @change="$v.user.password.$touch()"
                                :class="{'is-invalid':$v.user.password.$error, 'is-valid':!$v.user.password.$invalid}"
                                placeholder="Informe a senha"
                                />
                                <span class="valid-feedback">Senha é valido</span>
                                <span class="invalid-feedback">Preencher a Senha</span>
                        
                        </b-form-group>
                    </b-col>
                    <b-col md="6" ms="12">
                        <b-form-group label="Confirme a Senha *" label-for="user-confirm-password">
                            <b-form-input
                                id="user-confirm-password"
                                type="password"
                                v-model="user.repeatPassword"
                                required
                                @change="$v.user.repeatPassword.$touch()"
                                :class="{'is-invalid':$v.user.repeatPassword.$error, 'is-valid':!$v.user.repeatPassword.$invalid}"
                                placeholder="Confirme a Senha"
                                />
                                <span class="valid-feedback">Senhas São Iguais</span>
                                <span class="invalid-feedback">Preencher a senha</span>
                        
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row v-show="mode === 'save'">
                    <b-col md="6" ms="12">
                        <b-form-group label="Pergunta secreta*" label-for="user-question">
                            <b-form-input
                                id="user-question"
                                type="text"
                                v-model="user.question"
                                required
                                @change="$v.user.question.$touch()"
                                :class="{'is-invalid':$v.user.question.$error, 'is-valid':!$v.user.question.$invalid}"
                                placeholder="Escreva uma pergunta secreta"
                                />
                                <span class="valid-feedback">Pergunta valida</span>
                                <span class="invalid-feedback">Preencher a pergunta</span>
                        
                        </b-form-group>
                    </b-col>
                    <b-col md="6" ms="12">
                        <b-form-group label="Escreva uma resposta*" label-for="user-answer">
                            <b-form-input
                                id="user-answer"
                                type="text"
                                v-model="user.answer"
                                required
                                @change="$v.user.answer.$touch()"
                                :class="{'is-invalid':$v.user.answer.$error, 'is-valid':!$v.user.answer.$invalid}"
                                placeholder="Escreva a respota"
                                />
                                <span class="valid-feedback">resposta valida</span>
                                <span class="invalid-feedback">Preencher a resposta</span>
                        
                        </b-form-group>
                    </b-col>
                </b-row>                 
            </b-form>
            <div class="modal-footer">
                <b-button  @click="clearForm()" @click.prevent="$v.$reset()" variant="warning "> Limpar Campos</b-button>
                <b-button  @click="hideModal()" @click.prevent="$v.$reset()" variant="danger"> Cancelar</b-button>
                <b-button  @click="save()" @click.prevent="$v.$touch()" variant="success"> Salvar</b-button>
            </div>
        </b-modal>                              
            <!-- Tabela com paginação -->
        <div class="option-table">
            <b-row>       
            <b-col md=2>
                <b-form-group label="Itens por página">
                <b-form-select
                id="item-por-pagina"
                type="text"
                v-model="perPage"
                :options="optionsperpage"
                class="mb-3"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
                ></b-form-select>
                </b-form-group>        
            </b-col>
            <b-col md=5 offset=0>
                <label>Pesquisa</label> 
                <b-input-group>                                                                                                             
                <b-form-input md=9 id="campoPesquisa" type="search" v-model="termoPesquisa" placeholder="nome, marca, data ou qualquer outro valor">
                </b-form-input>
                <b-form-group-append>
                    <b-button v-on:click="clearSearch()" type="reset" variant="danger">Limpar</b-button>
                </b-form-group-append>
                </b-input-group>
            </b-col>
            </b-row>       
        </div>   
        <hr>
        <b-table 
            id="table-users" 
            hover 
            striped 
            :filter="termoPesquisa"
            @filtered="onFiltered"
            :items="users" 
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            small>
            <template slot="actions" slot-scope="data">
                <b-button variant="danger" @click="remove(data.item)">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="table-users"
          first-text="Primeiro"
          prev-text="Anterior"
          next-text="Próximo"
          last-text="Último">
        </b-pagination>
        </b-card>
    </div>
</template>

<script>
import {baseApiUrl, userKey} from '@/global'
import PageTitle from '../template/PageTitle'
import axios from 'axios'
import { required, maxLength, minLength, email, sameAs } from 'vuelidate/lib/validators'

export default {
    name: 'UserAdmin',
    components: {PageTitle},
    computed: {
    rows() {
        return this.users.length;
        },
    },
    data: function() {
        return {
            termoPesquisa: null,
            mode: "save",
            perPage: 5,
            currentPage: 1,        
            user: {
                first_name: "",
                last_name:"",
                username: "",
                email: "",
                password: "",
                repeatPassword: "",               
                admin: "",
                question: "",
                answer:""
            },
            users: [],
            fields: [
                {key: 'username', label: 'Nome Usuário', sortable: true},
                {key: 'first_name', label: 'Primeiro Nome', sortable: true},
                {key: 'last_name', label: 'Sobrenome', sortable: true},
                {key: 'email', label: 'E-mail', sortable: true},
                {key: 'is_superuser', label: 'Administrador', sortable: true, 
                    formatter: value => value ? 'Sim' : 'Não'},
                {key: 'actions', label: 'Ações'}
            ],
            optionsperpage:[
                {item: 5, name: "5"},
                {item: 10, name: "10"},
                {item: 15, name: "15"},
                {item: 20, name: "20"},
                {item: 25, name: "25"},
                {item: 30, name: "30"},
            ]
        }
    },
    validations:{
        user:{
            first_name: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(100)
            },
            last_name:{
                required,
                minLength: minLength(4),
                maxLength: maxLength(100)
            },
            username: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(16)
            },
            email: {
                required,
                email            
            },
            password: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(16)
            },
            repeatPassword:{
                required,
                minLength: minLength(8),
                maxLength: maxLength(16),
                sameAsPassword: sameAs('password')
            },
            question:{
                required,
                minLength: minLength(8),
                maxLength: maxLength(256),
            },
            answer:{
                required,
                minLength: minLength(1),
                maxLength: maxLength(256),
            },            
        }              
    },
    methods: {
        hideModal() {        
            this.$refs['modal-1'].hide()
            this.reset();
        },
        loadUsers() {
            const url = `${baseApiUrl}/total_users/`;
            axios.get(url, {
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem(userKey)
                },
            }).then(res =>{
                this.users = res.data
            })
        },
        reset() {
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },
        save() {              
            if (!this.$v.user.$invalid) {
                if(this.user.id === undefined){
                axios.post(`${baseApiUrl}/users/`, this.user, {
                    headers: {
                        'Authorization': 'JWT ' + localStorage.getItem(userKey)
                    },
                })      
                .then(() => {        
                    this.$toasted.global.defaultSuccess();
                    this.hideModal();            
                    this.reset();           
                    this.loadUsers();
                    this.$v.$reset();             
                })
                 .catch(() => {
                   alert("Não foi possivel realizar a operação");
                })
                }
            }     
            
        },
        remove(user) {     
            this.user = {...user}       
            if(confirm(`Desejar realmente deletar o usuario ${this.user.username}?`)){
                axios.post(`${baseApiUrl}/delete_user/${this.user.username}`, this.user, {
                    headers: {
                        'Authorization': 'JWT ' + localStorage.getItem(userKey)
                    },
                })
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                    this.loadUsers()
                })
                .catch(() => {
                    alert("Não foi possivel realizar a operação");
                })
            }
        },
        loadUser(user, mode = 'save') {
            this.mode = mode
            this.user = { ...user }
        },
        clearForm(){
            this.mode = "save";
            this.user = {};
        },
        clearSearch(){
            this.termoPesquisa = "";
        },
        onFiltered(filteredUsers) {        
            this.totalRows = filteredUsers.length
            this.currentPage = 1
    }
    },
    mounted() {
        this.loadUsers()
    }
}

</script>

<style>

</style>