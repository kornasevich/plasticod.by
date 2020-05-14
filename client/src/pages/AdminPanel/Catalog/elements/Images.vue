<template>
    <div :class="{'d-flex': flex}" :style="{padding: '10px', flexWrap: 'wrap'}">
        <div v-for="(image, indexImage) in images" :key="image" :style="{position: 'relative', width: 'fit-content', padding: '15px'}">
            <img :style="{maxWidth: '300px'}" :src="image" alt="Image">
            <v-icon size="is-small" :style="{position: 'absolute', top: '-10px', right: '-5px'}" @click="deleteImage(indexImage)">fas fa-times</v-icon>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
          images: {
              type: Array
          },
            flex: {
              type: Boolean
            }
        },
        name: 'Images',
        methods: {
            deleteImage(id){
                this.images.splice(id, 1);
            }
        }
    }

</script>

<style scoped>

</style>