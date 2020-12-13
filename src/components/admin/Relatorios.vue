<template>
    <div class="acordion" role="tablist">
        <PageTitle main="Relatórios" icon="fa fa-print"/>
        <b-card header="Relatórios"   bg-variant="light">
            <div>                
                <b-button @click="updateTable()" class="fa fa-refresh" variant="success"> <span> Atualizar</span></b-button>
            </div>
            <hr>
            <b-button-group>
                <b-button v-b-toggle="'all_items'">Itens disponíveis</b-button>
                <b-button v-b-toggle="'items_minimum_stock'">Estoque Minimo</b-button>
                <b-button v-b-toggle="'items_expired'">Itens Vencidos</b-button>
                <b-button v-b-toggle="'items_near_expires'">Itens Próximos a Vencer</b-button>
                <b-button v-b-toggle="'items_history'">Histórico Geral</b-button>
            </b-button-group>                      
        </b-card>          
        <b-collapse id="all_items" accordion="my-accordion" role="tabpanel">                   
            <b-card role="tab">
                <b-button  @click="createPDF('table-all-items', 'Todos os Itens')"  variant="danger">Exportar</b-button>
                <b-table
                id="table-all-items"         
                hover
                striped
                :items="items"
                :fields="fields"
                small>                    
                </b-table>
            </b-card>
        </b-collapse>
        <b-collapse id="items_minimum_stock" accordion="my-accordion" role="tabpanel">
            <b-card role="tab">
                <b-button  @click="createPDF('table-minimum-stock','Itens em Estoque Minimo')"  variant="danger">Exportar</b-button>
                <table_item/>
                <b-table
                id="table-minimum-stock"          
                hover
                striped
                :items="items_minimum_stock"
                :fields="fields"
                small>                    
                </b-table>
            </b-card>
        </b-collapse>
        <b-collapse id="items_expired" accordion="my-accordion" role="tabpanel">
            <b-card role="tab">
                <b-button  @click="createPDF('table-expired', 'Itens Vencidos')"  variant="danger">Exportar</b-button>
                <b-table
                id="table-expired"          
                hover
                striped
                :items="itemsExpired"
                :fields="fields"
                small>                    
                </b-table>
            </b-card>
        </b-collapse>
        <b-collapse id="items_near_expires" accordion="my-accordion" role="tabpanel">
            <b-card role="tab">
                <b-button  @click="createPDF('table-near-expires', 'Itens Próximos de Vencer')"  variant="danger">Exportar</b-button>
                <b-table
                id="table-near-expires"          
                hover
                striped
                :items="itemsNearExpires"
                :fields="fields"
                small>                    
                </b-table>
            </b-card>
        </b-collapse>
         <b-collapse id="items_history" accordion="my-accordion" role="tabpanel">
            <b-card role="tab">
                <b-button  @click="createPDF('table-history', 'Itens Histórico')"  variant="danger">Exportar</b-button>
                <b-table
                id="table-history"          
                hover
                striped
                :items="itemsHistory"
                :fields="fields"
                small>                    
                </b-table>
            </b-card>
        </b-collapse>  
    </div>  
</template>

<script>
import PageTitle from '../template/PageTitle';
import {baseApiUrl, userKey} from "@/global";
import axios from "axios";
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
export default {
    name: "Relatorios",
    components: {PageTitle},
    data: function(){
        return{
            items: [],
            items_minimum_stock: [],
            itemsExpired: [],
            itemsNearExpires: [],
            itemsHistory: [],
            fields: [
            { key: "id", label: "ID", sortable: true },
            { key: "name", label: "Nome", sortable: true },
            { key: "unit", label: "Unidade", sortable: true },
            { key: "brand", label: "Marca", sortable: true },
            { key: "cost_value", label: "Preço de custo", sortable: true },
            { key: "current_inventory", label: "E. Atual", sortable: true },
            { key: "minimum_stock", label: "Estoque Mín", sortable: true },
            { key: "validaty", label: "Validade", sortable: true },
        ],
        }
        
    },        
    methods:{
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
        loadItemsMinimumStock() {
            const url = `${baseApiUrl}/items_minimum_stock/`;
            axios.get(url, {
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem(userKey)
                },
            }).then((res) => {
                this.items_minimum_stock = res.data;
            });
        },
        loadItemsexpired() {
            const url = `${baseApiUrl}/items_expired/`;
            axios.get(url, {
                headers: {
                'Authorization': 'JWT ' + localStorage.getItem(userKey)
                },
            }).then((res) => {
                this.itemsExpired = res.data;
            });
        },
        loadItemsNearExpires() {
            const url = `${baseApiUrl}/items_near_expires/`;
            axios.get(url, {
                 headers: {
                    'Authorization': 'JWT ' + localStorage.getItem(userKey)
                },
            }).then((res) => {
                this.itemsNearExpires = res.data;
            });
        },
        loadItemsHistory(){
            const url = `${baseApiUrl}/items/`;
            axios.get(url, {
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem(userKey)
                },
            }).then((res) => {
                this.itemsHistory = res.data;
            });
        },
        updateTable(){
            this.loadItems();
            this.loadItemsMinimumStock();
            this.loadItemsexpired();
            this.loadItemsNearExpires();
            this.loadItemsHistory();
        },
        createPDF(tableSelect, fileName) {
            var pdf = new jsPDF();
            pdf.autoTable({html: '#'+tableSelect});
            pdf.text(fileName, 10, 10);
            pdf.save(fileName+'.pdf');
        }
    },
    mounted() {
      this.loadItems();
      this.loadItemsMinimumStock();
      this.loadItemsexpired();
      this.loadItemsNearExpires();
      this.loadItemsHistory();
    }
}
</script>
<style>
</style>