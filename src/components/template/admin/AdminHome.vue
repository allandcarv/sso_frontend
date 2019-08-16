<template>
    <b-row no-gutters class="admin-home">        
        <b-col>                    
            <b-card class="card__admin" no-body>
                <b-tabs justified pills v-model="tabIndex">
                    <b-tab active>
                        <template slot="title">
                            <i class="fa fa-pie-chart"></i>  Gráficos
                        </template>
                        <AdminStats :tabIndex="tabIndex" />
                    </b-tab>
                    <b-tab>
                        <template slot="title">
                            <i class="fa fa-sitemap"></i> Departamentos
                        </template>
                        <AdminDepartments :tabIndex="tabIndex" />
                    </b-tab>
                    <b-tab>
                        <template slot="title">
                            <i class="fa fa-users"></i> Usuários
                        </template>
                        <AdminUsers :tabIndex="tabIndex" />
                    </b-tab>
                    <b-tab>
                        <template slot="title">
                            <i class="fa fa-tags"></i> Categorias
                        </template>
                        <AdminCategories :tabIndex="tabIndex" />
                    </b-tab>
                    <b-tab>
                        <template slot="title">
                            <i class="fa fa-exclamation-circle"></i> Solicitações Abertas
                        </template>
                        <AdminOpenTickets :tabIndex="tabIndex" />
                    </b-tab>
                    <b-tab>
                        <template slot="title">
                            <i class="fa fa-check-circle-o"></i> Solicitações Fechadas
                        </template>
                        <AdminClosedTickets :tabIndex="tabIndex" />
                    </b-tab>
                </b-tabs>
            </b-card>            
        </b-col>
    </b-row>
</template>

<script>
import AdminStats from './AdminStats';
import AdminDepartments from './AdminDepartments';
import AdminUsers from './AdminUsers';
import AdminCategories from './AdminCategories';
import AdminOpenTickets from './AdminOpenTickets';
import AdminClosedTickets from './AdminClosedTickets';

export default {
    name: 'AdminHome',
    components: { AdminStats, AdminDepartments, AdminUsers, AdminCategories, AdminOpenTickets, AdminClosedTickets },
    data: function() {
        return {
            tabIndex: null
        }
    }
}
</script>

<style>
    .admin-home,
    .admin-home .card__admin {
      height: 100%;
   }   
</style>
