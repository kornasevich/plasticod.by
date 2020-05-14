<template>
    <v-app>
        <div :style="{display: 'flex', justifyContent: 'space-around'}">
            <v-icon @click="$router.go(-1)" :style="{height: 'fit-content', marginTop: '30px'}">fas fa-arrow-left
            </v-icon>
            <div class="edit-product">
                <h1 class="title">Редактирование товара</h1>
                <v-select
                        :items="groups"
                        label="Группа"
                        v-model="product.group"
                ></v-select>
                <v-text-field v-model="product.name" label="Название товара" :rules="rules"
                              hide-details="auto"></v-text-field>
                <v-text-field v-model="product.code" label="Код"></v-text-field>
                <v-text-field v-model="product.color" label="Цвета корпуса"></v-text-field>
                <v-text-field v-model="product.drawer" label="Выдвижной ящик"></v-text-field>
                <v-text-field v-model="product.volumeObeBox" label="Объем одного ящика см.3"></v-text-field>
                <v-text-field v-model="product.volumeAllBox" label="Объем всех ящиков см.3"></v-text-field>
                <v-text-field v-model="product.weight" label="Вес, кг."></v-text-field>
                <v-text-field v-model="product.codeCompatibility" label="Стыкуется с кодами:"></v-text-field>
                <v-text-field v-model="product.priceBeforeTen" label="1-10 шт."></v-text-field>
                <v-text-field v-model="product.priceBeforeHundred" label="11-100 шт."></v-text-field>
                <v-text-field v-model="product.priceAfterHundred" label="от 100 шт."></v-text-field>
                <v-btn text small @click="editProduct">Редактировать</v-btn>
            </div>
            <div :style="{width: '30%', marginTop: '50px'}">
                <h1>Загрузить изображение</h1>
                <input type="file" name="file" @change="onFileChange"/><br><br>
                <Images :images="product.image"/>
            </div>
        </div>
    </v-app>
</template>

<script>
    import PostService from "../../../services/products";
    import Images from "./elements/Images";

    export default {
        name: 'AddProduct',
        components: {
            Images
        },
        data: () => ({
            files: [],
            groups: ['Группа 1', 'Группа 2', 'Группа 3', 'Группа 4'],
            product: {
                name: '',
                group: '',
                code: '',
                color: '',
                drawer: '',
                volumeObeBox: '',
                volumeAllBox: '',
                weight: '',
                codeCompatibility: '',
                priceBeforeTen: '',
                priceBeforeHundred: '',
                priceAfterHundred: '',
                image: []
            },
            uploadImageData: {
                displayFileName: null,
                uploadFileData: null,
                file: null
            }
        }),
        created() {
            PostService.getProducts().then((response) => {
                const id = response.data.findIndex((product) => {
                    return product._id === this.$router.history.current.params.id;
                });
                this.product = response.data[id];
            });
        },
        methods: {
            editProduct() {
                const id = this.product._id;
                delete this.product._id;
                PostService.updateProduct(id, this.product).then(() => {
                    this.$router.go(-1);
                });
            },
            onFileChange(event) {
                if (event.target.files && event.target.files.length) {
                    let file = event.target.files[0];
                    this.uploadImageData.file = file;
                    this.uploadImageData.displayFileName =
                        event.target.files[0].name + " (" + this.calcSize(file.size) + "Kb)";
                    let reader = new FileReader();
                    reader.onload = e => {
                        this.uploadImageData.uploadFileData = e.target.result;
                        this.product.image.push(e.target.result)
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
    .edit-product {
        width: 400px;
        margin: 0 auto;
    }

    .edit-product h1 {
        text-align: center;
    }
</style>