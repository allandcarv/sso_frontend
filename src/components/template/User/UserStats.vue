<template>
    <div class="stats__user">
        <PageTitle title="Gráficos baseados nas suas Solicitações" />
        <div class="stats__cards">
            <b-card-group class="cards__group" deck>
                <b-card
                    title="Total Geral de Solicitações"                                        
                >
                    <b-card-text>
                        <Charts type="donut" :options="pieOptions" :series="pieSeries" />
                    </b-card-text>
                </b-card>
                 
                <b-card
                    title="Solicitações por Categoria"                                        
                >
                    <b-card-text>
                        <Charts type="bar" :options="barOptions" :series="barSeries" />
                    </b-card-text>
                </b-card>
            </b-card-group>
            
        </div>
    </div>
</template>

<script>
import PageTitle from '../PageTitle';
import Charts from '../Charts';

export default {
    name: 'UserStats',
    components: { PageTitle, Charts },
    data: function() {
        return {
            pieOptions: {               
                labels: ['Abertas', 'Fechadas']                 
            },            
            pieSeries: [23, 11],
            barOptions: {
                chart: {
                    id: 'graficos-por-categoria'
                }, 
                dataLabels: {
                    enabled: false
                },                         
                xaxis: {
                    categories: ['Informática', 'Serviços Complementares']
                }                         
            },
            barSeries: [{
                name: 'Abertas',
                data: [2, 8]
            }, {
                name: 'Fechadas',
                data: [5, 3]
            }]
        }
    }
}    
</script>

<style>       
  .cards__group {
      padding: 20px;
  }
    
</style>
