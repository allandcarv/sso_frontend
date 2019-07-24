<template>
    <header class="header">
        <div class="header__logo">
            <img src="@/assets/logoCEB.png" alt="Logo do CEB">
        </div>
        <div class="header__title">
            <p>{{ title }}</p>
        </div>
        <div class="header__userDropDown">
            userDropDown
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: { title: String, hideUserDropdown: Boolean }
}
</script>

<style>
    .header {
        grid-area: header;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.46);
        -moz-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.46);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.46);

        padding: 40px;        

        color: #4dab23;
    }
</style>
