export default {
    state: {
        currentRoute: ''
    },
    mutations: {
        setCurrentRoute(state, route){
            state.currentRoute = route;
        }
    },
    getters: {
        getCurrentRoute(state){
            return state.currentRoute;
        }
    },
    actions:{

    }
}