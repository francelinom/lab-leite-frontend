import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/home/Home'
import ItemAdmin from '@/components/admin/ItemAdmin'
import EstoqueAdmin from '@/components/admin/EstoqueAdmin'
import UserAdmin from '@/components/admin/UserAdmin'
import Relatorios from '@/components/admin/Relatorios'
import Auth from '@/components/auth/Auth'

import {isSignedIn} from '../auth/auth';

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    history: true,
    routes: [
        {
            name: 'auth',
            path: '/auth',
            component: Auth
        },
       {
            path: '/',
            component: Home,
            beforeEnter (_, __, next){
                if(isSignedIn()){
                    next();
                    return
                }
                next('/auth')
            },
        },
        {
            path: '/admin/Relatorios',
            component: Relatorios,
            beforeEnter (_, __, next){
                if(isSignedIn()){
                    next();
                    return
                }
                next('/auth')
            }
        },
        {
            path: '/admin/ItemAdmin',
            component: ItemAdmin,
            meta: {
                permission: 'adm'
            },        
            beforeEnter (_, __, next) {
                if(isSignedIn()){
                    next();
                    return;
                }
                next('/auth')               
            }
        },
        {
            path: '/admin/EstoqueAdmin',
            component: EstoqueAdmin,
            beforeEnter (_, __, next) {
                if(isSignedIn()){
                    next();
                    return;
                }
                next('/auth')               
            }
        },
        {
            path: '/admin/UserAdmin',
            component: UserAdmin,
            beforeEnter (_, __, next) {
                if(isSignedIn()){
                    next();
                    return;
                }
                next('/auth')               
            }
        },
    ]
})