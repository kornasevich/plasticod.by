<template>
    <v-app>
        <div class="admin-panel-news">
            <v-app id="inspire">
                <v-card>
                    <v-toolbar color="#00B0F0" dark>
                        <v-toolbar-title>Общие настройки</v-toolbar-title>
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
                    <div class="main__phone">
                        <v-text-field
                                label="Телефон"
                                v-model="phone"
                                outlined
                        ></v-text-field>
                    </div>
                    <hr>
                    <div class="main__images">
                        <h2>Изображения в слайдере</h2>
                        <div :style="{width: 'fit-content', marginTop: '50px'}">
                            <div :style="{fontSize: '38px', fontWeight: 'bold', display: 'flex'}">
                                Загрузить изображение
                                <div :style="{fontSize: '10px', height:'fit-content'}">(больше
                                    7 изображений загрузить нельзя)
                                </div>
                            </div>
                            <input type="file" name="file" @change="onFileChange"/><br><br>
                            <Images :images="images" :flex="true" v-if="this.images.length"/>
                            <h2 v-else>Список изображений пуст!!!</h2>
                        </div>
                    </div>
                    <hr>
                    <h2>Соц. сети</h2>
                    <div>
                        <v-text-field
                                label="Skype"
                                v-model="skype"
                                outlined
                        ></v-text-field>
                        <v-text-field
                                label="Viber"
                                v-model="viber"
                                outlined
                        ></v-text-field>
                        <v-text-field
                                label="WhatsApp"
                                v-model="whatsapp"
                                outlined
                        ></v-text-field>
                        <v-text-field
                                label="Telegram"
                                v-model="telegram"
                                outlined
                        ></v-text-field>
                        <v-text-field
                                label="Facebook"
                                v-model="facebook"
                                outlined
                        ></v-text-field>
                        <v-text-field
                                label="Вконтакте"
                                v-model="vk"
                                outlined
                        ></v-text-field>
                        <v-text-field
                                label="Instagram"
                                v-model="instagram"
                                outlined
                        ></v-text-field>
                    </div>
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
    import GeneralService from "../../../services/general";
    import Images from "../Catalog/elements/Images";

    export default {
        components: {
            Images
        },
        name: 'News',
        data: () => ({
            id: '',
            phone: '',
            images: [],
            uploadImageData: {
                displayFileName: null,
                uploadFileData: null,
                file: null
            },
            snackbar: false,
            viber: '',
            skype: '',
            instagram: '',
            whatsapp: '',
            facebook: '',
            vk: '',
            telegram: ''
        }),
        created() {
            GeneralService.getGeneral().then(({data}) => {
                this.phone = data[0].numberPhone;
                this.images = data[0].images;
                this.id = data[0].id;
                this.viber = data[0].socials.viber;
                this.skype = data[0].socials.skype;
                this.instagram = data[0].socials.instagram;
                this.whatsapp = data[0].socials.whatsapp;
                this.facebook = data[0].socials.facebook;
                this.vk = data[0].socials.vk;
                this.telegram = data[0].socials.telegram
            })
        },
        methods: {
            saveGeneralSettings() {
                GeneralService.updateGeneral({
                    numberPhone: this.phone,
                    images: this.images,
                    id: this.id,
                    socials: {
                        viber: this.viber,
                        skype: this.skype,
                        instagram: this.instagram,
                        whatsapp: this.whatsapp,
                        facebook: this.facebook,
                        vk: this.vk,
                        telegram: this.telegram
                    }
                });
                this.snackbar = true;
            },
            onFileChange(event) {
                if (event.target.files && event.target.files.length && this.images.length < 7) {
                    let file = event.target.files[0];
                    this.uploadImageData.file = file;
                    this.uploadImageData.displayFileName =
                        event.target.files[0].name + " (" + this.calcSize(file.size) + "Kb)";
                    let reader = new FileReader();
                    reader.onload = e => {
                        this.uploadImageData.uploadFileData = e.target.result;
                        this.images.push(e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            },
            calcSize(size) {
                const sizeOneMByte = 1024;
                return Math.round(size / sizeOneMByte);
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