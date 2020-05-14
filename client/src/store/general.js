import GeneralService from "../services/general";

export default {
    state: {
        numberPhone: '',
        images: [],
        socials: {
            viber: '',
            skype: '',
            instagram: '',
            whatsapp: '',
            facebook: '',
            vk: '',
            telegram: ''
        }
    },
    mutations: {
        setGeneral(state, general) {
            state.numberPhone = general.numberPhone;
            state.images = general.images;
            state.socials = general.socials
        }
    },
    getters: {
        general(state) {
            return state;
        },
        numberPhone(state){
            return state.numberPhone
        }
    },
    actions: {
        async getGeneral({commit}) {
            await GeneralService.getGeneral().then(({data}) => {
                commit('setGeneral', data[0])
            }).catch(() => {
                commit('setGeneral', {
                    numberPhone: '(+375) 29 103-15-86'
                })
            })
        }
    }
}