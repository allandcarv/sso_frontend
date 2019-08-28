<template>
    <b-row no-gutters class="oper-home">        
        <b-col>                    
            <b-card class="card__oper" no-body>
                <b-tabs justified pills v-model="tabIndex">
                    <b-tab active>
                        <template slot="title">
                            <i class="fa fa-pie-chart"></i>  Gráficos
                        </template>
                        <OperStats :tabIndex="tabIndex" />
                    </b-tab>                    
                    <b-tab>
                        <template slot="title">
                            <i class="fa fa-exclamation-circle"></i> Solicitações Abertas
                        </template>
                        <OperOpenTickets :tabIndex="tabIndex" />
                    </b-tab>
                    <b-tab>
                        <template slot="title">
                            <i class="fa fa-check-circle-o"></i> Solicitações Fechadas
                        </template>
                        <OperClosedTickets :tabIndex="tabIndex" />
                    </b-tab>
                </b-tabs>
            </b-card>            
        </b-col>
    </b-row>
</template>

<script>
import OperStats from './OperStats';
import OperOpenTickets from './OperOpenTickets';
import OperClosedTickets from './OperClosedTickets';

export default {
    name: 'OperHome',
    components: { OperStats, OperOpenTickets, OperClosedTickets },
     data: function() {
        return {
            tabIndex: null
        }
    }
}
</script>

<style>
    .oper-home,
    .oper-home .card__oper {
      height: 100%;
   } 
</style>
