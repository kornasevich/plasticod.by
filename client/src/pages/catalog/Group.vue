<template>
    <div class="group">
        <Sidebar v-if="!loading" :currentGroup="$router.history.current.params.id"/>
        <div class="group" v-if="!loading">
            <GroupElement class="full-width" :products="viewProducts" :group="group"/>
        </div>
        <v-progress-circular
                :style="{paddingTop: '400px'}"
                class="ma-auto"
                v-if="loading"
                :size="70"
                :width="7"
                color="purple"
                indeterminate
        ></v-progress-circular>
    </div>
</template>

<script>
    import GroupElement from "../../components/Catalog/components/GroupElement";
    import Sidebar from "../../components/Catalog/components/Sidebar";
    import GroupsService from "../../services/groups";
    import PostService from "../../services/products";

    export default {
        name: 'Group',
        inject: ['theme'],
        components: {
            GroupElement,
            Sidebar
        },
        computed: {
            currentGroup() {
                return this.$store.state.Catalog.currentGroup;
            }
        },
        watch: {
            currentGroup() {
                this.selectProductsForGroup();
            }
        },
        data: () => ({
            group: [],
            products: [],
            groups: [],
            viewProducts: [],
            loading: true
        }),
        async created() {
            await GroupsService.getGroups().then(({data}) => {
                this.groups = data;
            }).then(() => {
                this.$store.commit('setCurrentGroup', this.$router.history.current.params.id.toLowerCase())
            });
            await PostService.getProducts().then(({data}) => {
                this.products = data;
                this.$store.commit('setProducts', data);
                this.selectProductsForGroup(data);
            }).then(() => {
                setTimeout(() => {
                    this.loading = !this.loading;
                }, 1500)
            })
        },
        methods: {
            selectProductsForGroup(products = []) {
                if (products.length > 0) {
                    this.viewProducts = products.filter((product) => {
                        return product.group.split(' ').join('').toLowerCase() === this.$router.history.current.params.id.toLowerCase()
                    });
                } else {
                    this.viewProducts = this.products.filter((product) => {
                        return product.group.split(' ').join('').toLowerCase() === this.$router.history.current.params.id.toLowerCase()
                    });
                }
                const id = this.groups.findIndex((group) => {
                    return group.nameGroup.split(' ').join('').toLowerCase() === this.$router.history.current.params.id.toLowerCase()
                });
                this.group = this.groups[id]
            }
        }
    }
</script>

<style scoped>
    .full-width {
        width: 100%;
    }

    .button {
        padding: 10px;
        background-color: #00B0F0;
        margin: 10px 20px;
        width: 180px;
        color: white;
    }

    .button:hover {
        background-color: #305496;
    }

    .group {
        display: flex;
        width: 100%;
    }

    .group-sidebar {
        display: flex;
        flex-direction: column;
    }

    .active {
        background-color: #305496;
    }
</style>