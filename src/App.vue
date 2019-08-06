<template>
  <div id="app">
    <Header title="Sistema de Solicitações Online" :authScreen="!user" />
    <Content />
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from './components/template/Header';
import Content from './components/template/Content';
import Footer from './components/template/Footer';

export default {
  name: 'app',
  components: {
    Header,
    Content,
    Footer
  },
  computed: 
    mapState(['user'])  
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
