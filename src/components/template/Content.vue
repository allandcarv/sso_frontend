<template>
    <div class="content">
        <b-container fluid>
            <router-view></router-view>
        </b-container> 
    </div>
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style>
    .content {
        grid-area: content;
        
        padding: 10px 20px;               
        
        background-color:#f2f2f2;
    }  

    .container-fluid {
        height: 100%;
    }  
</style>
