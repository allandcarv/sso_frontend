<template>
    <div class="page-title">
        <span>{{ title }}</span>        
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['title']
}
</script>

<style>
    .page-title {
        padding: 10px;
        
        color: #809fff;
        font-size: 1.1rem 
    }
</style>
