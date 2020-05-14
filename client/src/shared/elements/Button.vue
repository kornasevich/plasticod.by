<template>
    <div class="button" :style="style" @click="emitClick">
        {{textButton}}
    </div>
</template>

<script>
    export default {
        name: "Button",
        props: {
            textButton: {
                type: String,
                default: 'Оформить заказ'
            },
            width: {
                type: String,
                default: '180px'
            },
            padding: {
                type: Number,
                default: 10
            },
            backgroundColor: {
                type: String,
                default: '#00B0F0'
            },
        },
        computed: {
            style(){
                return{
                    width: this.width,
                    padding: this.padding + 'px',
                    backgroundColor: this.backgroundColor
                }
            }
        },
        methods: {
            emitClick(){
                this.$emit('click')
            }
        }
    }
</script>

<style scoped>
    .button {
        padding: 10px;
        background-color: #00B0F0;
        border: 1px solid black;
        width: auto;
        text-align: center;
        cursor: pointer;
    }

    .button:hover {
        background-color: #305496!important;
    }
</style>