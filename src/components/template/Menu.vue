<template>
    <aside class="menu" v-show="!isMenuVisible">        
        <hr>        
        <a href="/">
            <b-img class="imagem-lab-leite"
                fluid alt="..."
                :src="require('../../assets/labLeite.png')"                 
                width=130px
                center>                
            </b-img>
        </a>
        <hr>        
        <div class="menu">        
            <a class="menu-link" href="/">                      
                <i class="fa fa-fw fa-home"></i>
                <span class="spanText">Inicio</span>
            </a>                           
            <a class="menu-link" href="/admin/itemAdmin">
                <i class="fa fa-fw fa-cube"></i>
                <span class="spanText">Gerenciar Item</span>
            </a>
            <a class="menu-link" href="/admin/EstoqueAdmin">
                <i class="fa fa-fw fa-cubes"></i>
                <span class="spanText">Gerenciar Estoque</span>
            </a>
            <a class="menu-link" href="/admin/UserAdmin" >
                <i class="fa fa-fw fa-users"></i>
                <span class="spanText">Gerenciar Usuários</span>
            </a>
            <a class="menu-link" href="/admin/Relatorios">
                <i class="fa fa-fw fa-print"></i>                
                <span class="spanText">Relatorios</span>
            </a>            
        </div>                                                                                                                                
    </aside>        
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Menu',
    computed: mapState(['isMenuVisible']),     
}
</script>

<style type="text/css">
    .menu {        
        grid-area: menu;
        background: #E0E0E0;               
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;      
    }
    .menu-link{
        font-size: 140%;
        text-decoration:none;
        cursor: default;        
        border-left: 5px solid #3D5AFE;             
    }
    .menu-link:hover{
        background:  #ffffff;
        color: #000000;              
        text-decoration:none;
        border-left: 5px solid #0dc51d;        
        
    }
    .spanText{
        font-family: Verdana, Geneva, Tahoma, sans-serif
    }
  
    .fa-home {
        margin-left: 7px;
        margin-right: 7px;
        margin-top: 7px;
        color: #111111;
    }
    .fa-cube {
        margin-left: 7px;
        margin-right: 7px;
        margin-top: 7px;
        color: #30c403;
    }
    .fa-cubes{
        margin-left: 7px;
        margin-right: 7px;
        margin-top: 7px;
        color: #df460a;
    }
    .fa-users{
        margin-left: 7px;
        margin-right: 7px;
        margin-top: 7px;
        color: #fa0694;
    }
    .fa-print{
        margin-left: 7px;
        margin-right: 7px;
        margin-top: 7px;
        color: #fc0000
    }
    
  </style>