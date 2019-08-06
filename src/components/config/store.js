import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            name: 'Usuário Mock',
            email: 'user@example.com'
        }       
    },    
})