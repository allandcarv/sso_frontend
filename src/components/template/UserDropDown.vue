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
            <a href><i class="fa fa-check-circle-o"></i> Operação</a>    
            <a href><i class="fa fa-cogs"></i> Administração</a>    
            <a href><i class="fa fa-sign-out"></i> Sair</a>            
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Gravatar from 'vue-gravatar';

export default {
    name: 'UserDropDown',
    components: { Gravatar },
    computed: mapState(['user'])
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
        
        color: #212C7C;
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
        color: #212C7C;
    }

</style>
