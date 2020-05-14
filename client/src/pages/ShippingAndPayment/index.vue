<template>
    <div class="shipping-and-payment">
        <div class="shipping-and-payment__title">
            Доставка
        </div>
        <div class="shipping-and-payment__shipping">
            Мы работаем с юридическими лицами и индивидуальными предпринимателями. <br>
            Получить приобретённый товар можно по адресу: {{address}}
            <transition-group name="thumbnailfade" tag="div">
                <img v-for="thumb in filteredImages"
                     :key="thumb.id"
                     @click="showLightbox(thumb.name)"
                     :src="thumb.name"
                     :alt="thumb.alt"
                     :title="thumb.alt"/>
            </transition-group>

            <lightbox id="mylightbox"
                      ref="lightbox"
                      :images="images"
                      :filter="galleryFilter"
                      :timeoutDuration="5000"
            />
        </div>
        <div class="demarcation-strip"/>

        <div class="shipping-and-payment__about-company">
            <div class="shipping-and-payment__about-company__logo">
                <img src="../../assets/autospace.png" alt="AutoSpace">
            </div>
            <div class="shipping-and-payment__about-company__description">
                Доставка товара по г.Минску не осуществляется. <br>
                Доставка приобретённого товара по регионам республики производится с помощью компании "Автоспейс".<br>
                С условиями работы и географией доставки компании "Автоспейс" можно ознакомиться перейдя по
                <a href="http://www.autospace.by/about/gruzoperevozki">ссылке</a>.<br>
                Стоимость доставки согласовывается дополнительно после оформления заказа.<br>
                По договорённости с покупателем стоимость доставки может быть:<br>
                1.Включена в стоимость товара;<br>
                2. Оформлена отдельным актом выполненных работ, который будет передаваться "Покупателю" вместе с документами на товар.<br>
            </div>
        </div>

        <div class="demarcation-strip"/>

        <div class="shipping-and-payment__sentence">
            Мы готовы передать товар любой другой транспортной компании с которой сотрудничает "Покупатель" с оформлением всех необходимых товарно-транспортных документов.
        </div>

        <div class="shipping-and-payment__title">
            Оплата
        </div>

        <div class="shipping-and-payment__conditions">
            Оплата за товар производится только по безналичному расчёту после подтверждения заказа "Продавцом". <br>
            В случае неоплаты заказа в течение трех банковских дней после выставления "Продавцом" документов для оплаты, без предварительного уведомления о задержке платежа, заказ расформировывается.<br>
            <br>
            Реквизиты для оплаты:<br>
            Индивидуальный предприниматель Андалюкевич Иван Иванович<br>
            УНП 191801242<br>
            {{temp}}<br>
            в  РКЦ №7 ЗАО «БСБ Банк» ,  БИК: UNBSBY2X<br>
            г.Минск, пр-т газеты «Звезда», 47<br>
            <img src="../../assets/bsbbank.png" alt="BsbBank">
        </div>
    </div>
</template>

<script>
    import AddressShippingService from "../../services/address-shipping";

    export default {
        name: 'ShippingAndPayment',
        data: () => ({
            images: [],
            galleryFilter: 'all',
            temp: 'Р/с BY66 UNBS 301 301 143 800 100 079 33',
            address: ''
        }),
        methods: {
            showLightbox: function (imageName) {
                this.$refs.lightbox.show(imageName);
            },
            updateFilter(filterName) {
                this.galleryFilter = filterName;
            }
        },
        computed: {
            filteredImages: function () {
                if (this.galleryFilter === 'all') {
                    return this.images;
                } else {
                    return this.images.filter(image => image.filter === this.galleryFilter);
                }

            }
        },
        created(){
            AddressShippingService.getShippingService().then(({data})=>{
                this.address = data[0].address;
                this.images = data[0].images.map((image, idImage)=>{
                    return {
                        name: image,
                        filter: 'plasticod',
                        id: `image-${idImage}`
                    }
                })
            })
        }
    }
</script>

<style scoped>
    .shipping-and-payment__title {
        color: white;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        background-color: #305496;
    }

    .shipping-and-payment__shipping {
        padding: 20px;
    }

    .demarcation-strip{
        background-color: #00B0F0;
        width: 100%;
        height: 20px;
    }

    .shipping-and-payment__about-company{
        display: flex;
        align-items: center;
        padding: 20px;
    }

    .shipping-and-payment__about-company__logo img{
        width: 150px;
        height: 100px;
        margin-right: 20px;
    }

    .shipping-and-payment__shipping img {
        padding: 10px;
        width: 33.3%;
        height: 200px;
    }

    .shipping-and-payment__sentence{
        padding: 20px;
    }

    .shipping-and-payment__conditions{
        padding: 20px;
    }

    .shipping-and-payment__conditions img {
        padding: 10px;
        width: 185px;
    }
</style>