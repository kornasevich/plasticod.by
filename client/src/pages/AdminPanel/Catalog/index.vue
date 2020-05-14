<template>
    <v-app>
        <div class="admin-panel-catalog">
            <v-app id="inspire">
                <v-card>
                    <v-toolbar color="#00B0F0" dark>
                        <v-toolbar-title>Каталог</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <div class="my-2">
                            <v-dialog v-model="isModalAddGroup" persistent max-width="800">
                                <template v-slot:activator="{ on }">
                                    <v-btn :style="{margin: '0 20px'}" small color="green" v-on="on">
                                        <v-icon size="small" class="mr-2">fas fa-plus-circle</v-icon>
                                        Добавить группу
                                    </v-btn>
                                </template>
                                <v-card>
                                    <div :style="{padding: '20px'}">
                                        <v-text-field v-model="newGroupName"
                                                      label="Название группы"></v-text-field>
                                        <v-textarea
                                                solo
                                                name="input-7-4"
                                                label="Описание группы"
                                                v-model="newGroupDescription"
                                        ></v-textarea>
                                        <div :style="{width: 'fit-content', marginTop: '50px'}">
                                            <h1>Загрузить изображение</h1>
                                            <input type="file" name="file" @change="onFileChange"/><br><br>
                                            <Images :images="image"/>
                                        </div>
                                        <v-card-actions>
                                            <v-btn color="green darken-1" text @click="isModalAddGroup = false">
                                                Отмена
                                            </v-btn>
                                            <v-btn color="green darken-1" text @click="modeDialog === 'add' ? createNewGroup() : editGroup()">
                                                {{modeDialog === 'add' ? 'Добавить' : 'Изменить'}}
                                            </v-btn>
                                        </v-card-actions>
                                    </div>
                                </v-card>
                            </v-dialog>

                            <v-btn small color="green" @click="$router.push('/admin/catalog/add')">
                                <v-icon size="small" class="mr-2">fas fa-plus-circle</v-icon>
                                Добавить товар
                            </v-btn>
                        </div>
                    </v-toolbar>
                    <v-tabs vertical>
                        <v-tab>
                            Список товаров
                        </v-tab>
                        <v-tab>
                            Список групп
                        </v-tab>

                        <v-tab-item>
                            <div :style="{display: 'flex !important', flexWrap: 'wrap'}">
                                <v-card flat v-for="product in products" :key="product.name"
                                        :style="{width: 'fit-content'}">
                                    <v-card-text>
                                        <v-card
                                                max-width="300"
                                        >
                                            <v-img
                                                    class="white--text align-end"
                                                    height="200px"
                                                    :src="product.image[0]"
                                            >
                                                <v-card-title>{{product.name}}</v-card-title>
                                            </v-img>

                                            <v-card-subtitle class="pb-0">{{product.group}}</v-card-subtitle>

                                            <v-card-text class="text--primary">
                                                <div>Код: {{product.code}}</div>
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-btn
                                                        color="orange"
                                                        text
                                                        @click="$router.push(`catalog/edit/${product._id}`)"
                                                >
                                                    Изменить
                                                </v-btn>

                                                <v-btn
                                                        color="red"
                                                        text
                                                        @click="deleteProduct(product._id)"
                                                >
                                                    Удалить
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-card-text>
                                </v-card>
                            </div>
                        </v-tab-item>
                        <v-tab-item>
                                <v-list
                                        three-line="true"
                                        v-if="groups.length > 0"
                                >
                                    <v-list-item
                                            v-for="group in groups"
                                            :key="group._id"
                                            :inactive="true"
                                    >

                                        <v-list-item-content>
                                            <v-list-item-title v-html="group.nameGroup"></v-list-item-title>
                                            <v-list-item-subtitle v-html="group.description"></v-list-item-subtitle>
                                        </v-list-item-content>

                                        <v-icon size="small" :style="{padding: '0 10px'}" @click="openDialog(group._id)">fas fa-pen</v-icon>
                                        <v-icon size="small" @click="deleteGroup(group._id)">fas fa-trash</v-icon>
                                    </v-list-item>
                                </v-list>
                            <div v-else><h3>Список групп пуст!</h3></div>
                        </v-tab-item>
                    </v-tabs>
                </v-card>
            </v-app>

            <v-snackbar
                    v-model="snackbar"
                    color="00B0F0"
                    :right="true"
                    :timeout="timeout"
                    :top="true"
                    :vertical="mode === 'vertical'"
            >
                {{snackbarText}}
                <v-btn
                        dark
                        text
                        @click="snackbar = false"
                >
                    Close
                </v-btn>
            </v-snackbar>
        </div>
    </v-app>
