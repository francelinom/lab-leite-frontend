<template>
  <div class="item-admin">
    <PageTitle main="Gerenciar Itens" icon="fa fa-cube"/>
    <b-card  title="Ações" >         
        <b-button v-b-modal.modal-formulario-item variant="primary">Cadastar Item</b-button>
        <hr> 
        <b-modal ref="modal-formulario-item" id="modal-formulario-item" title="Inserir dados do Item"
        size="lg" hide-footer>                  
        <b-form class="card-body">
          <input id="item-id" type="hidden" v-model="item.id"/>
          <div class="alert alert-info" role="alert">
            <h6>Todos os campos marcados com (*) são obrigatório</h6></div>
          <b-row>
            <b-col md="6" ms="12">
              <b-form-group label="Nome do Item *" label-for="item-name">
                <b-form-input                
                  id="item-name"
                  type="text"
                  v-model= "item.name"
                  @change="$v.item.name.$touch()"
                  :class="{'is-invalid':$v.item.name.$error, 'is-valid':!$v.item.name.$invalid}"                  
                  :readonly="mode === 'remove'"
                  placeholder="Informe o Nome do Item"                                                                    
                />                
                <span class="valid-feedback">Nome é valido</span>
                <span class="invalid-feedback">Preencher o campo</span>                                                              
              </b-form-group>
            </b-col>
            <b-col md="6" ms="12">
              <b-form-group label="Unidade de Medida *" label-for="item-unidade">
                <b-form-select
                  id="item-unidade"
                  type="text"
                  v-model="item.unit"
                  :options="options"
                  class="mb-3"
                  value-field="item"
                  text-field="name"
                  disabled-field="notEnabled"
                  @change="$v.item.unit.$touch()"
                  :class="{'is-invalid':$v.item.unit.$error, 'is-valid':!$v.item.unit.$invalid}"
                >              
                </b-form-select>
                <span class="valid-feedback">unidade valido</span>
                <span class="invalid-feedback">Preencher o campo</span>
              </b-form-group>
            </b-col>
            <b-col md="6" ms="12">
              <b-form-group label="Marca *" label-for="item-marca">
                <b-form-input
                  id="item-marca"
                  type="text"
                  v-model="item.brand"
                  required
                  :readonly="mode === 'remove'"
                  placeholder="Informe a marca do Item"
                  @change="$v.item.brand.$touch()"
                  :class="{'is-invalid':$v.item.brand.$error, 'is-valid':!$v.item.brand.$invalid}"
                />
                <span class="valid-feedback">Nome é valido</span>
                <span class="invalid-feedback">Preencher o campo</span>  
              </b-form-group>
            </b-col>
            <b-col md="6" ms="12">
              <b-form-group label="Preço de custo *" label-for="item-preco">
                <b-form-input
                  id="item-preco"
                  type="number"
                  v-model="item.cost_value"
                  required
                  :readonly="mode === 'remove'"
                  placeholder="Informe o Preço de custo do Item"
                  @change="$v.item.cost_value.$touch()"
                  :class="{'is-invalid':$v.item.cost_value.$error, 'is-valid':!$v.item.cost_value.$invalid}"
                />
                <span class="valid-feedback">Nome é valido</span>
                <span class="invalid-feedback">Preencher o campo</span>  
              </b-form-group>
            </b-col>
            <b-col md="6" ms="12">
              <b-form-group label="Estoque Atual *" label-for="item-estoque">
                <b-form-input
                  id="item-estoque"
                  type="number"
                  v-model="item.current_inventory"
                  required
                  :readonly="mode === 'remove'"
                  placeholder="Informe o estoque atual do Item"
                  @change="$v.item.current_inventory.$touch()"
                  :class="{'is-invalid':$v.item.current_inventory.$error, 'is-valid':!$v.item.current_inventory.$invalid}"
                />
                <span class="valid-feedback">Valor é valido</span>
                <span class="invalid-feedback">Preencher o campo</span>  
              </b-form-group>
            </b-col>
            <b-col md="6" ms="12">
              <b-form-group label="Estoque Mínimo *" label-for="item-minimo">
                <b-form-input
                  id="item-minimo"
                  type="number"
                  v-model="item.minimum_stock"
                  required
                  :readonly="mode === 'remove'"
                  placeholder="Informe o estoque Mínimo"
                  @change="$v.item.minimum_stock.$touch()"
                  :class="{'is-invalid':$v.item.minimum_stock.$error, 'is-valid':!$v.item.minimum_stock.$invalid}"
                />
                <span class="valid-feedback">Valor é valido</span>
                <span class="invalid-feedback">Preencher o campo</span>  
              </b-form-group>
            </b-col>
            <b-row v-show="mode === 'save'" class="px-3">
              <b-col>
                <b-form-group
                  label="Data de validade"
                  label-for="item-data-validade"
                >
                  <b-form-input
                    id="item-data-validade"
                    type="date"
                    v-model="item.validaty"
                    required
                  />
                </b-form-group>
              </b-col>            
            </b-row>
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
        id="table-items"          
        hover
        striped
        :filter="termoPesquisa"
        @filtered="onFiltered"
        :items="items"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        small>
        <template slot="actions" slot-scope="data">
          <b-button v-b-modal.modal-formulario-item variant="warning" @click="loadItem(data.item)" class="mr-2">
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button variant="danger" @click="remove(data.item)">
            <i class="fa fa-trash"></i>
          </b-button>
        </template>       
      </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="table-items"
          first-text="Primeiro"
          prev-text="Anterior"
          next-text="Próximo"
          last-text="Último" >
        </b-pagination>
    </b-card>
  </div>
