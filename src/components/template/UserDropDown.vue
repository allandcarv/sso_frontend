<template>
    <div class="user-dropdown">
        <div class="user-dropdown__button">
            <span class="d-none d-sm-block">{{ user.name }}</span>
            <div class="user-dropdown__img">
                <Gravatar :email="user.email" alt="User Profile" />
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown__content">            
            <router-link to="/admin" v-if="user.admin"><i class="fa fa-cogs"></i> Administração</router-link>   
            <router-link to="/oper" v-if="user.oper"><i class="fa fa-check-circle-o"></i> Operação</router-link>             
            <a href @click.prevent="logout"><i class="fa fa-sign-out"></i> Sair</a>            
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Gravatar from 'vue-gravatar';

import { userKey } from '../config/global';

export default {
    name: 'UserDropDown',
    components: { Gravatar },
    computed: mapState(['user']),
    methods: {
        logout() {
            localStorage.removeItem(userKey);
            this.$store.commit('setUser', null);
            this.$router.push({ name: 'auth' });
        }
    }
}
</script>

<style>
    .user-dropdown {
        position: relative;

        height: 100%;        
    }

    .user-dropdown:hover {
        background-color: rgba(0, 0, 0, 0.2); /* Efeito Selecionado */
    }

    .user-dropdown__button {
        display: flex;
        align-items: center;

        height: 100%;
        padding: 0px 20px;
        
        color: #365899;
        font-weight: 100;
    }

    .user-dropdown__img {
        margin: 0px 10px;
    }

    .user-dropdown__img > img {
        max-height: 40px;
        border-radius: 5px;
    }

    .user-dropdown__content {
        position: absolute;
        right: 0px;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        min-width: 170px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 0px;
        z-index: 1;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;        

        background-color: #f9f9f9;
        
    }

    .user-dropdown:hover .user-dropdown__content {
        visibility: visible;
        opacity: 1;
    }

    .user-dropdown__content a {
        padding: 5px 10px;
    }

    .user-dropdown__content a:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .user-dropdown__content a,
    .user-dropdown__content a:hover {
        text-decoration: none;
        color: #365899;
    }

</style>
