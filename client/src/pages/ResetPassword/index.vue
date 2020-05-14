<template>
    <div class="reset-password">
        <div class="reset-password__wrapper">
            <h2>ВОССТАНОВИТЬ ПАРОЛЬ</h2>
            <v-text-field
                    v-model="email"
                    label="E-mail"
                    :outlined="true"
                    :persistent-hint="true"
                    :clearable="true"
            ></v-text-field>
            <button class="button">Сбросить пароль</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ResetPassword',
        data: () => ({
            email: ''
        })
    }
</script>

<style scoped>
    .reset-password {
        padding: 30px;
        width: 100%;
    }

    .reset-password__wrapper{
        width: 400px;
    }

    .button {
        padding: 10px;
        background-color: #00B0F0;
        margin: 10px 10px 10px 0;
        width: 180px;
        color: white;
    }
</style>