<template>
    <div class="news">
        <div class="demarcation-strip"/>
        <New v-for="(newItem, newIndex) in listNews" :key="newIndex" :urlImage="newItem.image"
             :textNew="newItem.description" />
    </div>
</template>

<script>
    import New from './New.vue';
    import NewsService from "../../services/news";

    export default {
        name: 'News',
        components: {
            New
        },
        data: () => ({
            listNews: []
        }),
        created() {
            NewsService.getNews().then(({data})=>{
                this.listNews = data;
            })
        }
    }
</script>

<style scoped>
    .demarcation-strip{
        background-color: #305496;
        width: 100%;
        height: 20px;
    }
</style>