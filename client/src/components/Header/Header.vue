<template>
    <div class="header">
        <div class="header__authorization-basket">
            <div v-if="!$store.state.User.login" :style="{width: 'fit-content',marginLeft: 'auto'}">
                <button class="header__authorization-basket__basket button" @click="$router.push('/basket')">
                    <v-icon color="black" left small>mdi-basket</v-icon>
                    Корзина
                </button>
                <button class="header__authorization-basket__authorization button" @click="openSubButton">
                    Вход/Регистрация
                </button>
                <div class="header__wrapper-for-login-registration" v-if="isLoginView">
                    <button class="header__wrapper-for-login-registration__login button" @click="transitionOnPageLogin">
                        Войти
                    </button>
                    <button class="header__wrapper-for-login-registration__registration button"
                            @click="()=>{
                                this.isLoginView = false;
                                $router.push('/registration')
                            }">Регистрация
                    </button>
                </div>
            </div>

            <div v-else :style="{width: 'fit-content',marginLeft: 'auto'}">
                <button class="header__authorization-basket__basket button" @click="$router.push('/basket')">
                    <v-icon color="black" left small>mdi-basket</v-icon>
                    Корзина
                </button>
                <button class="header__authorization-basket__authorization button" @click="openDropdown">
                    Мой профиль
                </button>
                <div v-if="isDropdown"
                     :style="{position: 'absolute', right: 0, backgroundColor: 'white', width: '179px',marginTop: '1px', zIndex: 999}">
                    <div class="dropdown-item">{{$store.state.User.dataUser.nameCompany}}</div>
                    <div class="dropdown-item" @click="()=>{
                        $router.push('/profile')
                        this.isDropdown = false
                    }">Личный кабинет
                    </div>
                    <div class="dropdown-item" @click="()=>{
                        $router.push('/profile/orders')
                        this.isDropdown = false
                    }">Заказы
                    </div>
                    <div class="dropdown-item" @click="()=>{
                        $router.push('/profile/information-support')
                        this.isDropdown = false
                    }">Информ.поддержка
                    </div>
                    <div class="dropdown-item" @click="logout">Выйти</div>
                </div>
            </div>

        </div>
        <div class="header__contacts">
            <div class="header__contacts__left-part">
                <h1>Пластиковые органайзеры<br> с выдвижными ячейками</h1>
                <h3>оптовые продажи {{$store.state.General.numberPhone}}; info@plasticod.by</h3>
            </div>
            <div class="header__contacts__right-part">
                <div class="header__contacts__right-part__logo" @click="$router.push('/')">
                    PLASTIC<br>Organizers<br>with<br>Drawers
                </div>
            </div>
        </div>
        <div v-if="currentRoute === 'about'" class="header__slider">
            <v-carousel
                    cycle
                    height="400"
                    hide-delimiter-background
                    show-arrows-on-hover
            >
                <v-carousel-item
                        v-for="(image, i) in this.$store.state.General.images"
                        :key="i"
                >
                    <img class="carousel-img" :src="image" :alt="`slide-${i}`">
                </v-carousel-item>
            </v-carousel>
        </div>
        <div class="header__menu">
            <button
                    class="button"
                    :class="[currentRoute === item.id ? 'active' : '']"
                    v-for="item in menu"
                    :key="item.label"
                    @click="transitionOnRoute(item.link, item.id)"
            >
                {{item.label}}
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        data: () => ({
            colors: [
                'indigo',
                'warning',
                'pink darken-2',
                'red lighten-1',
                'deep-purple accent-4',
            ],
            slides: [
                'First',
                'Second',
                'Third',
                'Fourth',
                'Fifth',
            ],
            menu: [
                {label: 'Каталог', link: '/catalog', id: 'catalog'},
                {label: 'О нас', link: '/about', id: 'about'},
                {label: 'Примеры использования', link: '/examples-using', id: 'examples-using'},
                {label: 'Условия доставки и оплаты', link: '/shipping-payment', id: 'shipping-payment'},
                {label: 'Новости', link: '/news', id: 'news'},
                {label: 'Купить в розницу', link: '/buy-retail', id: 'buy-retail'},
                {label: 'Контакты', link: '/contacts', id: 'contacts'}
            ],
            currentRoute: '',
            isLoginView: false,
            isDropdown: false
        }),
        methods: {
            transitionOnRoute(link, id) {
                this.$router.push(link);
                this.$store.commit('setCurrentRoute', id);
                this.currentRoute = id;
            },
            openSubButton() {
                this.isLoginView = !this.isLoginView;
            },
            transitionOnPageLogin() {
                this.$router.push('/login');
                this.isLoginView = false;
            },
            openDropdown() {
                this.isDropdown = !this.isDropdown
            },
            logout() {
                localStorage.removeItem('token');
                this.$store.commit('setDataUser', {});
                this.$store.commit('setLogin', false);
                this.$store.commit('setToken', '');
                this.isDropdown = false;
                this.$router.push('/')
            }
        },
        created() {
            this.currentRoute = this.$router.history.current.name;
        }
    }
</script>

<style scoped>
    .header__authorization-basket {
        margin-left: auto;
        border-bottom: 1px solid #000080;
        border-right: 1px solid black;
        display: flex;
    }

    .button {
        padding: 3px 10px;
        background-color: #00B0F0;
        border-left: 1px solid black;
        border-top: 1px solid black;
        margin-left: auto;
        width: 180px;
    }

    .button:hover {
        background-color: #305496;
    }

    .header__contacts {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-left: 1px solid #000080;
        border-right: 1px solid #000080;
    }

    .header__contacts__left-part {
        width: fit-content;
        padding: 0 20px;
    }

    .header__contacts__left-part h1 {
        text-align: center;
        font-size: 47px;
        color: #0070C0;
        position: relative;
        top: 17px;
    }

    .header__contacts__left-part h3 {
        font-size: 22px;
        color: #00B0F0;
        position: relative;
        top: 3px;
    }

    .header__contacts__right-part {
        padding: 0 30px;
    }

    .header__contacts__right-part__logo {
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        color: #036BCF;
        line-height: 26px;
        padding: 4px;
        border: 5px solid #036BCF;
    }

    .header__menu {
        display: flex;
        color: white;
        font-size: 15px;
        border-bottom: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;
    }

    .header__menu .button:first-child {
        border-left: none;
    }

    .header__menu .button:last-child {
        border-right: 1px solid #00B0F0;
    }

    .active {
        background-color: #305496;
    }

    .dropdown-item {
        background-color: #0070C0;
        color: white;
        text-align: center;
        padding: 7px;
        font-size: 13px;
        border: 1px solid white;
        cursor: pointer;
    }

    .dropdown-item:first-child {
        cursor: default;

    }

    .dropdown-item:hover {
        background-color: #00B0F0;
    }

    .dropdown-item:first-child:hover {
        background-color: #0070C0;
    }

    .carousel-img{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        display: block;
    }
</style>