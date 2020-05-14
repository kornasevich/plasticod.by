<template>
    <div>

        <v-expansion-panels v-model="isOpen" accordion light>

            <v-expansion-panel v-model="isOpen">
                <v-expansion-panel-header color="#0070C0"><span :style="{color: 'white', textAlign: 'center'}">Регистрация постоянного клиента</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-app>
                        <v-text-field v-model="valueFields.email" label="E-mail *">asd</v-text-field>
                        <v-text-field v-model="password" label="Пароль *"></v-text-field>
                        <v-text-field v-model="confirmPassword"
                                      label="Подтвреждение пароля *"></v-text-field>
                        <v-text-field v-model="valueFields.nameCompany"
                                      label="Наименование оргинизации, ИП *"></v-text-field>
                        <v-text-field v-model="valueFields.legalAddress" label="Юридический адрес *"></v-text-field>
                        <v-text-field v-model="valueFields.postAddress" label="Почтовый адрес *"></v-text-field>
                        <v-text-field v-model="valueFields.postcode" label="Почтовый индекс*"></v-text-field>
                        <v-text-field v-model="valueFields.unp" label="УНП(№ свидетельства) *"></v-text-field>
                        <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="100px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                        v-model="date"
                                        label="Дата выдачи"
                                        readonly
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                        </v-menu>
                        <v-text-field v-model="valueFields.whoIssued" label="Кем выдано"></v-text-field>
                        <v-text-field v-model="valueFields.paymentAccount" label="Расчётный счёт"></v-text-field>
                        <v-text-field v-model="valueFields.nameBank" label="Наименование банка"></v-text-field>
                        <v-text-field v-model="valueFields.codeBank" label="Код банка"></v-text-field>
                        <v-text-field v-model="valueFields.addressBank" label="Адрес банка"></v-text-field>
                        <v-text-field v-model="valueFields.fullName" label="Ф.И.О. контактного лица *"></v-text-field>
                        <v-text-field v-model="valueFields.phoneNumber"
                                      label="Телефон (Пример: (029) 1111111) *"></v-text-field>
                    </v-app>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-header color="#0070C0"><span :style="{color: 'white',textAlign : 'center'}">Адрес доставки</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-col class="d-flex flex-column" cols="12" sm="6">
                        <v-select
                                :items="countrys"
                                v-model="address.country"
                                filled
                                label="Страна"
                        ></v-select>
                        <v-text-field
                                v-model="address.region"
                                label="Область/район"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="address.city"
                                label="Город"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="address.street"
                                label="Улица"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="address.home"
                                label="Дом"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="address.body"
                                label="Корпус"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="address.apartment"
                                label="Офис, помещение, квартира:"
                                required
                        ></v-text-field>
                        <v-textarea
                                outlined
                                name="input-7-4"
                                label="Комментарий"
                                :v-model="address.comment"
                        ></v-textarea>
                    </v-col>

                    <div :style="{margin: '-20px 0 0 20px'}">
                        Ваши персональные данные будут использоваться для обработки ваших заказов, упрощения вашей
                        работы с сайтом
                        и для других целей, описанных в нашей политика конфиденциальности
                    </div>
                    <v-checkbox
                            :style="{margin: '10px 0 0 20px'}"
                            v-model="iAgree"
                            label="Я прочитал (-а) и соглашаюсь с политикой конфиденциальности"
                            required
                    ></v-checkbox>

                    <div class="button" @click="registrationUser">
                        Регистрация
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
    import UserService from "../../services/user";

    export default {
        name: 'Registration',
        data: () => ({
            date: new Date().toISOString().substr(0, 10),
            email: '',
            iAgree: false,
            password: '',
            confirmPassword: '',
            menu: false,
            modal: false,
            menu2: false,
            isOpen: 0,
            valueFields: {
                nameCompany: '',
                legalAddress: '',
                postAddress: '',
                postcode: '',
                email: '',
                unp: '',
                whoIssued: '',
                paymentAccount: '',
                nameBank: '',
                codeBank: '',
                addressBank: '',
                fullName: '',
                phoneNumber: ''
            },
            countrys: [
                "Австрия",
                "Андорра",
                "Албания",
                "Беларусь",
                "Бельгия",
                "Болгария",
                "Босния и Герцеговина",
                "Ватикан",
                "Великобритания",
                "Венгрия",
                "Германия",
                "Гибралтар",
                "Греция",
                "Дания",
                "Ирландия",
                "Исландия",
                "Испания",
                "Италия",
                "Латвия",
                "Литва",
                "Лихтенштейн",
                "Люксембург",
                "Македония",
                "Мальта",
                "Молдавия",
                "Монако",
                "Нидерланды",
                "Норвегия",
                "Польша",
                "Португалия",
                "Россия",
                "Румыния",
                "Сан - Марино",
                "Сербия и Черногория",
                "Словакия",
                "Словения",
                "Украина",
                "Фарерские острова",
                "Финляндия",
                "Франция",
                "Хорватия",
                "Черногория",
                "Чехия",
                "Швейцария",
                "Швеция",
                "Шпицберген",
                "Норвегия",
                "Эстония"
            ],
            address: {
                country: 'Беларусь',
                region: '',
                city: '',
                street: '',
                home: '',
                body: '',
                apartment: '',
                comment: ''
            }
        }),
        methods: {
            registrationUser() {
                UserService.insertUser({
                    ...this.valueFields, ...this.address, password: this.password, orders: []
                });
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>
    .button {
        padding: 13px;
        margin: 20px;
        width: 250px;
        height: 50px;
        background-color: #00B0F0;
        color: white;
        text-align: center;
    }

    .button:hover {
        background-color: #006C9C;
    }
</style>