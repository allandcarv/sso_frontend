<template>
    <header class="header">
        <div class="header__logo" v-if="!authScreen">
            <router-link to="/">
                <img src="../../assets/logoCEB.png" />
            </router-link>
        </div>
        <div class="header__title d-none d-sm-block">
            <span>{{ title }}</span>
        </div>
        <UserDropDown v-if="!authScreen" />
    </header>
</template>

<script>
import UserDropDown from './UserDropDown';

export default {
    name: 'Header',
    components: { UserDropDown },
    props: { 
        title: String,
        authScreen: Boolean    
    }
}
</script>

<style>
    .header {
        grid-area: header;
        display: flex;
        align-items: center;
        justify-content: space-between;       
            
        border-bottom: 2px solid #ECE9E6;
        padding: 0 40px;

        background-color: #fff;   
    }

    .header__logo img {
        width: 140px; 
    }
    
    .header__title {
        flex-grow: 1;

        color: #365899;
        font-size: 2.0rem;
        font-weight: bold;
        text-align: center;
    }
</style>
