<template>
    <v-app>
        <div class="admin-panel-news">
            <v-app id="inspire">
                <v-card>
                    <v-toolbar color="#00B0F0" dark>
                        <v-toolbar-title>Контакты</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <div class="my-2">
                            <v-btn small color="green" @click="save">
                                <v-icon size="small" class="mr-2">fas fa-check</v-icon>
                                Сохранить
                            </v-btn>
                        </div>
                    </v-toolbar>
                </v-card>
                <div class="main">
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
    import ContactsService from "../../../services/contacts";

    export default {
        name: 'Contacts',
        data: () => ({
            id: '',
            text: '',
            dialog: false,
            snackbar: false,
            existAbout: false
        }),
        created() {
            this.initAbout();
        },
        methods: {
            save() {

                this.snackbar = true;
            },
            initAbout() {
                ContactsService.getContacts().then(({data}) => {
                    this.contacts = data[0].contacts;
                    this.id = data[0]._id;
                }).catch(() => {
                    ContactsService.insertContacts({
                        contacts: []
                    })
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