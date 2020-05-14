<template>
    <div class="issue-order">
        <div v-if="!autorizationUser"
             :style="{display: 'flex',alignItems: 'center', padding: '50px 260px', width: 'fit-content'}">
            <span>Войти как зарегестированный пользователь ?</span>
            <Button :text-button="'Да'" :width="'80px'" :style="{marginLeft: '30px'}" @click="()=>{
                this.autorizationUser = true
                this.activeStep = [0]
                }"/>
            <Button :text-button="'Нет'" :width="'80px'" :style="{marginLeft: '30px'}"
                    @click="()=>{
                this.autorizationUser = true
                this.activeStep = [1]
                }"/>
        </div>
        <div v-if="autorizationUser">
            <v-expansion-panels multiple accordion light v-model="activeStep">
                <v-expansion-panel v-model="activeStep">
                    <v-expansion-panel-header color="#0070C0"><span :style="{color: 'white'}">1. Вход для постоянного клиента</span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <Login :url="'/issue-order'" @emitLogin="login"/>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-header color="#0070C0"><span :style="{color: 'white'}">2. Покупатель.</span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="buyer">
                            <v-app>
                                <v-text-field
                                        v-model="valueFields.nameCompany"
                                        label="Наименование оргинизации, ИП *"
                                        :error="errors.nameCompany"
                                        :messages="errors.nameCompany ? 'Поле не заполнено' : ''"/>
                                <v-text-field
                                        v-model="valueFields.legalAddress"
                                        label="Юридический адрес *"
                                        :error="errors.legalAddress"
                                        :messages="errors.legalAddress ? 'Поле не заполнено' : ''"
                                />
                                <v-text-field
                                        v-model="valueFields.postAddress"
                                        label="Почтовый адрес *"
                                        :error="errors.postAddress"
                                        :messages="errors.postAddress ? 'Поле не заполнено' : ''"
                                />
                                <v-text-field
                                        v-model="valueFields.postcode"
                                        label="Почтовый индекс *"
                                        :error="errors.postcode"
                                        :messages="errors.postcode ? 'Поле не заполнено' : ''"
                                />
                                <v-text-field
                                        v-model="valueFields.email"
                                        label="E-mail *"
                                        :rules="[rules.required, rules.email]"
                                        :error="errors.email"
                                        :messages="errors.email ? 'Поле не заполнено' : ''"
                                />
                                <v-text-field
                                        v-model="valueFields.unp"
                                        label="УНП(№ свидетельства) *"
                                        :error="errors.unp"
                                        :messages="errors.unp ? 'Поле не заполнено' : ''"
                                />
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
                                    <v-date-picker
                                            v-model="date"
                                            @input="menu2 = false"
                                    />
                                </v-menu>
                                <v-text-field
                                        v-model="valueFields.whoIssued"
                                        label="Кем выдано"
                                />
                                <v-text-field
                                        v-model="valueFields.paymentAccount"
                                        label="Расчётный счёт"
                                />
                                <v-text-field
                                        v-model="valueFields.nameBank" label="Наименование банка"
                                />
                                <v-text-field
                                        v-model="valueFields.codeBank" label="Код банка"
                                />
                                <v-text-field
                                        v-model="valueFields.addressBank" label="Адрес банка"
                                />
                                <v-text-field
                                        v-model="valueFields.fullName"
                                        label="Ф.И.О. контактного лица *"
                                        :error="errors.fullName"
                                        :messages="errors.fullName ? 'Поле не заполнено' : ''"
                                />
                                <v-text-field
                                        v-model="valueFields.phoneNumber"
                                        label="Телефон (Пример: (029) 1111111) *"
                                        :error="errors.phoneNumber"
                                        :messages="errors.phoneNumber ? 'Поле не заполнено' : ''"
                                />
                            </v-app>
                        </div>
                        <Button :text-button="'Продолжить'" :width="'180px'" @click="()=>{
                            this.valueFields.nameCompany ? this.errors.nameCompany = false : this.errors.nameCompany = true
                            this.valueFields.legalAddress ? this.errors.legalAddress = false : this.errors.legalAddress = true
                            this.valueFields.postAddress ? this.errors.postAddress = false : this.errors.postAddress = true
                            this.valueFields.postcode ? this.errors.postcode = false : this.errors.postcode = true
                            this.valueFields.email ? this.errors.email = false : this.errors.email = true
                            this.valueFields.unp ? this.errors.unp = false : this.errors.unp = true
                            this.valueFields.fullName ? this.errors.fullName = false : this.errors.fullName = true
                            this.valueFields.phoneNumber ? this.errors.phoneNumber = false : this.errors.phoneNumber = true

                            if(
                                this.valueFields.nameCompany &&
                                this.valueFields.legalAddress &&
                                this.valueFields.postAddress &&
                                this.valueFields.postcode &&
                                this.valueFields.email &&
                                this.valueFields.unp &&
                                this.valueFields.fullName &&
                                this.valueFields.phoneNumber
                            ){

                            this.activeStep = [2]
                            }
                        }"/>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-header color="#0070C0"><span :style="{color: 'white'}">3. Предложение о регистраии в качестве постоянного клиента.</span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div :style="{display: 'flex', alignItems: 'center',margin: '30px auto', width: 'fit-content'}">
                            <span>Зарегистрировать как постоянного клинета ?</span>
                            <Button :text-button="'Да'" :width="'80px'" :style="{marginLeft: '30px'}"
                                    @click="()=>{
                                        this.activeStep = [3]
                                    }"/>
                            <Button :text-button="'Нет'" :width="'80px'" :style="{marginLeft: '30px'}"
                                    @click="()=>{
                                        this.activeStep = [4]
                                    }"/>
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-header color="#0070C0">
                        <span :style="{color: 'white'}">4. Регистрация постоянного клиента.</span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div :style="{margin: '30px auto', width: '400px'}">
                            <v-text-field
                                    v-model="valueFields.email"
                                    :error="errors.emailExist"
                                    :messages="errors.emailExist ? 'Пользователь с такой почтой существует' : ''"
                                    label="E-mail"
                                    :outlined="true"
                                    :persistent-hint="true"
                                    :clearable="true"
                            ></v-text-field>
                            <v-text-field
                                    v-model="password"
                                    label="Пароль"
                                    :outlined="true"
                                    :persistent-hint="true"
                                    :clearable="true"
                                    type="password"
                            ></v-text-field>
                            <v-text-field
                                    :error="errors.matchPassword"
                                    :messages="errors.matchPassword ? 'Пароли не совпадают' : ''"
                                    v-model="checkPassword"
                                    label="Подтверждение пароля"
                                    :outlined="true"
                                    :persistent-hint="true"
                                    :clearable="true"
                                    type="password"
                            ></v-text-field>
                            <Button :text-button="'Продолжить'" :width="'180px'" @click="registrationUser"/>
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-header color="#0070C0">
                        <span :style="{color: 'white'}">5. Способ доставки.</span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="delivery-method">
                            <div class="delivery-method__title">
                                По г.Минску доставка не осуществляется. Возможен только самовывоз.
                            </div>
                            <v-radio-group v-model="shipping" column>
                                <v-radio
                                        label="Самовывоз"
                                        color="black"
                                        value="pickup"
                                ></v-radio>
                                <v-radio
                                        label="Транспортной компанией"
                                        color="black"
                                        value="transportCompany"
                                ></v-radio>
                            </v-radio-group>
                            <div :style="{marginBottom: '30px'}">
                                Стоимость доставки транспортной компанией будет сообщена дополнительно после оформления
                                заказа.<br><br>

                                Доставка осуществляется по тарифам <a href="/shipping-payment">грузоперевозчика</a>.<br>
                                По договорённости с покупателем стоимость доставки может быть:<br>
                                1. Включена в стоимость товара;<br>
                                2. Оформлена отдельным актом выполненных работ, который будет передаваться "Покупателю"
                                вместе с документами на товар.<br>
                            </div>
                            <Button :text-button="'Продолжить'" :width="'180px'" @click="activeStep = [5]"/>
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-header color="#0070C0">
                        <span :style="{color: 'white'}">6. Адрес доставки.</span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <AddressShipping @emitAddAddressShipping="addAddressShipping"/>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-header color="#0070C0">
                        <span :style="{color: 'white'}">7. Подтверждение заказа.</span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <ConfirmationOrder @emitSendOrder="sendOrder"/>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
        <v-snackbar
                v-model="snackbar"
                color="success"
                :right="true"
                :top="true"
        >
            Заказ успешно оформлен!
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
    import Button from "../../shared/elements/Button";
    import Login from "../Login";
    import AddressShipping from "./AddressShipping";
    import ConfirmationOrder from "./ConfirmationOrder";
    import UserService from "../../services/user";
    import GeneralService from "../../services/general";
    import axios from 'axios';

    export default {
        name: 'IssueOrder',
        components: {
            Button,
            Login,
            AddressShipping,
            ConfirmationOrder
        },
        data: () => ({
            errors: {
                matchPassword: false,
                emailExist: false,
                fullName: false,
                phoneNumber: false,
                nameCompany: false,
                legalAddress: false,
                postAddress: false,
                postcode: false,
                email: false,
                unp: false
            },
            autorizationUser: false,
            stepOne: false,
            stepTwo: false,
            snackbar: false,
            email: '',
            password: '',
            checkPassword: '',
            activeStep: [0],
            shipping: 'pickup',
            addressShipping: {
                country: 'Беларусь',
                region: '',
                city: '',
                street: '',
                home: '',
                body: '',
                apartment: '',
                comment: ''
            },
            date: new Date().toISOString().substr(0, 10),
            menu2: false,
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
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            }
        }),
        created() {
            if (localStorage.getItem('token')) {
                this.autorizationUser = true;
                this.activeStep.splice(0, 1);
                this.activeStep.push(4);
            } else {
                this.activeStep(0)
            }


            if (Object.values(this.$store.state.User.dataUser).length > 0) {
                const dataUser = this.$store.state.User.dataUser;
                this.valueFields.nameCompany = dataUser.nameCompany;
                this.valueFields.legalAddress = dataUser.legalAddress;
                this.valueFields.postAddress = dataUser.postAddress;
                this.valueFields.postcode = dataUser.postcode;
                this.valueFields.email = dataUser.email;
                this.valueFields.unp = dataUser.unp;
                this.valueFields.whoIssued = dataUser.whoIssued;
                this.valueFields.paymentAccount = dataUser.paymentAccount;
                this.valueFields.nameBank = dataUser.nameBank;
                this.valueFields.codeBank = dataUser.codeBank;
                this.valueFields.addressBank = dataUser.addressBank;
                this.valueFields.fullName = dataUser.fullName;
                this.valueFields.phoneNumber = dataUser.phoneNumber;
            }
        },
        methods: {
            registrationUser() {
                if (this.checkPassword === this.password) {
                    this.errors.matchPassword = false;
                    UserService.insertUser({
                        ...this.valueFields, ...this.address, password: this.password, orders: []
                    }).then(() => {
                        this.errors.emailExist = false;
                        UserService.getUser(this.valueFields.email, this.password).then(({data, status}) => {
                            if (status === 200) {
                                localStorage.setItem('token', data.token);
                                this.$store.commit('setLogin', true);
                                this.$store.commit('setDataUser', data);
                                this.$store.commit('setToken', data.token);

                                this.activeStep = [4];
                            }
                        })
                    }).catch(() => {
                        this.errors.emailExist = true;
                    })
                } else {
                    this.errors.matchPassword = true;
                }
            },
            addAddressShipping(addressShipping) {
                this.addressShipping = addressShipping;
                if (localStorage.getItem('token')) {
                    UserService
                        .updateUser(localStorage.getItem('token'), {...addressShipping})
                        .then(() => {
                            let dataUser = {...this.$store.state.User.dataUser, ...addressShipping};
                            this.$store.commit('setDataUser', dataUser)
                        })
                }
                this.activeStep = [6];
            },
            login() {
                this.autorizationUser = true;
                this.activeStep = [4];
            },
            sendOrder() {
                if (localStorage.getItem('token')) {
                    const dataUser = {...this.valueFields, ...this.addressShipping};
                    const basket = JSON.parse(localStorage.getItem('basket'));
                    const token = localStorage.getItem('token');
                    GeneralService.getGeneral().then(({data}) => {
                        UserService.addOrder(token, {
                            dataUser: dataUser,
                            basket: basket,
                            shipping: this.shipping,
                            status: "open",
                            numberOrder: data[0].numberOrder
                        });
                        return data
                    }).then((response) => {
                        GeneralService.updateGeneral({
                            numberOrder: String(Number(response[0].numberOrder) + 1),
                            id: response[0]._id
                        })
                    });

                    this.snackbar = true;
                    setTimeout(() => {
                        this.snackbar = false;
                    }, 3000);

                    setTimeout(() => {
                        UserService.loadDataForUser(token).then(({data}) => {
                            this.$store.commit('setDataUser', data)
                        }).then(() => {
                            localStorage.removeItem('basket');
                            this.$router.push('catalog')
                        })
                    }, 3000)
                } else {
                    this.snackbar = true;
                    localStorage.removeItem('basket');
                    setTimeout(() => {
                        this.snackbar = false;
                        this.$router.push('catalog')
                    }, 3000);
                }
                GeneralService.getGeneral().then(({data}) => {
                    axios.post('http://localhost:5000/service/post-mail', {
                        ...this.valueFields,
                        ...this.addressShipping,
                        shipping: this.shipping,
                        numberOrder: data[0].numberOrder
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .issue-order {
        width: 100%;

    }

    .buyer {
        width: 500px;
    }

    .delivery-method {
        padding: 20px;
    }
</style>