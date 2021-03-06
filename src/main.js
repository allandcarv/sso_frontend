import Vue from 'vue';
import App from './App.vue';

import 'font-awesome/css/font-awesome.min.css'; 
import './components/config/bootstrap';
import './components/config/toasted';
import './components/config/axios';
import store from './components/config/store';
import router from './components/config/router';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
