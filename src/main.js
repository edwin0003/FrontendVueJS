import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL= "http://68.183.108.32:3000/";
Vue.axios.defaults.headers.Authorization= "Bearer "+ localStorage.getItem("token")
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user: undefined,
    token: undefined
  },
  mutations: {
    setuser (state, data) {
      state.user= data
    },
    settoken(state, data){
      state.token=data
    },
    deletetoken(state){
      state.token= undefined
    }

  }
})
if(localStorage.getItem("token")){
  store.commit("settoken", localStorage.getItem('token'))
}
new Vue({
  vuetify,
  router,
  render: h => h(App),
  store: store,

}).$mount('#app')
