<template>
    <v-app>
        <div class="admin-panel-news">
            <v-app id="inspire">
                <v-card>
                    <v-toolbar color="#00B0F0" dark>
                        <v-toolbar-title>О нас</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <div class="my-2">
                            <v-btn small color="green" @click="saveGeneralSettings">
                                <v-icon size="small" class="mr-2">fas fa-check</v-icon>
                                Сохранить
                            </v-btn>
                        </div>
                    </v-toolbar>
                </v-card>
                <div class="main">
                    <v-textarea
                            v-model="about"
                            :filled="true"
                            :solo="true"
                    ></v-textarea>
                </div>
                <v-snackbar
                        v-model="snackbar"
                        color="green"
                        :right="true"
                        :top="true"
                >
                    Данные сохранены
                    <v-btn
                            dark
                            text
                            @click="snackbar = false"
                    >
                        Close
                    </v-btn>
                </v-snackbar>
            </v-app>
        </div>
    </v-app>
</template>

<script>
    import AboutService from "../../../services/about";

    export default {
        name: 'About',
        data: () => ({
            id: '',
            about: '',
            snackbar: false,
            existAbout: false
        }),
        created() {
            this.initAbout();
        },
        methods: {
            saveGeneralSettings() {
                if (this.existAbout) {
                    AboutService.updateAbout({
                        about: this.about,
                        id: this.id
                    });
                } else {
                    AboutService.insertAbout({
                        about: this.about
                    }).then(() => {
                        setTimeout(() => {
                            this.initAbout()
                        }, 2500)
                    })
                }

                this.snackbar = true;
            },
            initAbout() {
                AboutService.getAbout().then(({data}) => {
                    this.about = data[0].about;
                    this.id = data[0]._id;
                    this.existAbout = true;
                }).catch(() => {
                    this.existAbout = false;
                    alert('Неполадки на сервере.')
                })
            }
        }
    }
</script>

<style scoped>
    .main {
        margin: 30px;
    }

    .main__phone {
        width: 400px;
    }

    .main__images {

    }
</style>