<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastrar Itens e Usuários" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Itens" active>
                        <ItemAdmin />
                    </b-tab>
                    <b-tab title="Estoque">
                        <EstoqueAdmin />
                    </b-tab>
                    <b-tab title="Usuários">
                        <UserAdmin />
                    </b-tab>
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

export default {
    name: 'AdminPages',
    components: { PageTitle, EstoqueAdmin, ItemAdmin, UserAdmin }
    
}
</script>

<style>

</style>