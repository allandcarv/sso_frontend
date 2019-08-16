<template>
    <div class="stats__user">                   
        <PageTitle title="Gráficos baseados nas suas Solicitações" class="ml-3"/>        
        <div class="stats__cards ml-4 mr-4">
            <b-card-group class="cards__group" deck v-if="totalChartSeries[0] > 0 && totalChartSeries[1] > 0">
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
            <div class="no-content" v-else>Você ainda não possui Solicitações...</div>
        </div>                
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import PageTitle from '../PageTitle';
import Charts from '../Charts';
import { baseApiUrl } from '../../config/global';

export default {
    name: 'UserStats',
    components: { PageTitle, Charts }, 
    props: ['tabIndex'],   
    data: function() {
        return {  
            mounted: false,          
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
        async loadStats() {            
            const url = `${baseApiUrl}/stats/user/${this.user.id}`;

            const temp = await axios.get(url);

            this.totalChartSeries = [ temp.data.open, temp.data.closed ]; 
            
            let categoryChartLabels = [];
            let categoryChartSeries = [];
            temp.data.byCategory.forEach(c => {
               categoryChartLabels.push(c.categoria);
               categoryChartSeries.push(c.total);
            });

            this.categoryChartOptions = { ...this.categoryChartOptions, ...{
                labels: [ ...categoryChartLabels ]
            }};

            this.categoryChartSeries = [ ...categoryChartSeries ];            
        }
    }, 
    computed: mapState(['user']),   
    watch: {
        tabIndex(newValue) {
           if (newValue === 0 && this.mounted === true) {
               this.loadStats();
           }

           if (this.mounted === false) this.mounted = true; 
        }
    }, mounted() {
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
