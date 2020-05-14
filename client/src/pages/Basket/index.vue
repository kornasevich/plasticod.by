<template>
    <div class="basket">
        <div class="basket__title">
            СОДЕРЖИМОЕ КОРЗИНЫ:
        </div>
        <div v-if="emptyBasket" class="empty-basket">
            Корзина пустая. Перейдите в <a href="/catalog">каталог</a>.
        </div>
        <div v-else>
            <div class="basket__header">
                <Button @click="$router.push('/catalog')" :text-button="'Продолжить покупки'" :width="'200px'"/>
                <Button @click="clearBasket" :text-button="'Очистить корзину'" :width="'200px'"/>
            </div>
            <div class="list-product">
                <v-data-table
                        :headers="headers"
                        :items="products"
                        class="elevation-1"
                        hide-default-footer
                >
                    <template v-slot:item.title="{item}">
                        <div :style="{color: '#305496', display: 'flex'}">
                            <img :style="{height:'120px'}" :src="item.image[0]" alt="">
                            <div :style="{padding: '10px 0 30px 20px'}">
                                <span @click="transitionOnProduct(item)"
                                      :style="{cursor: 'pointer'}">{{item.name}}</span>
                                <div :style="{padding: '30px 0 0 0', cursor: 'pointer'}" @click="deleteProduct(item)">
                                    Удалить товар
                                    <v-icon color="black">mdi-delete</v-icon>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-slot:item.price="{item}">
                        <div>
                            {{calcPrice(item)}} BYN
                        </div>
                    </template>
                    <template v-slot:item.count="{item}">
                        <div>
                            <input type="number" v-model="item.countProduct" @change="changeCount">
                        </div>
                    </template>
                    <template v-slot:item.total="{item}">
                        <div>
                            {{Number(calcPrice(item).split(',')[0]) * Number(item.countProduct)}} BYN
                        </div>
                    </template>
                    <template v-slot:item.weight="{item}">
                        <div>
                            {{(+item.weight * +item.countProduct).toFixed(2)}} кг.
                        </div>
                    </template>
                    <template v-slot:footer>
                        <div :style="{ display:'flex', justifyContent: 'space-around', padding: '20px', backgroundColor:'#F2F2F2'}">
                            <div :style="{ marginLeft: 'auto'}">
                                Стоимость Вашего заказа: {{calcTotal()}} руб.
                            </div>
                            <div :style="{ margin: 'auto 30px'}">
                                Вес: {{calcWeight()}} кг.
                            </div>
                        </div>
                    </template>
                </v-data-table>
            </div>
            <Button @click="$router.push('/issue-order')" :width="'200px'" :style="{margin: '20px 20px 20px auto'}"/>
        </div>
    </div>
</template>

<script>
    import Button from "../../shared/elements/Button";

    export default {
        name: 'Basket',
        components: {
            Button
        },
        data: () => ({
            headers: [
                {
                    text: 'Товар',
                    align: 'left',
                    sortable: false,
                    value: 'title',
                },
                {
                    text: 'Цена за ед.',
                    value: 'price',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Количество',
                    value: 'count',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Итого',
                    value: 'total',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Вес',
                    value: 'weight',
                    sortable: false,
                    align: 'center'
                }
            ],
            products: [],
            emptyBasket: true
        }),
        methods: {
            transitionOnProduct(product) {
                this.$router.push(`catalog/${product.group.split(' ').join('').toLowerCase()}/${product._id}`);
            },
            asd() {
                console.log('asd')
            },
            calcPrice(item) {
                return item.countProduct < 10 ? item.priceBeforeTen : item.priceBeforeHundred
            },
            clearBasket() {
                localStorage.removeItem('basket');
                this.products = [];
                this.emptyBasket = true;
            },
            calcTotal() {
                let total = 0;
                this.products.forEach((item) => {
                    total = total + (item.countProduct * item.price)
                });
                return total
            },
            calcWeight() {
                let weight = 0;
                this.products.forEach((item) => {
                    weight = weight + (Number(item.weight) * item.countProduct)
                });
                return weight.toFixed(2)
            },
            deleteProduct(item) {
                let id = -1;
                this.products.findIndex((el, index) => {
                    if (el === item) {
                        id = index
                    }
                });
                this.products.splice(id, 1);
                localStorage.setItem('basket', JSON.stringify(this.products));
                if(this.products.length < 1){
                    this.emptyBasket = true;
                    localStorage.removeItem('basket')
                }
            },
            changeCount() {
                localStorage.setItem('basket', JSON.stringify(this.products));
            }
        },
        created() {
            this.emptyBasket = localStorage.getItem('basket') === null;
            if (!this.emptyBasket) {
                this.products = JSON.parse(localStorage.getItem('basket'))
            }
        }
    }
</script>

<style scoped>
    .basket__title {
        padding: 20px;
        font-size: 25px;
        font-weight: bold;
    }

    .basket__header {
        display: flex;
        justify-content: space-between;
        padding: 20px;
    }

    .empty-basket {
        padding: 20px;
        font-size: 25px;
    }

    input {
        outline: none;
        width: 30px;
        text-align: center;
    }
</style>