import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        products: getProducts(),
        cartProducts: [],
        routerItems:[
            {
                link:'/products',
                linkText:'Products',
            },
            {
                link:'/cart',
                linkText:'Cart',
            },
            {
                link:'/checkout',
                linkText:'Checkout',
            }
        ],
        info: [
            {
                name: 'Name',
                value: '',
                pattern: /^[a-zA-Z ]{2,30}$/,
            },
            {
                name: 'Phone',
                value: '',
                pattern: /^[0-9]{7,14}$/,
            },
            {
                name: 'Email',
                value: '',
                pattern: /.+/,
            },
        ],
        formSubmit: true,
        loadingForm: ""
    },
    getters:{
        routerItems(state){
            return state.routerItems;
        },
        products(state){
            return state.products;
        },
        cartProducts(state){
            return state.cartProducts;
        },
        lengthCart(state){
            return state.cartProducts.length
        },
        totalOrder(state){
            let sum = 0;
            for(let i=0; i<state.cartProducts.length; i++){
                for(let j=0; j<state.products.length; j++){
                    if(state.cartProducts[i] == state.products[j].id_product){
                        sum += state.products[j].price;
                    }
                }
            }
            
            return sum;
        },
        info(state) {
            return state.info;
        },
        formSubmit(state){
            return state.formSubmit;
        },
        loadingForm(state){
            return state.loadingForm
        }
    },
    mutations:{
        addToCart(state, id_product){
            if( state.cartProducts.indexOf(id_product) === -1 ){
                state.cartProducts.push(id_product);
            }
        },
        removeToCart(state, id_product){
            let pos = state.cartProducts.indexOf(id_product);

            if(pos !== -1){
                state.cartProducts.splice(pos, 1);
            }

        },
        updateValue(state, payload){
            state.info[payload.i].value = payload.data.value;
        },
        formSubmit(state){
            return state.formSubmit = false;
        },
        loadingForm(state, isActive){
            return state.loadingForm = isActive;
        },
        clearCart(state){
            return state.cartProducts = [];
        }
    },
    actions: {
       sendData(state){
           state.commit('loadingForm',"loading");
           setTimeout(()=>{
            state.commit('formSubmit');
            state.commit('loadingForm',"");
            state.commit('clearCart');
           },1000);
       }
    }
});

function getProducts(){
	return [
		{
			id_product: 10,
			title: 'Iphone 5',
			price: 20000
		},
		{
			id_product: 20,
			title: 'Iphone 6',
			price: 25000
		},
		{
			id_product: 30,
			title: 'Iphone 7',
			price: 30000
		}
	]
}