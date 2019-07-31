<template>
    <div class="stats__user">
        <PageTitle title="Gráficos baseados nas suas Solicitações" class="ml-3"/>
        <div class="stats__cards ml-4 mr-4">
            <b-card-group class="cards__group" deck>
                <b-card
                    title="Total Geral de Solicitações"                                        
                >
                    <b-card-text class="stats__charts">
                        <Charts type="donut" :options="totalChartOptions" :series="totalChartSeries" />
                    </b-card-text>
                </b-card>
                 
                <b-card
                    title="Solicitações por Categoria"                                        
                >
                    <b-card-text class="stats__charts">
                        <Charts type="donut" :options="categoryChartOptions" :series="categoryChartSeries" />
                    </b-card-text>
                </b-card>
            </b-card-group>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import PageTitle from '../PageTitle';
import Charts from '../Charts';
import { baseApiUrl } from '../../config/global';

export default {
    name: 'UserStats',
    components: { PageTitle, Charts },
    data: function() {
        return {
            totalChartOptions: {               
                responsive: [{
                    breakpoint: 1400,
                    options: {
                        chart: {
                            width: 300
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }    
                }],              
                labels: ['Abertas', 'Fechadas']                 
            },            
            totalChartSeries: [],
            categoryChartOptions: {
                responsive: [{
                    breakpoint: 1400,
                    options: {
                        chart: {
                            width: 300
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }    
                }],                                         
                labels: []
            },
            categoryChartSeries: []            
        }
    },
    methods: {
        loadStats() {
            const url = `${baseApiUrl}/stats/user`
            axios.get(url)
                .then(res => {
                    this.totalChartSeries[0] = res.data.open;
                    this.totalChartSeries[1] = res.data.closed;

                    let categoryChartLabels = [];
                    let categoryChartSeries = [];
                    res.data.byCategory.forEach(c => {                                             
                        categoryChartLabels.push(c.categoria);
                        categoryChartSeries.push(c.total);                        
                    });
                    this.categoryChartOptions = { ...this.categoryChartOptions, ...{
                        labels: [ ...categoryChartLabels ]
                    }};
                    this.categoryChartSeries = [ ...categoryChartSeries ];                    
                })
        }
    },
    mounted() {
        this.loadStats();
    }
}    
</script>
<style>   
    .cards__group .card {
        display: flex;
        align-items: center;
    }
    
</style>
