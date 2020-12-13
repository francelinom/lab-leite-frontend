import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import Vuelidate from 'vuelidate'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))

Vue.config.productionTip = false
Vue.use(Vuelidate)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')