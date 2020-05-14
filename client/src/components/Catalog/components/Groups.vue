<template>
    <div class="groups">
        <div class="groups__header" @click="openGroup(group.nameGroup)">
            <div class="groups__header__title">{{group.nameGroup}}</div>
            <div class="groups__header__description">{{group.description}}</div>
        </div>
        <div class="groups-body">
            <img v-for="(image, imageIndex) in group.images" :key="`${group._id}${imageIndex}`" :src="image" alt="image"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Group',
        props: {
            group: Object
        },
        data: () => ({}),
        methods: {
            openGroup(nameGroup){
                this.$store.commit('setCurrentGroup', nameGroup);
                this.$router.push(`catalog/${nameGroup.split(' ').join('').toLowerCase()}`)
            }
        }
    }
</script>

<style scoped>
    .groups__header {
        display: flex;
        align-items: center;
        background-color: #305496;
        color: white;
        border-bottom: 2px solid black;
        cursor: pointer;
    }

    .groups__header__title {
        margin: 20px;
        width: 10%;
        word-wrap: break-word;
        text-align: center;
    }

    .groups__header__description {
        width: 80%;
        padding: 10px;
    }

    .groups-body {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    .groups-body img {
        padding: 5px;
        height: 150px;
    }
</style>