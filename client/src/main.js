import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import {store} from "./store/store"
import router from "./routes/router"
new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
