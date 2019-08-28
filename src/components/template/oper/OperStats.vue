<template>
    <div class="stats__user ml-4 mr-4">                      
        <PageTitle title="Gráficos baseados nas suas Solicitações" />        
        <div class="stats__cards">
            <b-card-group class="cards__group" deck v-if="totalChartSeries[0] > 0 && totalChartSeries[1] > 0">
                <b-card
                    title="Total Geral de Solicitações"                                        
                >
                    <b-card-text class="stats__charts">        
                        <Charts width="400" type="pie" :options="totalChartOptions" :series="totalChartSeries" />                        
                    </b-card-text>
                </b-card>
                 
                <b-card
                    title="Solicitações por Categoria"                                        
                >
                    <b-card-text class="stats__charts">
                        <Charts width="400" type="pie" :options="categoryChartOptions" :series="categoryChartSeries" />
                    </b-card-text>
                </b-card>

                <b-card
                    title="Solicitações por Usuário"                                        
                >
                    <b-card-text class="stats__charts">
                        <Charts width="400" type="pie" :options="userChartOptions" :series="userChartSeries" />
                    </b-card-text>
                </b-card>
            </b-card-group>
            <div class="no-content" v-else>Você ainda não possui Solicitações...</div>
        </div>                
    </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

import PageTitle from '../PageTitle';
import Charts from '../Charts';
import { baseApiUrl, showError } from '../../config/global';

export default {
    name: 'OperStats',
    props: ['tabIndex'],
    components: { Charts, PageTitle },
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
                labels: ['Abertas', 'Fechadas'],
                legend: {
                    position: 'bottom'
                }                 
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
                labels: [],
                legend: {
                    position: 'bottom'
                }
            },
            categoryChartSeries: [],
            userChartOptions: {
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
                labels: [],
                legend: {
                    position: 'bottom'
                }
            },
            userChartSeries: []
        }
    },
    methods: {
        async loadStats() {            
            const url = `${baseApiUrl}/stats/operator/${this.user.oper}`;
            
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
                userChartLabels.push(u.usuario);
                userChartSeries.push(u.total);
            });
            this.userChartOptions = { ...this.userChartOptions, ...{
                labels: [ ...userChartLabels ]
            }};
            this.userChartSeries = [ ...userChartSeries ];            
        }
    },
    computed: mapState(['user']),     
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

</style>