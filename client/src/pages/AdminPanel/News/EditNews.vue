<template>
    <div>
        <div class="add-news">
            <div :style="{width: '700px'}">
                <h1 class="font-weight-bold display-4">Редактировать новость</h1><br><br>
                <v-textarea
                        solo
                        label="Описание новости"
                        v-model="descriptionNew"
                ></v-textarea>
            </div>
            <div :style="{width: 'fit-content', marginTop: '50px'}">
                <h1>Загрузить изображение</h1>
                <input type="file" name="file" @change="onFileChange"/><br><br>
                <Images :images="image"/>
            </div>
        </div>
        <v-btn :style="{display: 'block',margin: '30px auto'}" @click="editNew">Редактировать</v-btn>
    </div>
</template>

<script>
    import Images from "../Catalog/elements/Images";
    import NewsService from "../../../services/news";
    export default {
        name: 'AddNews',
        components: {
            Images
        },
        data: () => ({
            uploadImageData: {
                displayFileName: null,
                uploadFileData: null,
                file: null
            },
            image: [],
            descriptionNew: '',
            news: []
        }),
        created(){
            NewsService.getNews().then(({data})=>{
                const id = data.findIndex((news)=>{
                    return news._id === this.$router.history.current.params.id;
                });
                this.descriptionNew = data[id].description;
                this.image.push(data[id].image)
            })
        },
        methods: {
            onFileChange(event) {
                if (event.target.files && event.target.files.length) {
                    let file = event.target.files[0];
                    this.uploadImageData.file = file;
                    this.uploadImageData.displayFileName =
                        event.target.files[0].name + " (" + this.calcSize(file.size) + "Kb)";
                    let reader = new FileReader();
                    reader.onload = e => {
                        this.uploadImageData.uploadFileData = e.target.result;
                        this.image = [];
                        this.image.push(e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            },
            calcSize(size) {
                const sizeOneMByte = 1024;
                return Math.round(size / sizeOneMByte);
            },
            editNew(){
                NewsService.updateNews(this.$router.history.current.params.id, {
                    description: this.descriptionNew,
                    image: this.image[0]
                });
                this.$router.go(-1)
            }
        }
    }
</script>

<style>
    .add-news {
        display: flex;
        justify-content: space-between;
        width: 1200px;
        margin: 0 auto;
    }
</style>