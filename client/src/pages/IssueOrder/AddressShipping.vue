<template>
    <div class="address-shipping">
        <div>
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
            <Button :text-button="'Продолжать'" @click="nextStep"/>
        </div>
    </div>
</template>

<script>
    import Button from "../../shared/elements/Button";

    export default {
        name: 'AddressShipping',
        components: {
            Button
        },
        computed: {
          dataUser(){
              return this.$store.state.User.login;
          }
        },
        watch: {
          dataUser(){
              console.log('dataUser')
              this.initFields();
          }
        },
        data: () => ({
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
            nextStep() {
                this.$emit('emitAddAddressShipping', this.address)
            },
            async initFields() {
                const dataUser = await this.$store.state.User.dataUser;
                this.address.country = dataUser.country;
                this.address.region = dataUser.region;
                this.address.city = dataUser.city;
                this.address.street = dataUser.street;
                this.address.home = dataUser.home;
                this.address.body = dataUser.body;
                this.address.apartment = dataUser.apartment;
                this.address.comment = dataUser.comment
            }
        },
        created() {
            this.initFields();
        }
    }
</script>

<style scoped>

</style>