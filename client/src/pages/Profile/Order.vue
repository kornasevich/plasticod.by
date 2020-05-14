<template>
    <div class="order">
        <div @click="()=>this.$router.go(-1)" :style="{display: 'flex', color: '#305496', marginBottom: '10px', cursor: 'pointer'}">
            <v-icon color="#305496" left medium>mdi-arrow-left</v-icon>
            <div>Назад</div>
        </div>
        <h2>ПОДРОБНОСТИ ЗАКАЗА</h2>
        <hr>
        <div :style="{margin:'10px 0'}"><strong>Номер заказа:</strong> {{order.numberOrder}}</div>
        <div :style="{margin:'10px 0'}"><strong>Оформлен</strong> {{reformateData(order.basket[0].createdAt)}}
        </div>
        <v-data-table
                :headers="headers"
                :items="order.basket"
                class="elevation-1"
                hide-default-footer
        >
            <template v-slot:item.title="{item}">
                <div :style="{color: '#305496', display: 'flex'}" @click="transitionOnProduct(item)">
                    <img :style="{height:'120px'}" :src="item.image[0]" alt="">
                    <div :style="{padding: '10px 0 30px 20px'}">
                        <span :style="{cursor: 'pointer'}">{{item.name}}</span>
                    </div>
                </div>
            </template>
            <template v-slot:item.price="{item}">
                <div>
                    {{item.price}} BYN
                </div>
            </template>
            <template v-slot:item.countProduct="{item}">
                <div>
                    {{item.countProduct}}
                </div>
            </template>
            <template v-slot:item.total="{item}">
                <div>
                    {{Number(item.price) * Number(item.countProduct)}} BYN
                </div>
            </template>
            <template v-slot:footer>
                <div :style="{ display:'flex', justifyContent: 'space-around', padding: '20px', backgroundColor:'#F2F2F2'}">
                    <div :style="{ marginLeft: 'auto'}">
                        Стоимость заказа: {{calcTotal()}} руб.
                    </div>
                    <div :style="{ margin: 'auto 30px'}">
                        Вес: {{calcWeight()}} кг.
                    </div>
                </div>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import UserService from "../../services/user";

    export default {
        name: 'ProfileOrder',
        data: () => ({
            order: {},
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
                    value: 'countProduct',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Сумма',
                    value: 'total',
                    sortable: false,
                    align: 'center'
                }
            ]
        }),
        created() {
            UserService.getOrders(localStorage.getItem('token')).then(({data}) => {
                data.orders.forEach((order) => {
                    if (order.numberOrder === this.$router.history.current.params.id) {
                        this.order = order
                    }
                });
            }).catch(() => {
                this.errors.emptyOrders = true;
            });
        },
        methods: {
            reformateData(date) {
                const newFormateDate = +date.split('-')[2].split('T')[0] + '.' + date.split('-')[1] + '.' + date.split('-')[0];
                const newFormateTimes = date.split('-')[2].split('T')[1].split('.')[0];
                return newFormateDate + ' ' + newFormateTimes
            },
            calcTotal() {
                let total = 0;
                this.order.basket.forEach((item) => {
                    total = total + (item.countProduct * item.price)
                });
                return total
            },
            calcWeight() {
                let weight = 0;
                this.order.basket.forEach((item) => {
                    weight = weight + (Number(item.weight) * item.countProduct)
                });
                return weight.toFixed(2)
            },
            transitionOnProduct(product) {
                this.$router.push(`/catalog/${product.group.split(' ').join('').toLowerCase()}/${product._id}`);
            },
        }
    }
</script>

<style scoped>
    .order {
        padding: 30px;
    }
</style>