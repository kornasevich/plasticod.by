<template>
    <div class="profile">
        <h2 class="profile__title">ЛИЧНЫЙ КАБИНЕТ</h2>
        <div class="profile-item">
            <h2 @click="$router.push('/profile/settings')">НАСТРОЙКИ ПРОФИЛЯ</h2>
            <div>В данном разделе вы моежете изменить данные для входа в личный кабинет, адрес доставки ,сведения для
                договора и другую личную информацию.
            </div>
        </div>
        <div class="profile-item">
            <h2 @click="$router.push('/profile/orders')">ЗАКАЗЫ</h2>
            <div>В данном разделе вы моежете посмотреть список всех ваших заказов и узнать статсу нужного, просмотреть
                детальную информацию данные для входа в личный кабинет, адрес доставки ,сведения для договора и другую
                личную информацию.
            </div>
        </div>
        <div class="profile-item" :style="{marginBottom: '100px'}">
            <h2 @click="$router.push('/profile/information-support')">ИНФОРМАЦИОННАЯ ПОДДЕРЖКА</h2>
            <div>В данном разделе вы моежете скачать интересующие каталоги, прайсы и другую полезную информацию.</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Profile',
    }
</script>

<style scoped>
    .profile {
        padding-left: 30px;
    }

    .profile__title {
        padding: 15px 0 0 0;
    }

    .profile-item h2 {
        margin-top: 40px;
        width: fit-content;
        cursor: pointer;
    }

    .profile-item h2:hover {
        color: #305496;
    }

    .profile-item div {
        font-size: 12px;
        margin-top: 5px;
    }
</style>