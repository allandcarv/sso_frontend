<template>
    <div class="admin-open-tickets ml-3 mr-3">        
        <PageTitle title="Solicitações Abertas" /> 
        <div class="solicitation-view" v-if="mode === 'view'">
            <b-row>
                <b-col cols="12" md="4">
                    <label class="solicitation-view__label">Ticket:</label>
                    <p class="solicitation-view__value">{{ solicitation.ticket }}</p>
                </b-col>
                <b-col cols="12" md="4">
                    <label class="solicitation-view__label">Data de Abertura:</label>
                    <p class="solicitation-view__value">{{ dateFormat(solicitation.opening_date) }}</p>
                </b-col>
                <b-col cols="12" md="4">
                    <label class="solicitation-view__label">Data de Expectativa:</label>
                    <p class="solicitation-view__value">{{ solicitation.expected_date ? dateFormat(solicitation.expected_date) : 'Não informado' }}</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12" md="6">
                    <label class="solicitation-view__label">Usuário:</label>
                    <p class="solicitation-view__value">{{ solicitation.userName }}</p>
                </b-col>
                <b-col cols="12" md="6">
                    <label class="solicitation-view__label">Categoria:</label>
                    <p class="solicitation-view__value">{{ solicitation.categoryName }}</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <label class="solicitation-view__label">Assunto:</label>
                    <p class="solicitation-view__value">{{ solicitation.subject }}</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <label class="solicitation-view__label">Descrição:</label>
                    <p class="solicitation-view__value">{{ solicitation.description }}</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <b-button variant="primary" class="mr-2" @click="close">Voltar</b-button>                    
                    <b-button variant="danger" @click="removeSolicitation(solicitation)">Excluir</b-button>
                </b-col>
            </b-row>
        </div>
        <div class="solicitations-table" v-else>  
            <b-row class="mb-2">
                <b-col cols="4">
                    <b-input-group>                       
                        <b-input-group-text slot="prepend" @click="filterSolicitations"><i class="fa fa-search"></i></b-input-group-text>
                        <b-form-input
                            id="open-solicitation-filter-input"
                            type="text"
                            v-model="filterInput"
                            @keyup.enter="filterSolicitations"
                            placeholder="Código da Solicitação..."
                        ></b-form-input>
                    </b-input-group>                    
                </b-col>                
            </b-row>
            <b-row>
                <b-col cols="12">
                    <b-table hover striped responsive :items="solicitations" :fields="fields" small show-empty>  
                        <template slot="ticket" slot-scope="data">
                            <span class="solicitations-table__ticket" v-b-tooltip.hover title="Visualizar" @click="loadSolicitation(data.item)" >{{ data.item.ticket }}</span>
                        </template>                                             
                        <template slot="actions" slot-scope="data">
                            <b-button variant="primary" class="mr-2 mb-2" v-b-tooltip.hover title="Visualizar" @click="loadSolicitation(data.item)">
                                <i class="fa fa-eye" />
                            </b-button>
                            <b-button variant="danger" class="mb-2" v-b-tooltip.hover title="Excluir" @click="removeSolicitation(data.item)">
                                <i class="fa fa-trash" />
                            </b-button>
                        </template>
                        <template slot="empty">Você não possui solicitações abertas...</template>
                    </b-table>
                </b-col>
            </b-row>
            <b-row class="ml-3">
                <b-col cols="12">
                    <b-pagination size="sm" v-model="page" :total-rows="count" :per-page="limit" />
                </b-col>
            </b-row>
        </div>        
    </div>    
</template>

<script>
import axios from 'axios';
import moment from 'moment';

import { baseApiUrl, showError } from '../../config/global';
import PageTitle from '../PageTitle';

export default {
    name: 'AdminOpenTickets',
    components: { PageTitle },
    props: ['tabIndex'],
    data: function() {
        return {
            mode: null,            
            solicitations: [],
            solicitation: {},
            categories: [],
            fields: [
                { key: 'ticket', label: 'Código', sortable: true },
                { key: 'subject', label: 'Assunto', sortable: true },
                { key: 'opening_date', label: 'Data de Abertura', sortable: true, formatter: 'dateFormat' },
                { key: 'expected_date', label: 'Data de Expectativa', sortable: true, formatter: 'dateFormat' },
                { key: 'userName', label: 'Usuário', sortable: true },
                { key: 'categoryName', label: 'Categoria', sortable: true },
                { key: 'actions', label: 'Ações' }
            ],   
            page: 1,
            limit: 0,
            count: 0,                    
            filterInput: null,
            confirm: false                       
        }
    },
    methods: {
        loadSolicitations() {
            const url = `${baseApiUrl}/solicitations?page=${this.page}`;
            
            axios.get(url)
                .then(res => {
                    this.solicitations = res.data.data;
                    this.limit = res.data.limit;
                    this.count = res.data.count;                    
                })
                .catch(err => showError(err.response.data.err));
                
        },
        filterSolicitations() {
            this.page = 1;
            const url = `${baseApiUrl}/solicitations?page=${this.page}&ticket=${this.filterInput}`            
            axios.get(url)
                .then(res => {
                    this.solicitations = res.data.data;
                    this.limit = res.data.limit;
                    this.count = res.data.count;                    
                })
                .catch(err => showError(err.response.data.err));
        },        
        loadSolicitation(solicitation, mode = 'view') {
            const url = `${baseApiUrl}/solicitations/${solicitation.id}`;            
            axios.get(url)
                .then(res => { 
                    this.solicitation = { ...res.data };
                    if (this.solicitation.expected_date) {
                        this.solicitation.expected_date = this.solicitation.expected_date.substring(0,10);
                    }
                    this.mode = mode;                    
                    }
                )
                .catch(err => showError(err.response.data.err));
            
        },  
        removeSolicitation(solicitation) {
                  
            this.$bvModal.msgBoxConfirm(`Você tem certeza que quer remover a solicitação ${solicitation.ticket}??`, {
                title: 'Confirmar remoção',
                okVariant: 'danger',
                okTitle: 'Sim, pode remover',
                cancelTitle: 'Não, não remover',
                hideHeaderClose: false                
                })
                .then(value => {
                    if (value) {
                        const url = `${baseApiUrl}/solicitations/${solicitation.id}`;
                    axios.delete(url)
                        .then(() => {
                            this.$toasted.global.defaultSuccess();
                            this.close();
                        })
                        .catch(err => showError(err.response.data.err))
                    }     
                })
                .catch(showError);            
        },      
        close() {
            this.solicitation = {};
            this.mode = null;
            this.loadSolicitations();
        }, 
        dateFormat(value) {
            if (value) {
                const formatedDate = new Date(value);
                return moment(formatedDate).format('DD/MM/YYYY');
            } 
            return '';
        }       
    },
    computed: {
        formatedOpenDate: function() {
            const temp = new Date(this.solicitation.opening_date);
            return moment(temp).format('DD/MM/YYYY');
        }        
    },
    watch: {
        page() {
            this.loadSolicitations();
        },
        tabIndex(newValue) {            
            if (newValue === 4) {
                this.loadSolicitations();
                this.mode = null;
            }
        }
    }    
}
</script>

<style>   
    .solicitation-view {
        padding: 12px 20px;
        border: 1px solid #ced4da;
        border-radius: .25rem;
    }

    .solicitation-view .solicitation-view__value {
        padding: 6px 12px;
        border: 1px solid #ced4da;
        border-radius: .25rem;

    }   
    
</style>
