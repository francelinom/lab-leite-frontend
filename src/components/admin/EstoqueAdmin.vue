<template>
  <div class="estoque-admin">
    <PageTitle main="Gerenciar Estoque" />
    <b-card title="Opções da Tabela" blank-color="transparent">
    <b-button-group>
      <b-button v-b-modal.modal_1 variant="primary">Criar Estoque</b-button>
      <b-button v-b-modal.modal_item variant="success"
        >Realizar Entrada/Saída</b-button
      >
    </b-button-group>
    <hr>
    <b-modal ref="modal_1" id="modal_1" title="Novo Estoque" hide-footer>
      <b-form ref="form_modal_1">
        <b-row>
          <b-col md="6" ms="12">
            <b-form-group label="Identificação" label-for="estoque-nf">
              <b-form-input
                id="estoque-nf"
                type="number"
                v-model="stock.nf"
                required
                placeholder="Informe a nota fiscal"
                @change="$v.stock.nf.$touch()"
                :class="{
                  'is-invalid': $v.stock.nf.$error,
                  'is-valid': !$v.stock.nf.$invalid,
                }"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" ms="12">
            <b-form-group label="Tipo de Movimento" label-for="estoque-tipo">
              <b-form-select
                id="estoque-tipo"
                v-model="stock.movement"
                :options="options"
                class="mb-3"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
                @change="$v.stock.movement.$touch()"
                :class="{
                  'is-invalid': $v.stock.movement.$error,
                  'is-valid': !$v.stock.movement.$invalid,
                }"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
      <div class="modal-footer">
        <b-button
          @click="clearForm1()"
          @click.prevent="$v.$reset()"
          variant="warning "
        >
          Limpar Campos</b-button
        >
        <b-button @click="hideModal1()" variant="danger"> Cancelar</b-button>
        <b-button
          @click="save_stock()"
          v-if="mode === 'save'"
          @click.prevent="$v.$touch()"
          variant="success"
        >
          Salvar</b-button
        >
      </div>
    </b-modal>
    <b-modal
      ref="modal_item"
      id="modal_item"
      title="Operação de Entrada/Saída"
      hide-footer
    >
      <b-form ref="form_modal_2">
        <div class="alert alert-info" role="alert">
          <h6>Todos os campos marcados com (*) são obrigatório</h6>
        </div>
        <b-row>
          <b-col md="6">
            <b-form-group label="Nome do Item *" label-for="estoque-name">
              <b-form-input
                id="estoque-name"
                v-model="stock_item.item"
                list='list_item'
                class="mb-3"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
                :options="options_item"
                @change="$v.stock_item.item.$touch()"
                :class="{
                  'is-invalid': $v.stock_item.item.$error,
                  'is-valid': !$v.stock_item.item.$invalid,
                }"
              >
                <span class="valid-feedback">unidade valido</span>
                <span class="invalid-feedback">Selecionar o campo</span>
  
              </b-form-input>
               <datalist id='list_item'>
                 <option
                  v-for="item in items"
                  v-bind:key="item.id"
                  :value="item.id"
                  :data-text="item.name"
                >
                {{ item.name }}
                </option>
              </datalist>
            </b-form-group>
          </b-col>
          <b-col md="6" ms="12">
            <b-form-group
              label="Identificação Estoque *"
              label-for="estoque-id"
            >
              <b-form-select
                id="estoque-id"
                v-model="stock_item.stock"
                type="number"
                class="mb-3"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
                :options="options_stock"
                @change="$v.stock_item.stock.$touch()"
                :class="{
                  'is-invalid': $v.stock_item.stock.$error,
                  'is-valid': !$v.stock_item.stock.$invalid,
                }"
              >
                <span class="valid-feedback">unidade valido</span>
                <span class="invalid-feedback">Selecionar o campo</span>
                <option
                  v-for="stock in stocks"
                  v-bind:key="stock.id"
                  :select="stock.id"
                  :value="stock.id"
                >
                  {{ stock.nf }}
                </option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="6" ms="12">
            <b-form-group label="Quantidade *" label-for="estoque-quantidade">
              <b-form-input
                id="estoque-quantidade"
                type="number"
                v-model="stock_item.qtd"
                required
                placeholder="Informe a quantidade"
                @change="$v.stock_item.qtd.$touch()"
                :class="{
                  'is-invalid': $v.stock_item.qtd.$error,
                  'is-valid': !$v.stock_item.qtd.$invalid,
                }"
              />
              <span class="valid-feedback">Valor é valido</span>
              <span class="invalid-feedback">Preencher o campo</span>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
      <div class="modal-footer">
        <b-button
          @click="clearForm2()"
          @click.prevent="$v.$reset()"
          variant="warning "
        >
          Limpar Campos</b-button
        >
        <b-button
          @click="hideModal2()"
          @click.prevent="$v.$reset()"
          variant="danger"
        >
          Cancelar</b-button
        >
        <b-button
          @click="save_stock_item()"
          @click.prevent="$v.$touch()"
          variant="success"
        >
          Salvar</b-button
        >
      </div>
    </b-modal>    
      <div class="option-table">
        <b-row>
          <b-col md="3">
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
          <b-col md="5" offset="0">
            <label>Pesquisa</label>
            <b-input-group>
              <b-form-input
                md="9"
                id="campoPesquisa"
                type="search"
                v-model="termoPesquisa"
                placeholder="nome, data ou qualquer outro valor"
              >
              </b-form-input>
              <b-form-group-append>
                <b-button
                  v-on:click="clearSearch()"
                  type="reset"
                  variant="danger"
                  class="ml-2"
                  >Limpar</b-button
                >
              </b-form-group-append>
            </b-input-group>
          </b-col>
        </b-row>
        <hr>
      </div>
    
    <b-table
      id="tabelaItens"
      hover
      striped
      :filter="termoPesquisa"
      @filtered="onFiltered"
      :items="estoques"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      small
    >
      <template slot="actions" slot-scope="data">
        <b-button variant="danger" @click="remove(data.item)">
          <i class="fa fa-reply"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="tabelaItens"
      first-text="Primeiro"
      prev-text="Anterior"
      next-text="Próximo"
      last-text="Último"
    >
    </b-pagination>
    </b-card>
  </div>
