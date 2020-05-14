<template>
    <div class="new">
        <div class="new-wrapper">
            <img class="new-image" :src="urlImage" alt="image">
            <div>{{textNew}}</div>
            <div v-if="pdfFile">{{pdfFile}}</div>
        </div>
        <div class="demarcation-strip"/>
    </div>
</template>

<script>
    export default {
        name: 'New',
        props: {
            urlImage: String,
            textNew: String,
            pdfFile: Object
        }
    }
</script>

<style>
    .new-wrapper {
        display: flex;
        align-items: center;
        padding: 20px;
    }

    .new-image {
        width: 160px;
        margin-right: 20px;
    }

    .demarcation-strip{
        background-color: #305496;
        width: 100%;
        height: 20px;
    }
</style>