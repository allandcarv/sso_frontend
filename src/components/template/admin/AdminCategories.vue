<template>
    <div class="categories-admin ml-3 mr-3">               
        <PageTitle title="Administração de Categorias" />
        <b-form class="categories-form" v-if="show">
            <b-row>
                <input type="hidden" v-model="category.id" />
                <b-col cols="12" md="6">
                    <b-form-group
                        id="category-name-group"
                        label="Nome da Categoria:"
                        label-for="category-name-input"
                    >
                        <b-form-input
                            id="category-name-input"
                            v-model="category.name"
                            type="text"
                            autocomplete="off"
                            required
                        ></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="6">
                    <b-form-group id="category-department-group" label="Departamento:" label-for="category-department-select">
                        <b-form-select id="category-department-select" v-model="category.department_id" :options="departments" v-if="mode === 'save'">
                            <template slot="first">
                                <option :value="null" disabled>Selecione o Departamento...</option>
                            </template>
                        </b-form-select>
                        <b-form-input type="text" v-model="category.departmentName" readonly v-if="mode === 'edit'"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-button variant="primary" @click="saveCategory" v-if="mode === 'save'">Salvar</b-button>
                    <b-button variant="warning" @click="updateCategory" v-else>Editar</b-button>
                    <b-button variant="secondary" class="ml-2" @click="clear">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <b-row class="mt-3 ml-2 mr-2">
            <b-table hover striped responsive :items="categories" :fields="fields" small show-empty>                         
                <template slot="actions" slot-scope="data">
                    <b-button variant="warning" class="mr-2 mb-2" v-b-tooltip.hover title="Editar" @click="loadCategory(data.item)">
                        <i class="fa fa-pencil" />
                    </b-button>
                    <b-button variant="danger" class="mb-2" v-b-tooltip.hover title="Excluir" @click="removeCategory(data.item)">
                        <i class="fa fa-trash" />
                    </b-button>
                </template>
                <template slot="empty">Não existem categorias cadastradas...</template>
            </b-table>
        </b-row>
        <b-row class="ml-2">
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
    name: 'AdminCategories',
    props: ['tabIndex'],
    components: { PageTitle },
    data: function () {
        return {            
            show: true,
            mode: 'save',
            category: { id: null, name: null, department_id: null },
            categories: [],
            departments: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Categoria', sortable: true },                
                { key: 'departmentName', label: 'Departamento', sortable: true },
                { key: 'actions', label: 'Ações' }
            ],  
            page: 1,
            count: 0,
            limit: 0
        }
    }, 
    methods: {
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
        loadCategories() {
            const url = `${baseApiUrl}/categories`;

            axios.get(url)
                .then(res => this.categories = res.data.data)
                .catch(err => showError(err.response.data.err));
        },
        loadCategory(category) {
            const categoryId = category.id;
            const url = `${baseApiUrl}/categories/${categoryId}`;

            axios.get(url)
                .then(res => {
                    this.category = { ... res.data };
                    this.mode = 'edit';
                })                    
                .catch(err => showError(err.response.data.err));
        },
        saveCategory() {
            const url = `${baseApiUrl}/categories`;

            axios.post(url, this.category)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.clear()
                    this.loadCategories();
                })
                .catch(err => showError(err.response.data.err))
        },
        updateCategory() {
            const url = `${baseApiUrl}/categories/${this.category.id}`;            

            axios.put(url, this.category) 
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.clear();
                    this.loadCategories();
                })
                .catch(err => showError(err.response.data.err));
        },
        removeCategory(category) {            
            this.$bvModal.msgBoxConfirm(`Você tem certeza que quer remover a categoria ${category.name}??`, {
                title: 'Confirmar remoção',
                okVariant: 'danger',
                okTitle: 'Sim, pode remover',
                cancelTitle: 'Não, não remover',
                hideHeaderClose: false                
            })
            .then(value => {
                if (value) {
                    const url = `${baseApiUrl}/categories/${category.id}`;
                    axios.delete(url)
                        .then(() => {
                            this.$toasted.global.defaultSuccess();
                            this.clear();
                            this.loadCategories();
                        })
                        .catch(err => showError(err.response.data.err))
                }     
            })
            .catch(showError);              
        },
        clear() {
            this.category = { id: null, name: null, department_id: null };
            this.mode = 'save';
            this.show = false;
            this.$nextTick(() => this.show = true);
        }
    },
    watch: {
        tabIndex(newValue) {
            if (newValue === 3) {                               
                this.loadDepartments();
                this.loadCategories();
            }            
        },
        page() {
            this.loadCategories();
        }
    }
}
</script>

<style>
    .categories-admin .categories-form {
        border: 1px solid rgba(0,0,0,.125);        
        border-radius: 5px;
        padding: 20px;  
    }
</style>
