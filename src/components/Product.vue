<template>
	<div>
		<h1>{{products[id].title}}</h1>
		<hr>
		<div class="alert alert-success">
		</div>
		<div>{{products[id].price}}</div>
		<btn-group
			:product="products[id]"
		></btn-group>
	</div>
</template>

<script>
	import {mapMutations, mapGetters } from "vuex";
	import BtnGroup from './BtnGroup';

	export default {
		components: {
			BtnGroup
  		},
		computed:{
			...mapGetters([
				'products',
			]),
			id(){
				for(let i=0; i<this.products.length; i++){
					if(this.products[i].id_product == +this.$route.params.id){
						return i;
					}
				}
			},
			containsCart(){
				return this.products.filter(elem =>{
					return this.cartProducts.indexOf(elem.id_product) != -1
				});
			}
		},
		methods:{
			...mapMutations([
				'addToCart',
			]),
		}
	}
</script>