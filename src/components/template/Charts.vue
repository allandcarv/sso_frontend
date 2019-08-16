<template>
    <VueApexCharts :width="width" :type="type" :options="options" :series="series" />
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
    name: 'Charts',
    components: { VueApexCharts },
    props: ['width', 'type', 'series', 'options']
}
</script>

<style>

</style>
