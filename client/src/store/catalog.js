export default {
    state: {
        currentGroup: '',
        products: [],
        groups: []
    },
    mutations: {
        setCurrentGroup(state, group){
            state.currentGroup = group;
        },
        setProducts(state, products){
            state.products = products;
        },
        setGroups(state, groups){
            state.groups = groups;
        }
    },
    getters: {
        getCurrentGroup(state){
            return state.currentGroup;
        },
        getProducts(state){
            return state.products;
        }
    },
    actions:{

    }
}