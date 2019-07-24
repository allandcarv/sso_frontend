<template>
    <header class="header">
        <div class="header__logo">
            <router-link to="/">
                <img src="../../assets/logoCEB.png" />
            </router-link>
        </div>
        <div class="header__title">
            <span>{{ title }}</span>
        </div>
        <UserDropDown />
    </header>
</template>

<script>
import UserDropDown from './UserDropDown';

export default {
    name: 'Header',
    components: { UserDropDown },
    props: { title: String }
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

        background: #ECE9E6;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */                      
    }

    .header__logo > img {
        max-height: 140px; 
    }
    
    .header__title {
        flex-grow: 1;

        color: #212C7C;
        font-size: 2.0rem;
        font-weight: bold;
        text-align: center;
    }
</style>
