import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

var data = getProducts();
let normalizeArr = {};
for(let i=0;i<data.length;i++){
    let item = data[i];
    normalizeArr[item.id_product] = item; 
}

export const store = new Vuex.Store({
    state: {
        products: normalizeArr,
        cartProducts: [10,20],
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
                let item = state.cartProducts[i];
                sum += state.products[item].price;
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
            console.log(1234223);
            return state.info[payload.i].value = payload.data.value;
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
