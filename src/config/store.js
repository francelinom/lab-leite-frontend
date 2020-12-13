import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        user: {
            username: ''
        }
    },
    mutations: {
        toggleMenu(state, isVisible){
            if(isVisible === undefined){
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user){
            if(user !== null){
                state.user = user
            }else{
                state.user = {}
            }
        }
    }
})