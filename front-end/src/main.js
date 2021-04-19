import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false

let data = {
  
  jobs: [],
  saved_jobs: [],
  my_applications: [],
  users: [],
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')