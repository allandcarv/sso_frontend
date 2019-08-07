<template>
  <div id="app">
    <Header title="Sistema de Solicitações Online" :authScreen="!user" />
    <Loading v-if="validatingToken" />
    <Content v-else />
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

import { baseApiUrl, userKey } from './components/config/global';
import Header from './components/template/Header';
import Content from './components/template/Content';
import Footer from './components/template/Footer';
import Loading from './components/template/Loading';

export default {
  name: 'app',
  components: {
    Header,
    Content,
    Footer,
    Loading
  },
  data: function() {
    return {
      validatingToken: true
    }
  },
  methods: {
    async validateToken() {
      const url = `${baseApiUrl}/validateToken`;
      this.validatingToken = true;

      const userData = JSON.parse(localStorage.getItem(userKey));      
      this.$store.commit('setUser', null);

      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: 'auth' });
        return;
      }

      const res = await axios.post(url, userData);      

      if (res.data) {        
        this.$store.commit('setUser', userData);
      } else {        
        localStorage.removeItem(userKey);
        this.$router.push({ name: 'auth' });
      }

      this.validatingToken = false;
    }
  },
  computed: mapState(['user']),
  created() {
    this.validateToken();
  }
}
</script>

<style>
  * {
    font-family: 'Oxygen', sans-serif;
  }
    
  #app {
    display: grid;
    grid-template-rows: 60px 1fr 60px;
    grid-template-columns: 1fr;
    grid-template-areas: 
      "header"
      "content"
      "footer";

    height: 100vh;    
  }

</style>
