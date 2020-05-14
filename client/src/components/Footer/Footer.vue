<template>
    <div class="footer">
        <div class="footer__logo">PLASTIC<br>Organizers<br>with<br>Drawers</div>
        <div class="footer__contacts">
            <div class="footer__contacts__messengers">
                <a :href="`http://${$store.state.General.socials.skype}`"><img class="footer__contacts__messengers__image" src="../../assets/skype.png" alt="skype"></a>
                <a :href="`http://${$store.state.General.socials.viber}`"><img class="footer__contacts__messengers__image" src="../../assets/viber.png" alt="viber"></a>
                <a :href="`http://${$store.state.General.socials.whatsapp}`"><img class="footer__contacts__messengers__image" src="../../assets/whatsapp.png" alt="whatsapp"></a>
                <a :href="`http://${$store.state.General.socials.telegram}`"><img class="footer__contacts__messengers__image" src="../../assets/telegram.png" alt="telegram"></a>
                <span class="footer__contacts__messengers__number">{{$store.state.General.numberPhone}};</span>
            </div>
            <div class="footer__contacts__text">
                Политика конфиденциальности<br>
                Следите за нами в социальных сетях:
            </div>
            <div class="footer__contacts__socials">
                <a :href="`http://${$store.state.General.socials.facebook}`"><img class="footer__contacts__messengers__image" src="../../assets/facebook.png" alt="facebook"></a>
                <a :href="`http://${$store.state.General.socials.vk}`"><img class="footer__contacts__messengers__image" src="../../assets/vk.png" alt="vk"></a>
                <a :href="`http://${$store.state.General.socials.instagram}`"><img class="footer__contacts__messengers__image" src="../../assets/instagram.png" alt="instagram"></a>
            </div>
        </div>
        <div class="footer__legal-information">
            © 2020, Все права защищены<br>
            ИП Андалюкевич Иван Иванович<br>
            УНП 191801242<br>
            (+375) 29 103-15-86;<br>
            <a href="#">info@plasticod.by</a><br>

        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: 'Footer',
        data: () => ({
        }),
        computed:  mapState['numberPhone'],
        created() {
            let counter = document.createElement('script');
            counter.setAttribute('src', "//counter.yadro.ru/hit?t29.6;r'+escape(document.referrer)+((typeof(screen)=='undefined')?'':';s'+screen.width+'*'+screen.height+'*'+(screen.colorDepth?screen.colorDepth:screen.pixelDepth))+';u'+escape(document.URL)+';h'+escape(document.title.substring(0,150))+';'+Math.random()+'");
            document.querySelector('.counter').appendChild(counter);
        }
    }
</script>

<style>
    .footer {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 200px;
        border: 1px solid #000080;
        border-bottom: none;
    }

    .footer__logo {
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        color: #036BCF;
        line-height: 26px;
        padding: 4px;
    }

    .footer__contacts__messengers__image {
        width: 40px;
        height: 40px;
        margin-left: 7px;
    }

    .footer__contacts__messengers__number {
        margin-left: 10px;
        vertical-align: top;
    }

    @media print {
        .footer {
            display: none;
        }
    }
</style>