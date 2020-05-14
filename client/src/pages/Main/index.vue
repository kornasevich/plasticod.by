<template>
    <div class="new-container">
        <div class="app">
            <v-app>
                <div class="content">
                    <Header/>
                    <router-view/>
                </div>
                <Footer/>
            </v-app>
        </div>
    </div>
</template>

<script>
    import Header from "../../components/Header/Header";
    import Footer from "../../components/Footer/Footer";

    export default {
        components: {
            Header,
            Footer
        },
        name: 'Main',

        data: () => ({}),
    }
</script>

<style>
    .app {
        position: relative;
    }

    .new-container {
        display: block;
        width: 1100px;
        margin: 0 auto;
        padding: 0 !important;
    }

    body {
        margin: 0;
        padding: 0;
    }

    .content {
        min-height: calc(100vh - 200px);
    }

    button,
    button:active,
    button:focus {
        outline: none;
    }
</style>