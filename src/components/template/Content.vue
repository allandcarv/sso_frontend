<template>
    <div class="content">
        <!-- <b-container fluid> -->
            <router-view></router-view>
        <!-- </b-container> -->
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
        
        padding: 20px 40px;               
        
        background-color:#f2f2f2;
    }    
</style>
