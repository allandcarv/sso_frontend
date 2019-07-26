<template>
    <b-row no-gutters>
        <b-col>
            <div class="tabs__user">        
                <b-card class="card__user" no-body>
                    <b-tabs justified pills>
                        <b-tab active>
                            <template slot="title">
                                <i class="fa fa-pie-chart"></i>  Gráficos
                            </template>
                            <UserStats />
                        </b-tab>
                        <b-tab>
                            <template slot="title">
                                <i class="fa fa-commenting-o"></i> Nova Solicitação
                            </template>
                        </b-tab>
                        <b-tab>
                            <template slot="title">
                                <i class="fa fa-exclamation-circle"></i> Solicitações Abertas
                            </template>
                        </b-tab>
                        <b-tab>
                            <template slot="title">
                                <i class="fa fa-check-circle-o"></i> Solicitações Fechadas
                            </template>
                        </b-tab>
                    </b-tabs>
                </b-card>        
            </div>
        </b-col>
    </b-row>
</template>

<script>
import UserStats from './UserStats';

export default {
    name: 'UserHome',
    components: { UserStats }    
}
</script>

<style>
   .card__user {
      min-height: 48.7rem;
   }
</style>
