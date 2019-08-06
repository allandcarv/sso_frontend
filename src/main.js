import Vue from 'vue';
import App from './App.vue';

import 'font-awesome/css/font-awesome.min.css'; 
import './components/config/bootstrap';
import './components/config/toasted';
import store from './components/config/store';
import router from './components/config/router';

Vue.config.productionTip = false;

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwibmFtZSI6Ill1cmkgR2FnYXJpbiIsImVtYWlsIjoieXVyaUBhc3Ryb25hdXRhLmNvbSIsImRlcGFydG1lbnQiOjIsImFkbWluIjowLCJpYXQiOjE1NjUxMTA2NDEsImV4cCI6MTU2NTE5NzA0MX0.30AbIwn0E0YPNbJ76cu07OtM5JcdZ3Ig9pr_hX2khXU';

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