</template>

<script>
    import PostService from "../../../services/products";
    import GroupsService from "../../../services/groups";
    import Images from "./elements/Images";

    export default {
        name: 'AdminPanelCatalog',
        components: {
          Images
        },
        data: () => ({
            products: [],
            isModalAddGroup: false,
            groups: [],
            snackbar: false,
            newGroupName: '',
            newGroupDescription: '',
            snackbarText: '',
            modeDialog: 'add',
            tempIDGroup: '',
            uploadImageData: {
                displayFileName: null,
                uploadFileData: null,
                file: null
            },
            image: []
        }),
        methods: {
            deleteProduct(id) {
                PostService.deleteProducts(id).then(() => {
                    this.products.splice(this.products.findIndex((product) => {
                        return product._id === id
                    }), 1)
                }).then(() => {
                    this.snackbarText = "Товар был удален";
                    this.snackbar = true;
                    setTimeout(() => {
                        this.snackbar = false;
                    }, 5000)
                })

            },
            createNewGroup() {
                GroupsService.insertGroups({
                    nameGroup: this.newGroupName,
                    description: this.newGroupDescription,
                    images: this.image
                }).then(()=>{
                    this.newGroupName = '';
                    this.newGroupDescription = '';
                    this.image = [];
                    this.isModalAddGroup = false;
                    setTimeout(() => {
                        this.getGroups();
                    }, 2000);
                })
            },
            deleteGroup(id) {
                GroupsService.deleteGroups(id).then(() => {
                    this.groups.splice(this.groups.findIndex((group) => {
                        return group._id === id
                    }), 1)
                }).then(() => {
                    this.snackbarText = "Группа была удалена";
                    this.snackbar = true;
                    setTimeout(() => {
                        this.snackbar = false;
                    }, 5000)
                })
            },
            getProducts() {
                PostService.getProducts().then((response) => {
                    this.products = response.data;
                });
            },
            getGroups() {
                GroupsService.getGroups().then((groups) => {
                    this.groups = groups.data;
                })
            },
            openDialog(id){
                this.modeDialog = 'edit';
                const index = this.groups.findIndex((group)=>{
                    return group._id === id
                });
                this.newGroupName = this.groups[index].nameGroup;
                this.newGroupDescription = this.groups[index].description;
                this.tempIDGroup = this.groups[index]._id;
                this.image = this.groups[index].images;
                this.isModalAddGroup = true;
            },
            editGroup(){
                GroupsService.updateGroups(this.tempIDGroup, {
                    nameGroup: this.newGroupName,
                    description: this.newGroupDescription,
                    images: this.image
                }).then(()=>{
                    this.newGroupName = '';
                    this.newGroupDescription = '';
                    this.tempIDGroup = '';
                    this.isModalAddGroup = false;
                    this.image = []
                }).then(()=>{
                    this.getGroups();
                })
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
                        this.image.push(e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            },
            calcSize(size) {
                const sizeOneMByte = 1024;
                return Math.round(size / sizeOneMByte);
            },
        },
        created() {
            this.getProducts();
            this.getGroups();
        }
    }
</script>

<style scoped>
    .admin-panel-catalog {
        background-color: lightgray;
        height: 100vh;
    }
</style>