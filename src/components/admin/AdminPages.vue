<template>
    <div class="admin-pages d-flex flex-column flex-row">
        <PageTitle icon="arrow-up-righ-square" main="Administração do Sistema"
            sub="Cadastrar Itens e Usuários" />
        <div class="admin-pages-tabs">
            <b-card no-body>            
                <b-tabs card pills vertical>
                    <div class="shadow p-3 mb-5 bg-white rounded">
                    <b-tab title="Itens">                     
                        <ItemAdmin />
                    </b-tab>
                    <b-tab title="Estoque">
                        <EstoqueAdmin/>
                    </b-tab>
                    <b-tab title="Usuários">
                        <UserAdmin />
                    </b-tab>
                    <b-tab title="Relatórios">
                        <Relatorios/>
                    </b-tab>
                    </div>
                </b-tabs>
            </b-card>
        </div>       
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import EstoqueAdmin from './EstoqueAdmin'
import ItemAdmin from './ItemAdmin'
import UserAdmin from './UserAdmin'
import Relatorios from './Relatorios'

export default {
    name: 'AdminPages',
    components: { PageTitle, EstoqueAdmin, ItemAdmin, UserAdmin, Relatorios }
    
}
</script>

<style>

</style>