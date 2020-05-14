<template>
    <div class="catalog">
        <Group v-for="group in groups" :key="group._id" :group="group"/>
    </div>
</template>

<script>
    import Group from "../../components/Catalog/components/Groups";
    import GroupsService from "../../services/groups";
    import PostService from "../../services/products";
    export default {
        name: "Catalog",
        components: {
            Group
        },
        data: ()=> ({
            groups: []
        }),
        created() {
            GroupsService.getGroups().then(({data})=>{
                this.groups = data;
                this.$store.commit('setGroups', data);
            });
            PostService.getProducts().then(({data})=>{
                this.$store.commit('setProducts', data);
            })
        }
    }
</script>

<style>

</style>