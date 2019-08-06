<template>
    <div class="closed-tickets">
        <PageTitle title="Suas solicitações fechadas" class="ml-3" />
        <div class="solicitation-view ml-3 mr-3" v-if="mode === 'view'">
            <b-row>
                <b-col cols="12" md="3">
                    <label class="solicitation-view__label">Ticket:</label>
                    <p class="solicitation-view__value">{{ solicitation.ticket }}</p>
                </b-col>
                <b-col cols="12" md="3">
                    <label class="solicitation-view__label">Data de Abertura:</label>
                    <p class="solicitation-view__value">{{ dateFormat(solicitation.opening_date) }}</p>
                </b-col>
                <b-col cols="12" md="3">
                    <label class="solicitation-view__label">Data de Expectativa:</label>
                    <p class="solicitation-view__value">{{ solicitation.exp_date ? dateFormat(solicitation.exp_date) : 'Não informado' }}</p>
                </b-col>
                <b-col cols="12" md="3">
                    <label class="solicitation-view__label">Data de Fechamento:</label>
                    <p class="solicitation-view__value">{{ dateFormat(solicitation.closing_date) }}</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12" md="6">
                    <label class="solicitation-view__label">Operador:</label>
                    <p class="solicitation-view__value">{{ solicitation.operatorName }}</p>
                </b-col>
                <b-col cols="12" md="6">
                    <label class="solicitation-view__label">Categoria:</label>
                    <p class="solicitation-view__value">{{ solicitation.categoryName }}</p>
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
                    <label class="solicitation-view__label">Informação:</label>
                    <p class="solicitation-view__value">{{ solicitation.closing_text ? solicitation.closing_text : 'Sem informações adicionais...' }}</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <b-button variant="primary" class="mr-2" @click="close">Voltar</b-button>                    
                    <b-button variant="danger" @click="removeSolicitation">Excluir</b-button>
                </b-col>
            </b-row>
        </div>
        <div class="solicitations-table ml-3 mr-3" v-else>
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
                    <b-table hover striped responsive :items="solicitations" :fields="fields" small> 
                        <template slot="ticket" slot-scope="data">
                            <span class="solicitations-table__ticket" v-b-tooltip.hover title="Visualizar" @click="loadSolicitation(data.item.id, 'view')" >{{ data.item.ticket }}</span>
                        </template>                       
                        <template slot="actions" slot-scope="data">
                            <b-button variant="primary" class="mr-2 mb-2" v-b-tooltip.hover title="Visualizar" @click="loadSolicitation(data.item.id, 'view')">
                                <i class="fa fa-eye" />
                            </b-button>
                            <b-button variant="danger" class="mb-2" v-b-tooltip.hover title="Excluir" @click="removeSolicitation(data.item)">
                                <i class="fa fa-trash" />
                            </b-button>
                        </template>
                    </b-table>
                </b-col>
            </b-row>
            <b-row class="ml-3">
                <b-col cols="12">
                    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
                </b-col>
            </b-row>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

import PageTitle from '../PageTitle';
import { baseApiUrl, showError } from '../../config/global';

export default {
    name: 'UserClosedTickets',
    components: { PageTitle },
    props: ['tabIndex'],
    data: function() {
        return {
            mode: null,
            filterInput: null,
            solicitations: [],
            fields: [
                { key: 'ticket', label: 'Código', sortable: true },
                { key: 'subject', label: 'Assunto', sortable: true },
                { key: 'opening_date', label: 'Data de Abertura', sortable: true, formatter: 'dateFormat' },
                { key: 'closing_date', label: 'Data de Fechamento', sortable: true, formatter: 'dateFormat' },
                { key: 'categoryName', label: 'Categoria', sortable: true },
                { key: 'actions', label: 'Ações' }
            ],
            solicitation: {},
            page: 1,
            count: 0,
            limit: 0,
            formatedDate: {
                open: null,
                exp: null
            }
        }
    },
    methods: {
        getSolicitations() {
            const url = `${baseApiUrl}/solicitations/user/9/closed?page=${this.page}`;

            axios.get(url)
                .then(res => {
                    this.solicitations = res.data.data;
                    this.count = res.data.count;
                    this.limit = res.data.limit;
                    this.mode = null;
                })
                .catch(err => showError(err.response.data.err))
        },
        filterSolicitations() {
            this.page = 1;
            const url = `${baseApiUrl}/solicitations/user/9/closed?page=${this.page}&ticket=${this.filterInput}`            
            axios.get(url)
                .then(res => {
                    this.solicitations = res.data.data;
                    this.limit = res.data.limit;
                    this.count = res.data.count;                    
                })
                .catch(err => showError(err.response.data.err));
        },
        loadSolicitation(solicitation, mode) {
            const url = `${baseApiUrl}/solicitations/closed/${solicitation}`;

            axios.get(url)
                .then(res => {
                    this.solicitation = { ...res.data };
                    this.mode = mode;                    
                })
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
            this.getSolicitations();
        }, 
        dateFormat(value) {
            const formatedDate = new Date(value);
            return moment(formatedDate).format('DD/MM/YYYY');
        }        
    },
    watch: {
        tabIndex(newValue) {
            if (newValue === 3 ) {
                this.getSolicitations();
            }
        }
    }
}
</script>

<style>

</style>
