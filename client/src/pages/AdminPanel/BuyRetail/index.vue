<template>
    <v-app>
        <div class="admin-panel-news">
            <v-app id="inspire">
                <v-card>
                    <v-toolbar color="#00B0F0" dark>
                        <v-toolbar-title>Купить в розницу</v-toolbar-title>
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
                    <v-btn :style="{margin: '0 0 20px auto'}" small color="yellow" @click="()=>{
                        this.address.push('')
                    }">
                        <v-icon size="small" class="mr-2">fas fa-plus</v-icon>
                        Добавить адрес
                    </v-btn>
                    <v-text-field
                            label="Адрес"
                            v-for="(field, indexField) in address"
                            :key="indexField"
                            v-model="address[indexField]"
                            outlined
                    ></v-text-field>
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
    import BuyRetailService from "../../../services/buy-retail";

    export default {
        name: 'About',
        data: () => ({
            id: '',
            existAbout: false,
            snackbar: false,
            address: ['']
        }),
        created() {
            this.init();
        },
        methods: {
            save() {
                BuyRetailService.updateBuyRetail({
                    id: this.id,
                    address: this.address
                });

                this.snackbar = true;
            },
            init() {
                BuyRetailService.getBuyRetail().then(({data}) => {
                    this.address = data[0].address;
                    this.id = data[0]._id;
                }).catch(() => {
                    BuyRetailService.insertBuyRetail({
                        address: ['']
                    });
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