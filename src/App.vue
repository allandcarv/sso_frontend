<template>
  <div id="app">
    <Header title="Sistema de Solicitações Online" />
    <Content />
    <Footer />
  </div>
</template>

<script>
import Header from './components/template/Header';
import Content from './components/template/Content';
import Footer from './components/template/Footer';

export default {
  name: 'app',
  components: {
    Header,
    Content,
    Footer
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
