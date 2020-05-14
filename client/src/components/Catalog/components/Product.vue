<template>
    <div class="product">
        <Sidebar v-if="!loading" :currentGroup="$router.history.current.fullPath.split('/')[2]"/>
        <div v-if="!loading" class="product-detail">
            <div class="product-detail__image">
                <div class="product-detail__image__main">
                    <transition-group name="thumbnailfade" tag="div">
                        <img
                                @click="showLightboxMain(mainImage[0]['name'])"
                                :src="mainImage[0]['name']"
                                :key="mainImage[0].id"/>
                    </transition-group>
                    <lightbox id="mylightboxmain"
                              ref="lightboxMain"
                              :images="[mainImage[0]]"
                              :timeoutDuration="5000"
                    />
                    <div class="product-detail__images__min">
                        <div v-for="(image, imageIndex) in images" :key="image.id">
                            <transition-group name="thumbnailfade" tag="div">
                                <img
                                        @click="showLightbox(image['name'], imageIndex)"
                                        :src="image['name']"
                                        :key="image.id"/>
                            </transition-group>
                            <lightbox id="mylightbox"
                                      ref="lightbox"
                                      :images="[image]"
                                      :timeoutDuration="5000"
                            />
                        </div>
                    </div>
                </div>
                <div class="product-detail__print" @click="print()"
                     :style="{margin: '60px', color: '#00B0F0', fontWeight: 'bold', cursor: 'pointer'}">Версия для
                    печати
                </div>
            </div>
            <div class="product-detail__information">
                <div class="product-detail__information__title">{{product.name}}</div>
                <div class="product-detail__information__code"
                     :style="{display: 'flex', width: 'fit-content', margin: '0 auto'}">
                    <div :style="{color: '#00B0F0'}">Код:</div>
                    {{product.code}}
                </div>
                <div class="product-detail__information__color item">
                    <div class="product-detail__text">Цвета корпуса:</div>
                    <div class="product-detail__value">
                        {{product.color}}
                    </div>
                </div>
                <div class="product-detail__information__drawer item">
                    <div class="product-detail__text">Выдвижной ящик:</div>
                    <div class="product-detail__value">
                        {{product.drawer}}
                    </div>
                </div>
                <div class="product-detail__information__volume-one-box item">
                    <div class="product-detail__text">Объем одного ящика см.3:</div>
                    <div class="product-detail__value">
                        {{product.volumeObeBox}}
                    </div>
                </div>
                <div class="product-detail__information__volume-all-box item">
                    <div class="product-detail__text">
                        Объем всех ящиков см.3:
                    </div>
                    <div class="product-detail__value">
                        {{product.volumeAllBox}}
                    </div>
                </div>
                <div class="product-detail__information__weight item">
                    <div class="product-detail__text">Вес, кг.</div>
                    <div class="product-detail__value">
                        {{product.weight}}
                    </div>
                </div>
                <div class="product-detail__information__code-compatibility item">
                    <div class="product-detail__text">Стыкуется с кодами:</div>
                    <div :style="{display: 'flex', flexDirection: 'column'}">
                        <div class="product-detail__value" v-for="code in product.codeCompatibility" :key="code">
                            {{code}}<br>
                        </div>
                    </div>
                </div>
                <div class="product-detail__information__price-title">Цена(без НДС):</div>
                <div class="product-detail__information__price-before-ten item">
                    <div class="product-detail__text">1-10 шт.:</div>
                    <div class="product-detail__value">
                        {{product.priceBeforeTen}} руб.
                    </div>
                </div>
                <div class="product-detail__information__price-before-hundred item">
                    <div class="product-detail__text">11-100 шт.:</div>
                    <div class="product-detail__value">
                        {{product.priceBeforeHundred}} руб.
                    </div>
                </div>
                <div class="product-detail__information__price-after-hundred item">
                    <div class="product-detail__text">от 100 шт.:</div>
                    <div class="product-detail__value">
                        {{product.priceAfterHundred}}
                    </div>
                </div>

                <div class="product-detail__count">
                    <div :style="{display: 'flex', flexDirection: 'column', width: 'fit-content'}">
                        <button class="button-count" @click="countProduct++">+</button>
                        <input class="count" v-model="countProduct">
                        <button class="button-count" @click="countProduct > 0 ? countProduct-- : null">-</button>
                    </div>
                    <div class="wrapper-button-add-basket">
                        <button class="button-add-basket" @click="addBasket">В корзину</button>
                    </div>
                </div>

                <div class="product-detail__total">
                    <div class="product-detail__price">
                        {{calcPrice}} BYN
                    </div>
                    <div :style="{marginLeft: '30px', color: '#00B0F0'}">Сумма к оплате</div>
                </div>
            </div>
        </div>
        <v-progress-circular
                :style="{paddingTop: '400px'}"
                class="ma-auto"
                :size="70"
                :width="7"
                color="purple"
                indeterminate
                v-if="loading"
        ></v-progress-circular>
        <v-snackbar
                v-model="snackbar"
                color="success"
                :right="true"
                :top="true"
        >
            Товар добавлен в корзину!
            <v-btn
                    text
                    color="success"
                    @click="snackbar = false"
            >
                Закрыть
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    import Sidebar from "./Sidebar";
    import PostService from "../../../services/products";

    export default {
        name: 'Product',
        components: {
            Sidebar
        },
        inject: ['theme'],
        data: () => ({
            product: {},
            countProduct: 0,
            loading: true,
            snackbar: false,
            images: [],
            mainImage: [0]
        }),
        methods: {
            print() {
                window.print();
            },
            addBasket() {
                if (this.countProduct > 0) {
                    let basket = [];
                    if (localStorage.getItem('basket')) {
                        basket = JSON.parse(localStorage.getItem('basket'));
                    }
                    let obj = Object.assign({}, this.product);
                    obj.countProduct = this.countProduct;
                    obj.price = this.calcPrice;
                    const idProduct = basket.findIndex((element)=>{
                        return element._id === obj._id
                    });
                    if(idProduct >= 0){
                        basket[idProduct].countProduct += obj.countProduct
                    } else {
                        basket.push(obj);
                    }
                    localStorage.setItem('basket', JSON.stringify(basket))
                    this.snackbar = true;
                    setTimeout(() => {
                        this.snackbar = false;
                    }, 3000)
                }
            },
            showLightbox: function (imageName, id) {
                this.$refs.lightbox[id].show(imageName);
            },
            showLightboxMain: function (imageName) {
                this.$refs.lightboxMain.show(imageName);
            },
        },
        computed: {
            calcPrice() {
                if (this.product.priceBeforeTen || this.product.priceBeforeHundred) {
                    if (this.countProduct <= 10) {
                        return Number(this.product.priceBeforeTen.split(',')[0]) * this.countProduct
                    }
                    return Number(this.product.priceBeforeHundred.split(',')[0]) * this.countProduct
                }
                return 0;
            }
        },
        created() {
            PostService.getProducts().then(({data}) => {
                const idProduct = this.$router.history.current.params.id;
                const indexProduct = data.findIndex((product) => {
                    return product._id === idProduct
                });
                this.product = data[indexProduct];
                data[indexProduct].image.forEach((image, imageIndex) => {
                    if (imageIndex !== 0) {
                        this.images.push({
                            'name': image,
                            'filter': 'image',
                            'id': 'image' + imageIndex
                        })
                    }
                });
                this.mainImage = [{
                    'name': data[indexProduct].image[0],
                    'filter': 'image',
                    'id': 'image0'
                }];
                setTimeout(() => {
                    this.loading = !this.loading;
                }, 1500)
            });

        }
    }
