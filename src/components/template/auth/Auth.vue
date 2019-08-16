<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logoCEB.png" width="200" alt="logo" />
            <hr />
            
            <div class="auth-title">Autenticação</div>

            <b-input-group>
                <b-input-group-text slot="prepend"><i class="fa fa-at"></i></b-input-group-text>
                <b-form-input type="email" v-model="user.email" placeholder="Seu email ..." />
            </b-input-group>  
            <b-input-group>
                <b-input-group-text slot="prepend"><i class="fa fa-asterisk"></i></b-input-group-text>
                <b-form-input type="password" v-model="user.password" placeholder="Sua senha ..." @keyup.enter="signin" />
            </b-input-group>                       

            <button @click="signin">Entrar</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import { baseApiUrl, userKey, showError } from '../../config/global';

export default {
    name: 'Auth',
    data: function() {
        return {
            user: {}
        }
    },
    methods: {
        signin() {
            const url = `${baseApiUrl}/signin`;
            
            axios.post(url, this.user)
                .then(res => {                    
                    this.$store.commit('setUser', res.data);
                    localStorage.setItem(userKey, JSON.stringify(res.data));
                    this.$router.push({ path: '/' });
                })
                .catch(err => showError(err.response.data.err));
        }
    }
}
</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;        
        justify-content: center;        
        padding: 50px 0;
    }

    .auth-modal {
        background-color: #fff;
        width: 350px;
        height: 370px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);        

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2re;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal .input-group {        
        margin-bottom: 15px;
    }

    .auth-modal button {
        align-self: flex-start;
        background-color: #2460ae;
        color: #fff;
        padding: 5px 15px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right, rgba(120, 120, 120, 0), rgba(120, 120, 120, 0.75), rgba(120, 120, 120, 0));
    }
</style>
