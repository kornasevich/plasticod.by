`<template>
    <div class="buy-at-retail">
        <div class="buy-at-retail__description">
            Представленные на нашем сайте пластиковые органайзеры с выдвижными ячейками можно приобрести у наших
            торговых партнёров по следующим адресам:
        </div>
        <ol class="buy-at-retail__list">
            <li class="buy-at-retail__list__address" v-for="address in listAddress" :key="address">
                {{address}}
            </li>
        </ol>
    </div>
</template>

<script>
    import BuyRetailService from "../../services/buy-retail";
    export default {
        name: 'buyAtRetail',
        data: () => ({
            listAddress: []
        }),
        created() {
            BuyRetailService.getBuyRetail().then(({data})=>{
                this.listAddress = data[0].address
            })
        }
    }
</script>

<style scoped>
    .buy-at-retail {
        padding: 20px;
    }
</style>