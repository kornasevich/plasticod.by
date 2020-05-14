<template>
    <v-app>
        <div class="admin-panel-news">
            <v-app id="inspire">
                <v-card>
                    <v-toolbar color="#00B0F0" dark>
                        <v-toolbar-title>Управление заказами</v-toolbar-title>
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
                    <h2 :style="{marginBottom: '30px'}">Заказы</h2>
                    <v-data-table
                            :headers="headers"
                            :items="orders"
                            class="elevation-1"
                            hide-default-footer
                            v-if="orders.length > 0"
                    >
                        <template v-slot:item.number="{item}">
                            <div
                                    :style="{color: '#305496', display: 'flex', cursor: 'pointer'}"
                                    @click="transitionOrder(item.number)"
                            >
                                {{item.number}}
                            </div>
                        </template>
                        <template v-slot:item.status="{item}">
                            <div>
                                <select name="status" @change="handleStatus($event, item.id)">
                                    <option value="open" :selected="item.status === 'Открытый'" >Открытый</option>
                                    <option value="close" :selected="item.status === 'Закрытый'" >Закрытый</option>
                                </select>
                            </div>
                        </template>
                        <template v-slot:item.delivery="{item}">
                            <div>
                                {{item.delivery}}
                            </div>
                        </template>
                        <template v-slot:item.customer="{item}">
                            <div>
                                {{item.customer}}
                                <p>{{item.email}}</p>
                            </div>
                        </template>
                        <template v-slot:item.date="{item}">
                            <div>
                                {{reformateData(item.date)}}
                            </div>
                        </template>
                        <template v-slot:item.total="{item}">
                            <div>
                                {{item.total}} BYN
                            </div>
                        </template>
                    </v-data-table>

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
    import UserService from "../../../services/user";
    import axios from 'axios';

    export default {
        name: 'Orders',
        components: {},
        data: () => ({
            snackbar: false,
            allUsers: [],
            orders: [],
            headers: [
                {
                    text: '№ Заказа',
                    align: 'start',
                    value: 'number',
                    width: 120,
                    sortable: true
                },
                {
                    text: 'Статус',
                    value: 'status',
                    width: 150
                },
                {
                    text: 'Способ доставки',
                    value: 'delivery',
                    width: 200
                },
                {text: 'Покупатель', value: 'customer'},
                {text: 'Дата', value: 'date', sortable: true},
                {text: 'Итого', value: 'total'}
            ],
        }),
        created() {
            UserService.getAllUsers().then(({data}) => {
                this.allUsers = [...data.users];
                let listOrders = [];
                data.users.forEach((user) => {
                    if (user.orders.length > 0) {
                        listOrders.push(...user.orders)
                    }
                });
                this.orders = listOrders.map((order) => {
                    let total = 0;
                    if(order.basket.length > 1){
                        total = order.basket.reduce((next, current)=>{
                            return (current.price * current.countProduct) + (next.price * next.countProduct)
                        })
                    } else {
                        total = order.basket[0].countProduct * order.basket[0].price
                    }
                    return {
                        number: order.numberOrder,
                        status: order.status === 'open' ? "Открытый" : "Закрытый",
                        customer: order.dataUser.fullName,
                        delivery: order.shipping === 'transportCompany' ? "Транспортной компанией" : "Самовывоз",
                        date: order.createdAt,
                        total: total,
                        email: order.dataUser.email,
                        id: order.id
                    }
                });
                this.orders.reverse();
            })
        },
        methods: {
            transitionOrder(number) {
                this.$router.push(`/admin/orders/${number}`)
            },
            reformateData(date) {
                const newFormateDate = +date.split('-')[2].split('T')[0] + '.' + date.split('-')[1] + '.' + date.split('-')[0];
                const newFormateTimes = date.split('-')[2].split('T')[1].split('.')[0];
                return newFormateDate + ' ' + newFormateTimes
            },
            handleStatus(event, id){
                console.log(event.target.value, id);
                this.allUsers.forEach((user)=>{
                    user.orders.forEach((order)=>{
                        if(order.id === id){
                            order.status = event.target.value
                        }
                    })
                });
            },
            save(){
                axios.post('http://localhost:5000/api/user/update-orders', {
                    users: this.allUsers
                })
                this.snackbar = true;
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