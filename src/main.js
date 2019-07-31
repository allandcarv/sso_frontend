import Vue from 'vue';
import App from './App.vue';

import 'font-awesome/css/font-awesome.min.css'; 
import './components/config/bootstrap';
import './components/config/toasted';
import store from './components/config/store';
import router from './components/config/router';

Vue.config.productionTip = false;

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwibmFtZSI6Ill1cmkgR2FnYXJpbiIsImVtYWlsIjoieXVyaUBhc3Ryb25hdXRhLmNvbSIsIm9wZXJhdG9yIjoyLCJhZG1pbiI6MCwiaWF0IjoxNTY0NTAyODE4LCJleHAiOjE1NjQ1ODkyMTh9.Ps4bJu-oPNeZSGIQ8IiIPfCxvcTtkO182r_Bnd1slRg';

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
