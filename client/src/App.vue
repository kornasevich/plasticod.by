<template>
    <router-view/>
</template>

<script>
    import UserService from "./services/user";
    export default {
        name: 'App',
        data: () => ({}),
        async created() {
            if (localStorage.getItem('token')) {
                const token = localStorage.getItem('token');
                this.$store.commit('setToken', token);
                this.$store.commit('setLogin', true);
                await UserService.loadDataForUser(token).then( async ({data})=>{
                   await this.$store.commit('setDataUser', data);
                })
            }
            await this.$store.dispatch('getGeneral');
        }
    }
</script>

<style>
    body {
        margin: 0;
        padding: 0;
    }

    div.content > div:nth-child(2){
        min-height: 512px;
        border-right: 1px solid #000080;
        border-left: 1px solid #000080;
    }

    button,
    button:active,
    button:focus {
        outline: none;
    }


    @media print {
        body > .content{
            border: none
        }

        .content{
            border: none
        }

        .header {
            display: none;
        }

        .footer {
            display: none;
        }

        .sidebar{ display: none}

        body > .footer{
            display: none;
        }
    }
</style>