</script>

<style scoped>
    .product {
        display: flex;
    }

    .button {
        padding: 10px;
        background-color: #00B0F0;
        margin: 10px 20px;
        width: 180px;
        color: white;
    }

    .button-count {
        width: 100px;
        border: 2px solid black;
        padding: 5px;
        background-color: #0070C0;
        color: white;
    }

    .button-add-basket {
        padding: 10px;
        background-color: #00B0F0;
        width: 180px;
        color: white;
        border: 2px solid black;
        border-left: none;
    }

    .button:hover {
        background-color: #305496;
    }

    .product-sidebar {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .product-detail {
        width: 100%;
        display: flex;
    }

    .product-detail__image {
        width: 455px;
    }

    .product-detail__image__main img {
        display: block;
        border: 1px solid black;
        margin: 10px auto 0 auto;
        width: 100%;
    }

    .product-detail__information {
        width: 50%;
        text-align: center;
        color: red;
        font-weight: bold;
        margin-top: 20px;
    }

    .product-detail__information__title {
        font-size: 24px;
        color: #00B0F0;
    }

    .product-detail__information__color {
        display: flex;
        margin-top: 20px;
    }

    .product-detail__information__price-title {
        margin-top: 80px;
        color: #00B0F0;
    }

    .item {
        display: flex;
    }

    .product-detail__text {
        width: 50%;
        text-align: right;
        color: #00B0F0;
    }

    .product-detail__value {
        margin-left: 20px;
    }

    .product-detail__count {
        display: flex;
        margin: 30px auto 0 auto;
        width: fit-content;
    }

    .count {
        width: 100px;
        border: 2px solid black;
        padding: 10px;
        background-color: white;
        color: #4472C4;
        text-align: center;
    }

    .wrapper-button-add-basket {
        display: block;
        vertical-align: middle;
        height: fit-content;
        width: fit-content;
        margin: auto 0;
    }

    .product-detail__price {
        padding: 10px;
        border: 2px solid black;
        width: 100px;
    }

    .product-detail__total {
        display: flex;
        align-items: center;
        margin: 30px 0 30px 77px;
    }

    .product-detail__image__additionally {
        display: flex;
        margin: 0;
        padding: 0;
    }

    .product-detail__image__additionally img {
        width: 111px;
        height: 60px;
        border: 1px solid black;
        margin-top: -8px;
    }

    .product-detail__images__min {
        display: flex;
    }

    .product-detail__images__min img {
        margin: 0;
        border-top: none;
        width: 111px;
        height: 112px;
    }

    @media print {
        .product-detail__count {
            display: none;
        }

        .product-detail__total {
            display: none;
        }

        .product-detail__print {
            display: none;
        }

        .group-sidebar {
            display: none;
        }

        .product {
            border-left: none;
            border-right: none;
        }
    }
</style>