<template>
    <div class="users-admin ml-3 mr-3"> 
                                   
        <PageTitle title="Administração de Usuários" />
        <b-form class="users-form" v-if="show">            
            <b-row>
                <input id="user-id" type="hidden" v-model="user.id" />
                <b-col cols="12" md="4">
                    <b-form-group id="user-name-group" label="Nome do Usuário:" label-for="user-name-input">
                        <b-form-input id="user-name-input" type="text" v-model="user.name" required autocomplete="off"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                    <b-form-group id="user-email-group" label="E-mail do Usuário:" label-for="user-email-input">
                        <b-form-input id="user-email-input" type="email" v-model="user.email" required autocomplete="off"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                    <b-form-group id="user-department-group" label="Departamento do Usuário:" label-for="user-department-input">
                        <b-form-select id="user-department-input" v-model="user.department_id" :options="departments" required>
                            <template slot="first">
                                <option :value="null" disabled>Selecione o Departamento...</option>
                            </template>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12" md="4">
                    <b-form-group id="user-password-group" label="Senha:" label-for="user-password-input">
                        <b-form-input id="user-password-input" type="password" v-model="user.password" :required="mode === 'save'"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                    <b-form-group id="user-confirm-password-group" label="Confirmação de Senha:" label-for="user-confirm-password-input">
                        <b-form-input id="user-confirm-password-input" type="password" v-model="user.confirmPassword" :required="mode === 'save'"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="4">                            
                    <b-form-checkbox id="user-admin-checkbox" class="mt-5" v-model="user.admin" name="isAdmin" value="1" unchecked-value="0">Administrador?</b-form-checkbox>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-button variant="primary" v-if="mode === 'save'" @click="saveUser">Salvar</b-button>
                    <b-button variant="warning" v-else @click="updateUser">Editar</b-button>
                    <b-button variant="secondary" class="ml-2" @click="clear">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>        
    
        <b-row class="ml-2 mt-3 mr-2">            
            <b-table hover striped responsive :items="users" :fields="fields" small show-empty>                         
                <template slot="actions" slot-scope="data">
                    <b-button variant="warning" class="mr-2 mb-2" v-b-tooltip.hover title="Editar" @click="loadUser(data.item)">
                        <i class="fa fa-pencil" />
                    </b-button>
                    <b-button variant="danger" class="mb-2" v-b-tooltip.hover title="Excluir" @click="removeUser(data.item)">
                        <i class="fa fa-trash" />
                    </b-button>
                </template>
                <template slot="admin" slot-scope="data">
                    <i class="fa fa-check" v-b-tooltip.hover title="Remover Admin" style="color: green; cursor: pointer;" @click="setAdmin(data.item)" v-if="data.item.admin"></i>
                    <i class="fa fa-close" v-b-tooltip.hover title="Adicionar Admin" style="color: red; cursor: pointer;" @click="setAdmin(data.item)" v-else></i>
                </template>
                <template slot="empty">´Não existem usuários cadastrados...</template>
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
    name: 'AdminUsers',
    props: ['tabIndex'],
    components: { PageTitle },
    data: function() {
        return {
            show: true,
            mode: 'save',
            departments: [],            
            users: [],
            fields: [
               { key: 'id', label: 'Código', sortable: true },
               { key: 'name', label: 'Nome', sortable: true },                
               { key: 'email', label: 'E-Mail', sortable: true },
               { key: 'departmentName', label: 'Departamento', sortable: true },
               { key: 'admin', label: 'Administrador' },
               { key: 'actions', label: 'Ações' }
            ],            
            user: {
                id: null,
                name: null,
                email: null,
                admin: "0",
                department_id: null
            },
            department: null,
            page: 1,
            count: 0,
            limit: 0
        }
    },
    methods: {
        async loadUsers() {
            const url = `${baseApiUrl}/users?page=${this.page}`
            const temp = await axios.get(url);
            this.users = temp.data.data;
            this.count = temp.data.count;
            this.limit = temp.data.limit;
        },
        async loadDepartments(page = 1, temp = []) {                       
            const url = `${baseApiUrl}/departments?page=${page}`;                      
            let result = await axios.get(url).catch(err => showError(err.response.data.err));
            const totalPages = Math.ceil(result.data.count / result.data.limit);
            result.data.data.forEach(data => temp.push({ value: data.id, text: data.name }));
            
            if (page === totalPages) {
                this.departments = temp;
            } else {                 
                return this.loadDepartments(page + 1, temp);                
            }    
        },        
        saveUser() {
            const url = `${baseApiUrl}/users`;

            axios.post(url, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.clear();
                    this.loadUsers();
                })
                .catch(err => showError(err.response.data.err));
        },
        loadUser(user) {
            const userId = user.id;
            const url = `${baseApiUrl}/users/${userId}`;

            axios.get(url)
                .then(data => {
                    this.user = data.data;
                    this.mode = 'edit';
                })
        },
        updateUser() {
            const url = `${baseApiUrl}/users/${this.user.id}`;
            
            axios.put(url, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.clear();
                    this.loadUsers();
                })
                .catch(err => showError(err.response.data.err));
        },
        removeUser(value) {
            const user = { ...value };
           
            this.$bvModal.msgBoxConfirm(`Você tem certeza que quer remover o usuário ${user.name}??`, {
                title: 'Confirmar remoção',
                okVariant: 'danger',
                okTitle: 'Sim, pode remover',
                cancelTitle: 'Não, não remover',
                hideHeaderClose: false                
            })
            .then(value => {
                if (value) {
                    const url = `${baseApiUrl}/users/${user.id}`;
                axios.delete(url)
                    .then(() => {
                        this.$toasted.global.defaultSuccess();
                        this.clear();
                        this.loadUsers();
                    })
                    .catch(err => showError(err.response.data.err))
                }     
            })
            .catch(showError);           
        },
        setAdmin(value) {
            value.admin = 1 - value.admin;
            const user = { admin: value.admin };
            
            const url = `${baseApiUrl}/users/${value.id}/setadmin`;
            axios.put(url, user)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.loadUsers();        
                })
                .catch(err => showError(err.response.data.err));
            
        },
        clear() {
            this.user = {};
            this.mode = 'save';
            this.show = false;
            this.$nextTick(() => this.show = true);
        }       
    },
    watch: {
        tabIndex(newValue) {
            if (newValue === 2) {
                this.loadUsers();
                this.loadDepartments();
            }
        }
    }
}
</script>

<style>
    .users-admin .users-form {
        border: 1px solid rgba(0,0,0,.125);        
        border-radius: 5px;
        padding: 20px;  
    }
</style>
