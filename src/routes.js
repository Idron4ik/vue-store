import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter);

import ProductList from './components/ProductsList';
import Product from './components/Product';
import Cart from './components/Cart';
import E404 from './components/E404';
import Checkout from './components/Checkout';

const routes = [
	{
		path: '/',
		redirect: { name: 'productList' }
	},
	{
		path: '/products',
		name: 'productList',
		component: ProductList
	},
	{
		path: '/products/:id',
		component: Product
	},
	{
		path: '/cart',
		component: Cart
	},
	{
		path: '/checkout',
		component: Checkout
	},
	{
		path: '*',
		component: E404
	}
];
export const router = new VueRouter({
	routes,
	mode: 'history',
});