<template>
    <b-row no-gutters class="user-stats">        
        <b-col>                    
            <b-card class="card__user" no-body>
                <b-tabs justified pills v-model="tabIndex">
                    <b-tab active>
                        <template slot="title">
                            <i class="fa fa-pie-chart"></i>  Gráficos
                        </template>
                        <UserStats :tabIndex="tabIndex" />
                    </b-tab>
                    <b-tab>
                        <template slot="title">
                            <i class="fa fa-commenting-o"></i> Nova Solicitação
                        </template>
                        <UserNewTicket />
                    </b-tab>
                    <b-tab>
                        <template slot="title">
                            <i class="fa fa-exclamation-circle"></i> Solicitações Abertas
                        </template>
                        <UserOpenTickets :tabIndex="tabIndex" />
                    </b-tab>
                    <b-tab>
                        <template slot="title">
                            <i class="fa fa-check-circle-o"></i> Solicitações Fechadas
                        </template>
                        <UserClosedTickets :tabIndex="tabIndex" />
                    </b-tab>
                </b-tabs>
            </b-card>            
        </b-col>
    </b-row>
</template>

<script>
import UserStats from './UserStats';
import UserNewTicket from './UserNewTicket';
import UserOpenTickets from './UserOpenTickets';
import UserClosedTickets from './UserClosedTickets';

export default {
    name: 'UserHome',
    components: { UserStats, UserNewTicket, UserOpenTickets, UserClosedTickets },
    data: function() {
        return {
            tabIndex: null
        }
    }    
}
</script>

<style>
    .user-stats,
    .user-stats .card__user {
      height: 100%;
   }    

   
</style>