</template>

<script>
// Importante verificiar item ativdo e deixar o check selecionado caso seja ativo
// Testar retirando
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";
import PageTitle from '../template/PageTitle';
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
  name: "ItemAdmin",
  components: {PageTitle},
  data: function() {
    return {    
      termoPesquisa: null,
      mode: "save",
      perPage: 5,
      currentPage: 1,
      item: {     
          name: "",
          unit: "",
          brand: "",
          cost_value: "",
          current_inventory: "",
          minimum_stock: "",
          validaty: ""
      },
      items: [],
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "unit", label: "Unidade", sortable: true },
        { key: "brand", label: "Marca", sortable: true },
        { key: "cost_value", label: "Preço de custo", sortable: true },
        { key: "current_inventory", label: "E. Atual", sortable: true },
        { key: "minimum_stock", label: "Estoque Mín", sortable: true },
        { key: "validaty", label: "Validade", sortable: true },
        { key: "actions", label: "Ações" },
      ],
      options: [
        { item: 0, name: "UND" },
        { item: 1, name: "G" },
        { item: 2, name: "MG" },
        { item: 3, name: "L" },
        { item: 4, name: "ML" },
        { item: 5, name: "KL" },
      ],
      optionsperpage:[
        {item: 5, name: "5"},
        {item: 10, name: "10"},
        {item: 15, name: "15"},
        {item: 20, name: "20"},
        {item: 25, name: "25"},
        {item: 30, name: "30"},
      ],
    };
  },
  validations: {     
    item: {
      name: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(100)
      },
      unit: {
        required
      },
      brand: {
        required,
        maxLength: maxLength(100)
        },
      cost_value: {
        required,       
      },
      current_inventory: {
        required,
      },
      minimum_stock: {
        required,
        maxLength: maxLength(16)
      }
    }
  },
  computed: {
        rows() {        
            return this.items.length
        }
  },
  methods: {
    hideModal() {        
        this.$refs['modal-formulario-item'].hide()
        this.reset();
      },
    clearForm(){
      this.mode = "save";
      this.item = {};
    },
    loadItems() {
       const url = `${baseApiUrl}/items_total/`
        axios.get(url, {
          headers: {
              'Authorization': 'JWT ' + localStorage.getItem(userKey)
            },
        }).then((res) => {
        this.items = res.data;
      });
      
    },
    reset() {
      this.mode = "save";
      this.item = {};
      this.loadItems();
    },
    save() {      
      if(!this.$v.item.$invalid){
        if(this.item.id === undefined){
          axios.post(`${baseApiUrl}/add_item/`, this.item, {
            headers: {
              'Authorization': 'JWT ' + localStorage.getItem(userKey)
            },
          })      
          .then(() => {        
            this.$toasted.global.defaultSuccess();
            this.hideModal();            
            this.reset();           
            this.loadItems();
            this.$v.$reset();            
          })
          .catch(showError); 
        }else{
          axios.put(`${baseApiUrl}/items/${this.item.id}`, this.item, {
            headers: {
              'Authorization': 'JWT ' + localStorage.getItem(userKey)
            },
          })      
          .then(() => {        
            this.$toasted.global.defaultSuccess();
            this.hideModal();
            this.reset();
            this.loadItems();
          })
          .catch(() => {
            alert("Não foi possivel realizar a operação");
          })
        }
      }  
    },
    update(){
      axios.put(`${baseApiUrl}/items/${this.item.id}`, this.item, {
        headers: {
              'Authorization': 'JWT ' + localStorage.getItem(userKey)
        },
      })      
        .then(() => {        
          this.$toasted.global.defaultSuccess();
          this.reset();
          this.loadItems();
        })
         .catch(() => {
            alert("Não foi possivel realizar a operação");
         })
    },
    remove(item) {
      this.item = { ...item };
      if(confirm(`Desejar realmente deletar o item ${this.item.id}?`)){
        axios.put(`${baseApiUrl}/item_deactivate/${this.item.id}`, this.item, {
          headers: {
              'Authorization': 'JWT ' + localStorage.getItem(userKey)
          },
        })   
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
          this.loadItems();
        })
        .catch(() => {
              alert("Não foi possivel realizar a operação");
        })
      }
    },
    loadItem(item, mode = "save") {
      this.mode = mode;
      this.item = { ...item };
      for (let i = 0; i < this.options.length; i++) {
          if(this.item.unit == this.options[i].name){
            this.item.unit = this.options[i].item
          }
      }
    },
    clearSearch(){
      this.termoPesquisa = "";
    },
    onFiltered(filteredItems) {        
        this.totalRows = filteredItems.length
        this.currentPage = 1
    }
  },
  mounted() {
    this.loadItems();
  },
 };
</script>
 
<style>
</style>
