<template>
    <div class="stats__admin">                      
        <PageTitle title="Gráfico geral de Solicitações" class="ml-3"/>        
        <div class="stats__cards ml-4 mr-4">
            <b-card-group class="cards__group" deck v-if="totalChartSeries[0] > 0 && totalChartSeries[1] > 0">                
                <b-card title="Total Geral de Solicitações" cols="12" lg="6">
                    <b-card-text class="stats__charts">        
                        <Charts width="500" type="pie" :options="totalChartOptions" :series="totalChartSeries" />                        
                    </b-card-text>
                </b-card>
                <b-card title="Solicitações por Categoria" cols="12" lg="6">
                    <b-card-text class="stats__charts">
                        <Charts width="500" type="pie" :options="categoryChartOptions" :series="categoryChartSeries" />
                    </b-card-text>
                </b-card>                
            </b-card-group>
            <div class="no-content" v-else>Você ainda não possui Solicitações...</div>
        </div>                          
    </div>
</template>

<script>
import axios from 'axios';

import PageTitle from '../PageTitle';
import Charts from '../Charts';
import { baseApiUrl } from '../../config/global';

export default {
    name: 'AdminStats',
    components: { PageTitle, Charts }, 
    props: ['tabIndex'],   
    data: function() {
        return {                        
            totalChartOptions: {               
                responsive: [{
                    breakpoint: 1200,
                    options: {
                        chart: {
                            width: 300
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }    
                }],              
                labels: ['Abertas', 'Fechadas'],
                legend: {
                    position: 'left'
                }                 
            },            
            totalChartSeries: [],
            categoryChartOptions: {
                responsive: [{
                    breakpoint: 1200,
                    options: {
                        chart: {
                            width: 300
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }    
                }],                                         
                labels: [],
                legend: {
                    position: 'left'
                }
            },
            categoryChartSeries: []
        }
    },
    methods: {
        async loadStats() {            
            const url = `${baseApiUrl}/stats/admin`;
            
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

            let userChartLabels = [];
            let userChartSeries = [];
            temp.data.byUser.forEach(u => {                
                userChartLabels.push(u.nome);
                userChartSeries.push(u.total);
            });
            this.userChartOptions = { ...this.userChartOptions, ...{
                labels: [ ...userChartLabels ]
            }};
            this.userChartSeries = [ ...userChartSeries ];
                
        }
    },     
    watch: {
        tabIndex(newValue) {
           if (newValue === 0) {
               this.loadStats();
           }
        }
    }  
}    
</script>
<style>   
    .box-column {
        box-shadow: 0px 1px 22px -12px #607d8b;
        padding: 25px 35px 25px 30px;
        max-height: 444px;
    }
    
</style>
