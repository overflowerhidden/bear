import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

import '@/styles/index.scss'

import router from './router'
import store from './store'

import './permission'
import vPermission from "./directives/permission";

// 注册指令
Vue.directive("permission", vPermission);

import '@/icons'

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
