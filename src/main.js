import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import icon from './components/Shared/icons'
import CKEditor from 'ckeditor4-vue';

Vue.use( CKEditor );

Vue.config.productionTip = false
Vue.component('icon', icon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
