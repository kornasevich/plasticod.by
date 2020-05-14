export default {
    state: {
        dataUser: {},
        login: false,
        token: ''
    },
    mutations: {
        setDataUser(state, dataUser){
            state.dataUser = {...dataUser};
        },
        setLogin(state, login){
            state.login = login;
        },
        setToken(state, token){
            state.token = token;
        },

    },
    getters: {
        getDataUser(state){
            return state.dataUser;
        },
        getLogin(state){
            return state.login;
        },
        geToken(state){
            return state.token;
        }
    },
    actions:{

    }
}