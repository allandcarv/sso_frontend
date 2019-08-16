<template>
    <div class="departments-admin ml-3 mr-3">                          
        <PageTitle title="Administração de Departamentos" />
        <b-form class="departments-form" v-if="show">                            
            <b-row>
                <input id="department-id" type="hidden" v-model="department.id" />
                <b-col cols="12" md="6">
                    <b-form-group id="department-name-group" label="Nome do Departamento:" label-for="department-name-input">
                        <b-form-input id="department-name-input" type="text" v-model="department.name" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                    <b-form-group id="department-initials-group" label="Iniciais do Departamento" label-for="department-initials-input">
                        <b-form-input id="department-initials-input" type="text" v-model="department.initials" maxlength="3" required></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-button variant="primary" v-if="mode === 'save'" @click="saveDepartment">Salvar</b-button>
                    <b-button variant="warning" v-else @click="updateDepartment">Editar</b-button>
                    <b-button variant="secondary" class="ml-2" @click="clear">Cancelar</b-button>
                </b-col>
            </b-row>           
        </b-form>
        <b-row class="ml-2 mt-3 mr-2">            
            <b-table hover striped responsive :items="departments" :fields="fields" small show-empty>                         
                <template slot="actions" slot-scope="data">
                    <b-button variant="warning" class="mr-2 mb-2" v-b-tooltip.hover title="Editar" @click="loadDepartment(data.item)">
                        <i class="fa fa-pencil" />
                    </b-button>
                    <b-button variant="danger" class="mb-2" v-b-tooltip.hover title="Excluir" @click="removeDepartment(data.item)">
                        <i class="fa fa-trash" />
                    </b-button>
                </template>
                <template slot="empty">Você não possui solicitações abertas...</template>
            </b-table>            
        </b-row>
        <b-row class="ml-3">
            <b-col cols="12">
                <b-pagination size="sm" v-model="page" :total-rows="count" :per-page="limit" />
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from 'axios';

import PageTitle from '../PageTitle';
import { baseApiUrl, showError } from '../../config/global';

export default {
    name: 'AdminDepartments',
    components: { PageTitle },
    props: [ 'tabIndex' ],
    data: function() {
        return {
            show: true,
            mounted: false,
            mode: 'save',
            department: {},
            departments: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'initials', label: 'Iniciais', sortable: true },                
                { key: 'name', label: 'Departamento', sortable: true },
                { key: 'actions', label: 'Ações' }
            ],  
            page: 1,
            count: 0,
            limit: 0
        }
    },
    methods: {
        async loadDepartments() {
            const url = `${baseApiUrl}/departments?page=${this.page}`;

            const temp = await axios.get(url);

            this.departments = temp.data.data;
            this.count = temp.data.count;
            this.limit = temp.data.limit;
        },
        async loadDepartment(department) {
            const url = `${baseApiUrl}/departments/${department.id}`;

            const temp = await axios.get(url);
            this.department = { ...temp.data };

            this.mode = 'edit';
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        saveDepartment() {
            const url = `${baseApiUrl}/departments`;

            axios.post(url, this.department)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.clear();
                    this.loadDepartments();
                    })
                .catch(err => showError(err.response.data.err));
        },
        removeDepartment(department) {
            this.$bvModal.msgBoxConfirm(`Você tem certeza que quer remover o departamento ${department.name}??`, {
                title: 'Confirmar remoção',
                okVariant: 'danger',
                okTitle: 'Sim, pode remover',
                cancelTitle: 'Não, não remover',
                hideHeaderClose: false                
            })
                .then(value => {
                    if (value) {
                        const url = `${baseApiUrl}/departments/${department.id}`;
                    axios.delete(url)
                        .then(() => {
                            this.$toasted.global.defaultSuccess();
                            this.clear();
                            this.loadDepartments();
                        })
                        .catch(err => showError(err.response.data.err))
                    }     
                })
                .catch(showError);            
                             
        },
        updateDepartment() {
            const url = `${baseApiUrl}/departments/${this.department.id}`;
            
            axios.put(url, this.department)
                .then(() => { 
                    this.$toasted.global.defaultSuccess();
                    this.clear();
                    this.loadDepartments();
                })
                .catch(err => showError(err.response.data.err));           
        },
        clear() {
            this.mode = 'save',
            this.department = {};
            this.show = false;
            this.$nextTick(() => this.show = true)
        }
    },
    watch: {
        tabIndex(newValue) {
            if (newValue === 1) {
                this.loadDepartments();
            }
        },
        page() {
            this.loadDepartments();
        }
    }
}
</script>

<style>
    .departments-admin .departments-form {
        border: 1px solid rgba(0,0,0,.125);        
        border-radius: 5px;
        padding: 20px;  
    }
</style>
