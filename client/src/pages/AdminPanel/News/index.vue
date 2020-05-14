<template>
    <v-app>
        <div class="admin-panel-news">
            <v-app id="inspire">
                <v-card>
                    <v-toolbar color="#00B0F0" dark>
                        <v-toolbar-title>Новости</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <div class="my-2">
                            <v-btn small color="green" @click="$router.push('/admin/news/add')">
                                <v-icon size="small" class="mr-2">fas fa-plus-circle</v-icon>
                                Добавить новость
                            </v-btn>
                        </div>
                    </v-toolbar>
                </v-card>
                <div :style="{display: 'flex', padding: '10px', border: '1px solid lightgray', margin: '10px', borderRadius: '4px'}"
                     v-for="(newItem, newIndex) in news" :key="newItem._id">
                    <img :style="{width: '120px'}" :src="newItem.image" alt="image">
                    <p :style="{padding: '10px'}">{{newItem.description}}</p>
                    <div class="new-actions">
                        <v-icon size="medium" @click="editNew(newItem._id)">
                            fas fa-edit
                        </v-icon>
                        <v-icon size="medium" @click="deleteNew(newItem._id, newIndex)">
                            fas fa-trash
                        </v-icon>
                    </div>
                </div>
                <v-snackbar
                        v-model="snackbar"
                        color="green"
                        :right="true"
                        :top="true"
                >
                    Запись удалена.
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
    import NewsService from "../../../services/news";

    export default {
        name: 'News',
        data: () => ({
            news: [],
            snackbar: false
        }),
        created() {
            NewsService.getNews().then((response) => {
                this.news = response.data
            })
        },
        methods: {
            deleteNew(id, index) {
                NewsService.deleteNews(id);
                this.news.splice(index, 1);
                this.snackbar = true;
                setTimeout(()=>{
                    this.snackbar = false
                }, 2000)
            },
            editNew(id){
                this.$router.push(`news/edit/${id}`)
            }
        }
    }
</script>

<style>
    .new-actions {
        display: flex;
        width: 50px;
        justify-content: space-between;
        margin-left: auto;
    }
</style>