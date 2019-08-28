<template>
    <div class="oper-closed-tickets ml-3 mr-3">                      
        <PageTitle title="Solicitações fechadas" />                     
        <div class="solicitation-view" v-if="mode === 'view'">
            <b-row>
                <b-col cols="12" md="3">
                    <label class="solicitation-view__label">Ticket:</label>
                    <p class="solicitation-view__value">{{ solicitation.ticket }}</p>
                </b-col>
                <b-col cols="12" md="3">
                    <label class="solicitation-view__label">Usuário:</label>
                    <p class="solicitation-view__value">{{ solicitation.userName }}</p>
                </b-col>
                <b-col cols="12" md="3">
                    <label class="solicitation-view__label">Categoria:</label>
                    <p class="solicitation-view__value">{{ solicitation.categoryName }}</p>
                </b-col>
                <b-col cols="12" md="3">
                    <label class="solicitation-view__label">Operador:</label>
                    <p class="solicitation-view__value">{{ solicitation.operatorName }}</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12" md="3">
                    <label class="solicitation-view__label">Data de Abertura:</label>
                    <p class="solicitation-view__value">{{ dateFormat(solicitation.opening_date) }}</p>
                </b-col>
                <b-col cols="12" md="3">
                    <label class="solicitation-view__label">Data de Expectativa:</label>
                    <p class="solicitation-view__value">{{ solicitation.expected_date ? dateFormat(solicitation.expected_date) : 'Não informado' }}</p>
                </b-col>
                <b-col cols="12" md="3">
                    <label class="solicitation-view__label">Data de Fechamento:</label>
                    <p class="solicitation-view__value">{{ dateFormat(solicitation.closing_date) }}</p>
                </b-col>
            </b-row>
            <b-row>                
                <b-col cols="12">
                    <label class="solicitation-view__label">Assunto:</label>
                    <p class="solicitation-view__value">{{ solicitation.subject }}</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <label class="solicitation-view__label">Descrição:</label>
                    <p class="solicitation-view__value">{{ solicitation.description }}</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <label class="solicitation-view__label">Atendimento:</label>
                    <p class="solicitation-view__value">{{ solicitation.closing_text || 'Sem mensagens adicionais...' }}</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">                                       
                    <b-button variant="primary" class="mr-2" @click="clear">Voltar</b-button>
                </b-col>
            </b-row>
        </div>
        <div class="solicitations-table" v-else>  
            <div class="search-input ml-3 mr-3 mb-3">
                <b-row>
                    <b-col cols="4">
                        <b-input-group>                       
                            <b-input-group-text slot="prepend" @click="filterSolicitations"><i class="fa fa-search"></i></b-input-group-text>
                            <b-form-input
                                id="solicitation-filter-input"
                                type="text"
                                v-model="filterInput"
                                @keyup.enter="filterSolicitations"
                                placeholder="Código da Solicitação..."
                            ></b-form-input>
                        </b-input-group>                    
                    </b-col>                
                </b-row>
            </div>          
            <b-row>
                <b-col cols="12">
                    <b-table hover striped responsive :items="solicitations" :fields="fields" small show-empty> 
                        <template slot="ticket" slot-scope="data">
                            <span class="solicitations-table__ticket" v-b-tooltip.hover title="Visualizar" @click="loadSolicitation(data.item)" >{{ data.item.ticket }}</span>
                        </template>                       
                        <template slot="actions" slot-scope="data">                            
                            <b-button variant="primary" class="mb-2" v-b-tooltip.hover title="Visualizar" @click="loadSolicitation(data.item)">
                                <i class="fa fa-eye" />
                            </b-button>
                        </template>
                        <template slot="empty">Sem solicitações fechadas...</template>
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
import { mapState } from 'vuex';

import { baseApiUrl, showError } from '../../config/global';
import PageTitle from '../PageTitle';

export default {
    name: 'OperOpenTickets',
    components: { PageTitle },
    props: ['tabIndex'],
    data: function() {
        return {
            mode: String,            
            solicitations: [],
            solicitation: {},            
            fields: [
                { key: 'ticket', label: 'Código', sortable: true },
                { key: 'subject', label: 'Assunto', sortable: true },
                { key: 'opening_date', label: 'Data de Abertura', sortable: true, formatter: 'dateFormat' },
                { key: 'expected_date', label: 'Data de Expectativa', sortable: true, formatter: 'dateFormat' },
                { key: 'closing_date', label: 'Data de Fechamento', sortable: true, formatter: 'dateFormat' },
                { key: 'userName', label: 'Usuário', sortable: true },
                { key: 'categoryName', label: 'Categoria', sortable: true },
                { key: 'actions', label: 'Ações' }
            ],   
            page: 1,
            limit: 0,
            count: 0,                    
            filterInput: null                           
        }
    },
    methods: {
        loadSolicitations() {
            const url = `${baseApiUrl}/solicitations/department/${this.user.oper}/closed?page=${this.page}`;
            
            axios.get(url)
                .then(res => {
                    this.solicitations = res.data.data;
                    this.limit = res.data.limit;
                    this.count = res.data.count;
                    this.mode = null;
                })
                .catch(err => showError(err.response.data.err));
                
        },
        filterSolicitations() {            
            this.page = 1;
            const url = `${baseApiUrl}/solicitations/department/${this.user.oper}?page=${this.page}&ticket=${this.filterInput}`            
            axios.get(url)
                .then(res => {
                    this.solicitations = res.data.data;
                    this.limit = res.data.limit;
                    this.count = res.data.count;                    
                })
                .catch(err => showError(err.response.data.err));
        },        
        loadSolicitation(solicitation, mode = 'view') {
            const url = `${baseApiUrl}/solicitations/closed/${solicitation.id}`;            
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
        closeSolicitation(solicitation) {                  
            this.$bvModal.msgBoxConfirm(`Você tem certeza que quer finalizar a solicitação ${solicitation.ticket}??`, {
                title: 'Confirmar finalização',
                okVariant: 'primary',
                okTitle: 'Sim, pode finalizar',
                cancelTitle: 'Não, não finalizar',
                hideHeaderClose: false                
                })
                .then(value => {
                    if (value) {
                        const url = `${baseApiUrl}/solicitations/${solicitation.id}/close`;
                    axios.put(url, solicitation)
                        .then(() => {
                            this.$toasted.global.defaultSuccess();
                            this.clear();
                        })
                        .catch(err => showError(err.response.data.err))
                    }     
                })
                .catch(showError);            
        },      
        clear() {
            this.solicitation = {};
            this.mode = null;
            this.loadSolicitations();
        }, 
        dateFormat(value) {
            if (value) {
                const formatedDate = new Date(value);
                return moment(formatedDate).format('DD/MM/YYYY');
            } 
            return 'Não informado';
        }       
    },
    computed: {
        formatedOpenDate: function() {
            //const temp = new Date(this.solicitation.opening_date);
            const temp = this.solicitation.opening_date;
            return temp.substring(0, 10);
        },
        formatedExpDate: function() {
            const temp = new Date(this.solicitation.opening_date) || null;
            return ( temp ? moment(temp).format('DD/MM/YYYY') : 'Não informado' );
        },
        ...mapState(['user'])
    },
    watch: {
        page() {
            this.loadSolicitations();
        },
        tabIndex(newValue) {            
            if (newValue === 2) {
                this.loadSolicitations();
            }
        }
    }    
}
</script>

<style>   
    .solicitations-table__ticket {
        cursor: pointer;
    }

    .solicitation-view .solicitation-view__value {
        padding: 6px 12px;
        border: 1px solid #ced4da;
        border-radius: .25rem;

    }   
    
</style>
