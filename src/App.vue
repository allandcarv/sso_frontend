<template>
  <div id="app">
    <Header title="Sistema de Solicitações Online" hideUserDropDown="false" />
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
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    font-family: 'Oxygen', sans-serif;
  }

  #app {
    display: grid;
    grid-template-rows: 80px 1fr 80px;
    grid-template-columns: 1fr;
    grid-template-areas: 
      "header"
      "content"
      "footer";

    height: 100vh;
  }

</style>
