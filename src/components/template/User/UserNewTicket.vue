<template>
    <div class="new-ticket">        
        <PageTitle title="Nova Solicitação" class="ml-3"/>        
        <div class="new-ticket__form ml-4 mr-4">
            <b-form v-if="show">
                <b-row>
                    <b-col cols="12" md="6">
                        <b-form-group
                            id="subject"
                            label="Assunto:"
                            label-for="subject-input"                        
                        >
                            <b-form-input
                                id="subject-input"
                                v-model="solicitation.subject"
                                type="text"
                                autocomplete="off"
                                required
                                placeholder="Qual o motivo de sua solicitação?"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6">
                        <b-form-group
                            id="category"
                            label="Categoria:"
                            label-for="category-select"
                        >
                            <b-form-select 
                                id="category-select"
                                v-model="solicitation.category_id"
                                :options="categories"
                                required>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <b-form-group 
                            id="description"
                            label="Descrição:"
                            label-for="description-textarea"
                        >
                            <b-form-textarea
                                id="description-textarea"
                                v-model="solicitation.description"                                
                                placeholder="Descreva de forma resumida sua solicitação"
                                rows="4"
                                maxlength="500"
                                no-resize
                                required
                            >
                            </b-form-textarea>
                            <small>{{ solicitation.description.length }} / 500</small>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="6">
                        <b-form-group
                            id="expected-date"
                            label="Data de Expectativa"
                            label-for="expected-date-input"
                        >
                            <b-form-input
                                id="expected-date-input"
                                v-model="solicitation.expected_date"
                                type="date"
                                required
                                placeholder="dd/mm/aaaa"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-button variant="primary" @click="saveSolicitation">Enviar</b-button>
                        <b-button variant="secondary" class="ml-2" @click="reset">Cancelar</b-button>
                    </b-col>
                </b-row>
            </b-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import PageTitle from '../PageTitle';
import { baseApiUrl, showError } from '../../config/global';

export default {
    name: 'UserNewTicket',
    components: { PageTitle },
    data: function() {
        return {
            show: true,
            solicitation: {
                subject: null,
                category_id: null,
                description: '',
                expected_date:null
            },
            categories: [
                { value: null, text: 'Selecione uma Categoria', disabled: true }
            ]
        }
    },
    methods: {
        loadCategories() {
            const url = `${baseApiUrl}/categories`
            axios.get(url)
                .then(res => {
                    res.data.map(c => {
                        this.categories.push({ value: c.id, text: c.name });
                    });
                })
                .catch(err => showError(err.response.data.err))
        },
        saveSolicitation() {
            const url = `${baseApiUrl}/solicitations`
            axios.post(url, this.solicitation)
                .then(() => {
                    this.$toasted.global.defaultSuccess();                    
                    this.reset();
                })
                .catch(err => showError(err.response.data.err) );
        },
        reset() {
            this.solicitation = {
                subject: null,
                category: null,
                description: '',
                expected_date:null
            };
            this.show = false;
            this.$nextTick(() => this.show = true);
        }
    },
    mounted() {
        this.loadCategories();
    }
}
</script>

<style>
    .new-ticket .new-ticket__form {
        border: 1px solid rgba(0,0,0,.125);        
        padding: 20px;        
    }
</style>
