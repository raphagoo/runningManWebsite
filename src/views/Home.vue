<template>
    <div class="container">
        <Header/>
    </div>
</template>

<script>
    import Header from '../components/Header.vue';
    export default {
        name: "Home",
        components: {Header}
    }
</script>

<style scoped>
    .container{
        display: block;
        position: relative;
        min-width: 100%;
        min-height: 100%;
        height: 100%;
        width: 100%;
    }
</style>
