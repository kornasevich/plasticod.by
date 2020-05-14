<template>
    <div class="admin-panel">
        <SidebarMenu :menu="menu" :collapsed="true"/>
        <div class="admin-panel-wrapper">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import {SidebarMenu} from 'vue-sidebar-menu'

    export default {
        name: 'AdminPanel',
        components: {
            SidebarMenu
        },
        created(){
            if(!localStorage.getItem('admin')){
                this.$router.push('/admin/login')
            } else {
                this.$router.push('/admin/general')
            }
        },
        data() {
            return {
                menu: [
                    {
                        header: true,
                        title: 'Plasticod.by',
                        hiddenOnCollapse: true
                    },
                    {
                        href: '/admin/general',
                        title: 'Главная',
                        icon: 'fa fa-home'
                    },
                    {
                        href: '/admin/catalog',
                        title: 'Каталог',
                        icon: 'fa fa-store'
                    },
                    {
                        href: '/admin/about',
                        title: 'О нас',
                        icon: 'fa fa-file-alt'
                    },
                    {
                        href: '/admin/example-using',
                        title: 'Примеры использования',
                        icon: 'fa fa-images'
                    },
                    {
                        href: '/admin/address-shipping',
                        title: 'Условия доставки и оплаты',
                        icon: 'fa fa-truck'
                    },
                    {
                        href: '/admin/news',
                        title: 'Новости',
                        icon: 'fa fa-newspaper'
                    },
                    {
                        href: '/admin/buy-retail',
                        title: 'Купить в розницу',
                        icon: 'fa fa-money-bill-alt'
                    },
                    {
                        href: '/admin/contacts',
                        title: 'Контакты',
                        icon: 'fa fa-address-book'
                    },
                    {
                        href: '/admin/orders',
                        title: 'Управление заказами',
                        icon: 'fa fa-clipboard-list'
                    }
                ]
            }
        },
    }
</script>

<style scoped>
    .admin-panel-wrapper {
        width: 80%;
        margin: 0 auto;
    }
</style>