</template>

<script>
import { baseApiUrl, userKey } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EstoqueAdmin",
  components: { PageTitle },
  data: function() {
    return {
      termoPesquisa: null,
      mode: "save",
      perPage: 5,
      currentPage: 1,
      items: [],
      stocks: [],
      stock: {
        nf: "",
        movement: "",
      },
      stock_item: {
        stock: "",
        item: "",
        qtd: "",
      },
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "item_name", label: "Item", sortable: true },
        { key: "stock", label: "Stock", sortable: true },
        { key: "movement", label: "Movimento", sortable: true },
        { key: "qtd", label: "Quantidade", sortable: true },
        { key: "actions", label: "Desfazer" },
      ],
      options: [
        { item: 0, name: "ENTRADA" },
        { item: 1, name: "SAÍDA" },
      ],
      options_item: [],
      options_stock: [],
      estoques: [],
      optionsperpage: [
        { item: 5, name: "5" },
        { item: 10, name: "10" },
        { item: 15, name: "15" },
        { item: 20, name: "20" },
        { item: 25, name: "25" },
        { item: 30, name: "30" },
      ],
    };
  },
  validations: {
    stock: {
      nf: {
        required,
      },
      movement: {
        required,
      },
    },
    stock_item: {
      stock: {
        required,
      },
      item: {
        required,
      },
      qtd: {
        required,
      },
    },
  },
  computed: {
    rows() {
      return this.estoques.length;
    },
  },
  methods: {
    hideModal1() {
      this.$refs["modal_1"].hide();
      this.reset();
    },
    hideModal2() {
      this.$refs["modal_item"].hide();
      this.reset();
    },
    loadStocks() {
      const url = `${baseApiUrl}/stocks/`;
      axios.get(url, {
        headers: {
              'Authorization': 'JWT ' + localStorage.getItem(userKey)
        },
      }).then((res) => {
        this.stocks = res.data;
      });
    },
    loadItems() {
      const url = `${baseApiUrl}/items_total/`;
      axios.get(url, {
        headers: {
              'Authorization': 'JWT ' + localStorage.getItem(userKey)
        },
      }).then((res) => {
        this.items = res.data;
      });
    },
    loadEstoques() {
      const url = `${baseApiUrl}/totalstocks/`;
      axios.get(url, {
        headers: {
              'Authorization': 'JWT ' + localStorage.getItem(userKey)
        },
      }).then((res) => {
        this.estoques = res.data;
      });
    },
    reset() {
      this.stock_item = {};
      this.stock = {};
    },
    save_stock() {
      if (!this.$v.stock.$invalid) {
        axios
          .post(`${baseApiUrl}/addstock/`, this.stock, {
            headers: {
              'Authorization': 'JWT ' + localStorage.getItem(userKey)
            },
          })
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.loadStocks();
            this.loadItems();
            this.reset();
            this.hideModal1();
            this.$v.$reset(); 
          })
          .catch(() => {
              alert("Não foi possivel realizar a operação");
          })
      }
    },
    save_stock_item() {
      if (!this.$v.stock_item.$invalid) {
        axios
          .post(`${baseApiUrl}/additemstock/`, this.stock_item, {
            headers: {
              'Authorization': 'JWT ' + localStorage.getItem(userKey)
            },
          })
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.loadEstoques();
            this.reset();
            this.hideModal2();
            this.$v.$reset(); 
          })
          .catch(() => {
              alert("Não foi possivel realizar a operação");
          })
      }
    },
    remove(stock_item) {
      this.stock_item = { ...stock_item };
      if (confirm(`Desejar realmente deletar o stock_item ${this.stock_item.id}?`)) {
        axios
          .put(`${baseApiUrl}/deactivateitemstock/${this.stock_item.id}`, this.stock_item, {
            headers: {
              'Authorization': 'JWT ' + localStorage.getItem(userKey)
            },
          })
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.reset();
            this.loadEstoques();
          })
          .catch(() => {
              alert("Não foi possivel realizar a operação");
          })
      }
    },
    clearForm1() {
      this.stock = "";
    },
    clearForm2() {
      this.stock_item = "";
    },
    clearSearch() {
      this.termoPesquisa = "";
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  mounted() {
    this.loadEstoques();
    this.loadStocks();
    this.loadItems();
  },
};
</script>

<style></style>
