<template>
    <v-app :style="{backgroundColor: '#F0F0F0'}">
        <div class="login">
            <div class="login-wrapper">
                <h2 :style="{marginBottom: '20px'}">Панель администратора</h2>
                <v-text-field
                        v-model="login"
                        label="Логин"
                        :outlined="true"
                        :persistent-hint="true"
                        :clearable="true"
                        :error="errors.auth"
                ></v-text-field>
                <v-text-field
                        v-model="password"
                        :error="errors.auth"
                        :messages="errors.auth ? 'Неправильный логин или пароль' : ''"
                        label="Пароль"
                        :outlined="true"
                        :persistent-hint="true"
                        :clearable="true"
                        type="password"
                ></v-text-field>
                <button class="button" @click="inputAdminPanel">Войти</button>
            </div>
        </div>
    </v-app>
</template>

<script>
    export default {
        name: 'Login',
        props: {
            url: {
                type: String,
                default: 'profile'
            }
        },
        data: () => ({
            login: '',
            password: '',
            errors: {
                auth: false
            }
        }),
        methods: {
            checkLogin(){
                return this.login === 'admin'
            },
            checkPassword(){
                return this.password === 'adminplasticod12345'
            },
            inputAdminPanel(){
                if(this.checkLogin() && this.checkPassword()){
                    this.errors.auth = false;
                    localStorage.setItem('admin', 'admin-plasticod');
                    this.$router.push('/admin/general')
                } else {
                    this.errors.auth = true;
                }
            }
        },
        created(){
            if(!localStorage.getItem('admin')){
                this.$router.push('/admin/login')
            } else {
                this.$router.push('/admin/general')
            }
        }
    }
</script>

<style scoped>
    .login {
        position: relative;
        width: 100%;
    }

    .login-wrapper {
        width: 450px;
        margin: auto;
        position: relative;
        padding-top: 80px;
    }

    .remember-password {
        position: absolute;
        right: 0;
        top: 180px;
    }

    .button {
        padding: 10px;
        background-color: #00B0F0;
        margin: 10px 10px 10px 0;
        width: 180px;
        color: white;
    }
</style>