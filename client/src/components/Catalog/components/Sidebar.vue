<template>
    <div class="group-sidebar">
        <button
                class="button"
                v-for="group in groups"
                :class="[group.nameGroup.split(' ').join('').toLowerCase() === currentGroup ? 'active' : '']"
                :key="group._id"
                @click="transitionLink(group.nameGroup)"
        >
            {{group.nameGroup}}
        </button>
    </div>
</template>

<script>
    import GroupsService from "../../../services/groups";

    export default {
        name: 'Sidebar',
        props: {
          currentGroup: {
              type: String,
              default: 'Группа 1'
          }
        },
        data: () => ({
            groups: [],
            currentGroup: ''
        }),
        created() {
            GroupsService.getGroups().then(({data}) => {
                this.groups = data;
            });

            this.$store.commit('setCurrentGroup', this.currentGroup.toLowerCase());
            this.currentGroup = this.currentGroup.toLowerCase();
        },
        methods: {
            transitionLink(nameGroup) {
                this.$store.commit('setCurrentGroup', nameGroup);
                this.$router.push(`/catalog/${nameGroup.split(' ').join('').toLowerCase()}`);
                this.currentGroup = nameGroup.split(' ').join('').toLowerCase();
            }
        }
    }
</script>

<style scoped>
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
    }

    .group-sidebar {
        display: flex;
        flex-direction: column;
    }

    .active {
        background-color: #305496;
    }
</style>