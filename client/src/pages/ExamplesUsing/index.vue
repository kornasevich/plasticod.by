<template>
    <div class="examples-using">
        <div class="examples-using__title">
            Примеры использования (фотогалерея)
        </div>
        <div class="examples-using__photos">
            <transition-group name="thumbnailfade" tag="div">
                <img v-for="thumb in filteredImages"
                     :key="thumb.id"
                     @click="showLightbox(thumb.name)"
                     :src="thumb.name"/>
            </transition-group>

            <lightbox id="mylightbox"
                      ref="lightbox"
                      :images="images"
                      :filter="galleryFilter"
                      :timeoutDuration="5000"
            />
        </div>
    </div>
</template>

<script>
        import ExampleUsingService from "../../services/example-using";

    export default {
        name: 'ExampleUsing',
        data: () => ({
            images: [],
            galleryFilter: 'all'
        }),
        methods: {
            showLightbox: function (imageName) {
                this.$refs.lightbox.show(imageName);
            },
            updateFilter(filterName) {
                this.galleryFilter = filterName;
            }
        },
        computed: {
            filteredImages: function () {
                if (this.galleryFilter === 'all') {
                    return this.images;
                } else {
                    return this.images.filter(image => image.filter === this.galleryFilter);
                }
            }
        },
        created(){
            ExampleUsingService.getExampleUsing().then(({data})=>{
                this.images = data[0].images.map((image, idImage)=>{
                    return {
                        name: image,
                        filter: 'plasticod',
                        id: `image-${idImage}`
                    }
                })
            })
        }
    }

</script>

<style scoped>
    .examples-using__title{
        color: white;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        background-color: #305496;
    }

    .examples-using__photos > div {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

     img {
        padding: 10px;
        width:33.3%;
        height: 200px;
    }

</style>