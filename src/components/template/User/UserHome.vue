<template>
    <div class="tabs">
        <b-tabs fill>
            <b-tab active>
                <template slot="title">
                    <i class="fa fa-pie-chart"></i> Gráficos
                </template>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="fa fa-comment"></i> Nova Solicitação
                </template>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="fa fa-exclamation-circle"></i> Solicitações Abertas
                </template>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="fa fa-smile-o"></i> Solicitações Fechadas
                </template>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
export default {
    name: 'UserHome'    
}
</script>

<style>
    .tabs a,
    .tabs a:hover {
        text-decoration: none;
        color: #212C7C
    }
</style>
