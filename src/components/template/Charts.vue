<template>
    <VueApexCharts width="600" :type="type" :options="options" :series="series" />
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
    name: 'Charts',
    components: { VueApexCharts },
    props: ['type', 'series', 'options']
}
</script>

<style>

</style>
